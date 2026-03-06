const { query, pool } = require('../config/database');


exports.getAll = async (req, res, next) => {
    try {
        const inventory = await query(`
      SELECT p.id, p.name, p.barcode, p.stock_quantity, p.min_stock, p.unit,
             c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = TRUE
      ORDER BY p.name
    `);
        res.json({ status: 'success', data: inventory });
    } catch (error) {
        next(error);
    }
};

exports.import = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { supplierId, items, note } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng thêm sản phẩm cần nhập' });
        }

        for (const item of items) {
            // Ghi log nhập kho
            await connection.execute(
                `INSERT INTO inventory_logs (product_id, type, quantity, remaining_quantity, batch_id, expiry_date, supplier_id, note, user_id)
         VALUES (?, 'import', ?, ?, ?, ?, ?, ?, ?)`,
                [item.productId, item.quantity, item.quantity, item.batchId || null, item.expiryDate || null, supplierId || null, note || null, req.user.userId]
            );  

            // Cập nhật tồn kho
            await connection.execute(
                'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
                [item.quantity, item.productId]
            );
        }

        await connection.commit();
        res.status(201).json({ status: 'success', message: 'Nhập kho thành công' });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

exports.getLogs = async (req, res, next) => {
    try {
        const { productId, type, startDate, endDate } = req.query;

        let sql = `
      SELECT il.*, p.name as product_name, u.full_name as user_name
      FROM inventory_logs il
      JOIN products p ON il.product_id = p.id
      LEFT JOIN users u ON il.user_id = u.id
      WHERE 1=1
    `;
        const params = [];

        if (productId) {
            sql += ' AND il.product_id = ?';
            params.push(productId);
        }
        if (type) {
            sql += ' AND il.type = ?';
            params.push(type);
        }
        if (startDate) {
            sql += ' AND DATE(il.created_at) >= ?';
            params.push(startDate);
        }
        if (endDate) {
            sql += ' AND DATE(il.created_at) <= ?';
            params.push(endDate);
        }

        sql += ' ORDER BY il.created_at DESC LIMIT 100';
        const logs = await query(sql, params);
        res.json({ status: 'success', data: logs });
    } catch (error) {
        next(error);
    }
};

exports.dispose = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { items, reason } = req.body;

        for (const item of items) {
            // Ghi log hủy hàng
            await connection.execute(
                `INSERT INTO inventory_logs (product_id, type, quantity, note, user_id)
         VALUES (?, 'dispose', ?, ?, ?)`,
                [item.productId, item.quantity, reason, req.user.userId]
            );

            // Trừ tồn kho
            await connection.execute(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.productId]
            );
        }

        await connection.commit();
        res.json({ status: 'success', message: 'Hủy hàng thành công' });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

exports.getExpiring = async (req, res, next) => {
    try {
        const { days = 30 } = req.query;
        const expiring = await query(`
      SELECT il.*, p.name as product_name
      FROM inventory_logs il
      JOIN products p ON il.product_id = p.id
      WHERE il.expiry_date IS NOT NULL 
        AND il.expiry_date <= DATE_ADD(CURDATE(), INTERVAL ? DAY)
        AND COALESCE(il.remaining_quantity, il.quantity) > 0
      ORDER BY il.expiry_date ASC
    `, [parseInt(days)]);
        res.json({ status: 'success', data: expiring });
    } catch (error) {
        next(error);
    }
};

