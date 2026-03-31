const { query, pool } = require('../config/database');

const VALID_PAYMENT_METHODS = new Set(['cash', 'transfer', 'momo', 'zalopay']);

exports.getAll = async (req, res, next) => {
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
            sql += ' AND DATE(i.created_at) >= ?';
            params.push(startDate);
        }
        if (endDate) {
            sql += ' AND DATE(i.created_at) <= ?';
            params.push(endDate);
        }

        sql += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const invoices = await query(sql, params);
        res.json({ status: 'success', data: invoices });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const invoices = await query(`
      SELECT i.*, u.full_name as cashier_name
      FROM invoices i
      LEFT JOIN users u ON i.user_id = u.id
      WHERE i.id = ?
    `, [req.params.id]);

        if (invoices.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy hóa đơn' });
        }

        // Lấy chi tiết sản phẩm trong hóa đơn
        const items = await query(`
      SELECT ii.*, p.name as product_name
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
    `, [req.params.id]);

        res.json({
            status: 'success',
            data: { ...invoices[0], items }
        });
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { customerId, items, paymentMethod = 'cash', amountPaid = 0, note } = req.body;

        if (!items || items.length === 0) {
            await connection.rollback();
            return res.status(400).json({ status: 'error', message: 'Vui lòng thêm sản phẩm vào hóa đơn' });
        }

        if (!VALID_PAYMENT_METHODS.has(paymentMethod)) {
            await connection.rollback();
            return res.status(400).json({ status: 'error', message: 'Phuong thuc thanh toan khong hop le' });
        }

        const normalizedItems = [];
        const requestedByProduct = new Map();
        for (const item of items) {
            const quantity = Number(item.quantity);
            const price = Number(item.price);

            if (!item.productId || !Number.isFinite(quantity) || quantity <= 0) {
                await connection.rollback();
                return res.status(400).json({ status: 'error', message: 'Số lượng sản phẩm không hợp lệ' });
            }

            if (!Number.isFinite(price) || price < 0) {
                await connection.rollback();
                return res.status(400).json({ status: 'error', message: 'Gia san pham khong hop le' });
            }

            normalizedItems.push({
                productId: item.productId,
                quantity,
                price
            });

            const currentQty = requestedByProduct.get(item.productId) || 0;
            requestedByProduct.set(item.productId, currentQty + quantity);
        }

        for (const [productId, quantity] of requestedByProduct.entries()) {
            const [rows] = await connection.execute(
                'SELECT id, name, stock_quantity FROM products WHERE id = ? FOR UPDATE',
                [productId]
            );

            if (rows.length === 0) {
                await connection.rollback();
                return res.status(404).json({ status: 'error', message: 'Không tìm thấy sản phẩm trong kho' });
            }

            if (Number(rows[0].stock_quantity) < quantity) {
                await connection.rollback();
                return res.status(400).json({
                    status: 'error',
                    message: `Sản phẩm "${rows[0].name}" không đủ tồn kho (còn ${rows[0].stock_quantity})`
                });
            }
        }

        // Tính tổng tiền
        let totalAmount = 0;
        for (const item of normalizedItems) {
            totalAmount += item.quantity * item.price;
        }

        // Tạo hóa đơn
        let normalizedAmountPaid = totalAmount;
        if (paymentMethod === 'cash') {
            normalizedAmountPaid = Number(amountPaid);

            if (!Number.isFinite(normalizedAmountPaid) || normalizedAmountPaid <= 0) {
                await connection.rollback();
                return res.status(400).json({ status: 'error', message: 'So tien khach tra phai lon hon 0' });
            }

            if (normalizedAmountPaid < totalAmount) {
                await connection.rollback();
                return res.status(400).json({ status: 'error', message: 'So tien khach tra chua du' });
            }
        }

        const [invoiceResult] = await connection.execute(
            `INSERT INTO invoices (customer_id, user_id, total_amount, amount_paid, payment_method, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [customerId || null, req.user.userId, totalAmount, normalizedAmountPaid, paymentMethod, note || null]
        );

        const invoiceId = invoiceResult.insertId;

        // Thêm chi tiết hóa đơn và trừ tồn kho theo FIFO
        for (const item of normalizedItems) {
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

            // Ghi log xuất kho (FIFO tracking)
            await connection.execute(
                `INSERT INTO inventory_logs (product_id, type, quantity, note, user_id)
                 VALUES (?, 'export', ?, ?, ?)`,
                [item.productId, item.quantity, `Bán hàng - HĐ #${invoiceId}`, req.user.userId]
            );
        }

        await connection.commit();

        res.status(201).json({
            status: 'success',
            message: 'Tạo hóa đơn thành công',
            data: { invoiceId, totalAmount, change: normalizedAmountPaid - totalAmount }
        });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

