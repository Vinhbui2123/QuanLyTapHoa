const  { query } = require("../config/database");

exports.getRevenue = async ( req, res, next ) => {
    try {
        const { startDate, endDate, groupBy = 'day' } = req.query;

        let dateFormat = '%Y-%m-%d';
        if ( groupBy === 'month') dateFormat = '%Y-%m';
        if ( groupBy === 'year') dateFormat = '%Y';

        let sql = `
            SELECT 
                DATE_FORMAT(created_at, ? ) as period,
                SUM(total_amount) as revenue,
                COUNT(*) as invoices_count
            FROM invoices
            WHERE status = 'completed'
        `;

        const params = [dateFormat];

        if ( startDate ) {
            sql += ' AND created_at >= ?';
            params.push(startDate);
        }

        if ( endDate ) {
            sql += ' AND created_at <= ?';
            params.push(endDate);
        }

        sql += ' GROUP BY period ORDER BY period DESC';

        const revenue = await query(sql, params);
        res.json({
            status: 'success',
            data: revenue
        });
    } catch (error) {
        next(error);
    }
}

exports.getProfit = async ( req, res, next ) => {
    try {
        const { startDate, endDate, groupBy = 'day' } = req.query;

        let dateFormat = '%Y-%m-%d';
        if ( groupBy === 'month') dateFormat = '%Y-%m';
        if ( groupBy === 'year') dateFormat = '%Y';

        let sql = `
            SELECT 
                DATE_FORMAT(i.created_at, ?) as period,
                SUM(ii.subtotal) as revenue,
                SUM(ii.quantity * p.cost_price) as total_cost,
                SUM(ii.subtotal) - SUM(ii.quantity * p.cost_price) as profit,
                COUNT(DISTINCT i.id) as invoices_count
            FROM invoices i
            JOIN invoice_items ii ON i.id = ii.invoice_id
            JOIN products p ON ii.product_id = p.id
            WHERE i.status = 'completed'
        `;

        const params = [dateFormat];

        if ( startDate ) {
            sql += ' AND DATE(i.created_at) >= ?';
            params.push(startDate);
        }

        if ( endDate ) {
            sql += ' AND DATE(i.created_at) <= ?';
            params.push(endDate);
        }

        sql += ' GROUP BY period ORDER BY period DESC';

        const profitData = await query(sql, params);

        // Tính tổng
        const summary = profitData.reduce((acc, row) => {
            acc.totalRevenue += Number(row.revenue) || 0;
            acc.totalCost += Number(row.total_cost) || 0;
            acc.totalProfit += Number(row.profit) || 0;
            acc.totalInvoices += Number(row.invoices_count) || 0;
            return acc;
        }, { totalRevenue: 0, totalCost: 0, totalProfit: 0, totalInvoices: 0 });

        res.json({
            status: 'success',
            data: {
                details: profitData,
                summary
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.getInventory = async (req, res, next) => {
    try {
        const inventory = await query(`
            SELECT p.id, p.name, p.stock_quantity, p.min_stock, p.cost_price,
                    (p.stock_quantity * p.cost_price) as stock_value,
                    c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.is_active = TRUE
            ORDER BY stock_value DESC
        `);

        const totalValue = inventory.reduce((sum, p) => sum + (p.stock_value || 0), 0);
        res.json({
            status: 'success',
            data: { products: inventory, totalValue }
        });
    } catch (error) {
        next(error);
    }
};

exports.getTopProducts = async (req, res, next) => {
    try {
        const { limit = 10, startDate, endDate } = req.query;

        let sql = `
      SELECT p.id, p.name, SUM(ii.quantity) as total_sold, SUM(ii.subtotal) as total_revenue
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      JOIN invoices i ON ii.invoice_id = i.id
      WHERE i.status = 'completed'
    `;
        const params = [];

        if (startDate) {
            sql += ' AND DATE(i.created_at) >= ?';
            params.push(startDate);
        }
        if (endDate) {
            sql += ' AND DATE(i.created_at) <= ?';
            params.push(endDate);
        }

        sql += ' GROUP BY p.id ORDER BY total_sold DESC LIMIT ?';
        params.push(parseInt(limit));

        const products = await query(sql, params);
        res.json({ status: 'success', data: products });
    } catch (error) {
        next(error);
    }
};

exports.getSlowProducts = async (req, res, next) => {
    try {
        const { days = 30 } = req.query;
        const products = await query(`
      SELECT p.id, p.name, p.stock_quantity, COALESCE(sales.total_sold, 0) as total_sold
      FROM products p
      LEFT JOIN (
        SELECT ii.product_id, SUM(ii.quantity) as total_sold
        FROM invoice_items ii
        JOIN invoices i ON ii.invoice_id = i.id
        WHERE i.status = 'completed' AND i.created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY ii.product_id
      ) sales ON p.id = sales.product_id
      WHERE p.is_active = TRUE AND p.stock_quantity > 0
      ORDER BY total_sold ASC
      LIMIT 20
    `, [parseInt(days)]);
        res.json({ status: 'success', data: products });
    } catch (error) {
        next(error);
    }
};

exports.getDailyReport = async (req, res, next) => {
    try {
        const { date } = req.query;
        const targetDate = date || new Date().toISOString().split('T')[0];

        const [revenue] = await query(`
      SELECT COUNT(*) as invoice_count, SUM(total_amount) as total_revenue
      FROM invoices
      WHERE DATE(created_at) = ? AND status = 'completed'
    `, [targetDate]);

        res.json({
            status: 'success',
            data: { date: targetDate, ...revenue }
        });
    } catch (error) {
        next(error);
    }
};

exports.getDashboard = async (req, res, next) => {
    try {
        // Tổng doanh thu hôm nay
        const [todayRevenue] = await query(`
      SELECT COALESCE(SUM(total_amount), 0) as revenue, COUNT(*) as invoices
      FROM invoices WHERE DATE(created_at) = CURDATE() AND status = 'completed'
    `);

        // Sản phẩm sắp hết
        const [lowStock] = await query(`
      SELECT COUNT(*) as count FROM products 
      WHERE is_active = TRUE AND stock_quantity <= min_stock
    `);

        // Sản phẩm sắp hết hạn
        const [expiring] = await query(`
      SELECT COUNT(DISTINCT product_id) as count FROM inventory_logs
      WHERE expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
        AND remaining_quantity > 0
    `);

        // Tổng số sản phẩm
        const [productCount] = await query(`
      SELECT COUNT(*) as count FROM products WHERE is_active = TRUE
    `);

        res.json({
            status: 'success',
            data: {
                todayRevenue: todayRevenue.revenue,
                todayInvoices: todayRevenue.invoices,
                lowStockCount: lowStock.count,
                expiringCount: expiring.count,
                totalProducts: productCount.count
            }
        });
    } catch (error) {
        next(error);
    }
};

