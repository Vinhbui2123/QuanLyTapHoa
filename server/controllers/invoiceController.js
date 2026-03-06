const { query, pool } = require('../config/database');

exports.getAll = async ( req, res, next ) => {
    try {
        const { startDate, endDate, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        let sql = `
            SELECT i.*, u.full_name as cashier_name, c.name as customer_name
            FROM invoices i
            LEFT JOIN users u ON i.user_id = u.id
            LEFT JOIN customers c ON i.customer_id = c.id
            WHERE 1=1
        `;

        const params = [];
        if (startDate) {
            sql += `AND DATE(i.created_at) >= ?`;
            params.push(startDate);
        }

        if (endDate) {
            sql += `AND DATE(i.created_at) <= ?`;
            params.push(endDate);
        }

        sql += `ORDER BY i.created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const invoices = await query(sql, params);
        res.json({
            status: 'success',
            data: invoices
        });
    } catch (error) {
        next(error);
    }
};

exports.getById = async ( req, res, next ) => {
    try {
        const invoices = await query(`
            SELECT i.*, u.full_name as cashier_name
            FROM invoices i
            LEFT JOIN users u ON i.user_id = u.id
            WHERE i.id = ?   
        `, [req.params.id]);

        if ( invoices.length  === 0 ) {
            return res.status(404).json({
                status: 'error',
                message: 'Không tìm thấy hóa đơn'
            });
        }

        const items = await query(`
            SELECT ii.*, p.name as product_name
            FROM invoice_items ii 
            JOIN products p ON ii.product_id = p.id
            WHERE ii.invoice_id = ?
        `, [req.params.id]);

        res.json({
            status: 'success',
            data: {
                ...invoices[0],
                items
            }
        })
    } catch (error) {
        next(error);
    }
};

exports.create = async ( req, res, next ) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { customerId, items, paymentMethod = 'cash', amountPaid = 0, note } = req.body;

        if (!items || items.length === 0 ) {
            return res.status(400).json({
                status: 'error',
                message:'Vui lòng thêm sản phẩm vào hoá đơn' 
            });
        }
        
        // tính tổng tiền:
        let totalAmount = 0;
        for (const item of items) {
            totalAmount += item.quantity * item.price;
        }

        // Tạo hóa đơn
        const [invoiceResult] = await connection.execute(
            `INSERT INTO invoices (customer_id, user_id, total_amount, amount_paid, payment_method, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [customerId || null, req.user.userId, totalAmount, amountPaid, paymentMethod, note || null]
        );

        const invoiceId = invoiceResult.insertId;

        // Thêm chi tiết hóa đơn và trừ tồn kho
        for (const item of items) {
            await connection.execute(
                `INSERT INTO invoice_items (invoice_id, product_id, quantity, price, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
                [invoiceId, item.productId, item.quantity, item.price, item.quantity * item.price]
            );

            // Trừ tồn kho 
            await connection.execute(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.productId]
            );
        }

        await connection.commit();

        res.status(201).json({
            status: 'success',
            message: 'Tạo hóa đơn thành công',
            data: { invoiceId, totalAmount, change: amountPaid - totalAmount }
        });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

exports.cancel = async (req, res, next) => {
    try {
        // TODO: Implement cancel logic with inventory rollback
        await query('UPDATE invoices SET status = "cancelled" WHERE id = ?', [req.params.id]);
        res.json({ status: 'success', message: 'Hủy hóa đơn thành công' });
    } catch (error) {
        next(error);
    }
};

exports.print = async (req, res, next) => {
    try {
        // TODO: Generate printable invoice
        res.json({ status: 'success', message: 'Print endpoint - implement later' });
    } catch (error) {
        next(error);
    }
};