exports.cancel = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const invoiceId = req.params.id;

        // Kiểm tra hóa đơn tồn tại và chưa bị hủy
        const [invoice] = await connection.execute(
            'SELECT * FROM invoices WHERE id = ?', [invoiceId]
        );

        if (invoice.length === 0) {
            await connection.rollback();
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy hóa đơn' });
        }

        if (invoice[0].status === 'cancelled') {
            await connection.rollback();
            return res.status(400).json({ status: 'error', message: 'Hóa đơn đã được hủy trước đó' });
        }

        // Lấy chi tiết sản phẩm để hoàn trả tồn kho
        const [items] = await connection.execute(
            'SELECT product_id, quantity FROM invoice_items WHERE invoice_id = ?', [invoiceId]
        );

        // Hoàn trả tồn kho cho từng sản phẩm
        for (const item of items) {
            await connection.execute(
                'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
                [item.quantity, item.product_id]
            );

            // Ghi log điều chỉnh kho
            await connection.execute(
                `INSERT INTO inventory_logs (product_id, type, quantity, note, user_id)
                 VALUES (?, 'adjust', ?, ?, ?)`,
                [item.product_id, item.quantity, `Hủy HĐ #${invoiceId} - hoàn trả tồn kho`, req.user.userId]
            );
        }

        // Cập nhật trạng thái hóa đơn
        await connection.execute(
            'UPDATE invoices SET status = "cancelled" WHERE id = ?', [invoiceId]
        );

        await connection.commit();
        res.json({ status: 'success', message: 'Hủy hóa đơn thành công, đã hoàn trả tồn kho' });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

exports.print = async (req, res, next) => {
    try {
        // Lấy thông tin hóa đơn đầy đủ
        const invoices = await query(`
      SELECT i.*, u.full_name as cashier_name, c.name as customer_name, c.phone as customer_phone
      FROM invoices i
      LEFT JOIN users u ON i.user_id = u.id
      LEFT JOIN customers c ON i.customer_id = c.id
      WHERE i.id = ?
    `, [req.params.id]);

        if (invoices.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy hóa đơn' });
        }

        // Lấy chi tiết sản phẩm
        const items = await query(`
      SELECT ii.*, p.name as product_name, p.unit
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
    `, [req.params.id]);

        const invoice = invoices[0];

        res.json({
            status: 'success',
            data: {
                id: invoice.id,
                storeName: 'Cửa hàng Tạp Hóa',
                date: invoice.created_at,
                cashier: invoice.cashier_name,
                customer: invoice.customer_name || 'Khách lẻ',
                customerPhone: invoice.customer_phone || '',
                paymentMethod: invoice.payment_method,
                items: items.map(item => ({
                    name: item.product_name,
                    unit: item.unit,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.subtotal
                })),
                totalAmount: invoice.total_amount,
                amountPaid: invoice.amount_paid,
                change: invoice.amount_paid - invoice.total_amount,
                note: invoice.note,
                status: invoice.status
            }
        });
    } catch (error) {
        next(error);
    }
};
