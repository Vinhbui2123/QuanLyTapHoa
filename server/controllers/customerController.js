const { query } = require('../config/database');

exports.getAll = async (req, res, next) => {
    try {
        const { search, type, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        let sql = "SELECT * FROM customers WHERE is_active = TRUE";
        const params = [];

        if (search) {
            sql += " AND (name LIKE ? OR phone LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        if (type) {
            sql += " AND customer_type = ?";
            params.push(type);
        }

        sql += " ORDER BY name ASC LIMIT ? OFFSET ?";
        params.push(parseInt(limit), parseInt(offset));

        const customers = await query(sql, params);
        res.json({ status: 'success', data: customers });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customers = await query("SELECT * FROM customers WHERE id = ? AND is_active = TRUE", [id]);
        if (customers.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy khách hàng' });
        }
        res.json({ status: 'success', data: customers[0] });
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const { name, phone, address, customer_type = 'regular' } = req.body;
        if (!name) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng nhập tên khách hàng' });
        }   
        const customers = await query("INSERT INTO customers (name, phone, address, customer_type) VALUES (?, ?, ?, ?)", [name, phone, address, customer_type]);
        res.status(201).json({ status: 'success', message: 'Thêm mới khách hàng thành công', data: customers.insertId });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone, address, customer_type } = req.body;
        const customers = await query(
            `UPDATE customers 
            SET name = COALESCE(?, name), 
                phone = COALESCE(? , phone), 
                address = COALESCE(? , address), 
                customer_type = COALESCE(? , customer_type) 
                WHERE id = ?`
            , [name, phone, address, customer_type, id]);
        res.json({ status: 'success', message: 'Cập nhật khách hàng thành công', data: customers });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customers = await query("UPDATE customers SET is_active = FALSE WHERE id = ?", [id]);
        res.json({ status: 'success', message: 'Xóa khách hàng thành công', data: customers });
    } catch (error) {
        next(error);
    }
}

exports.getPurchaseHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const invoices = await query(
            ` SELECT i.*, u.full_name as cashier_name
              FROM invoices i
              LEFT JOIN users u ON i.user_id = u.id
              WHERE i.customer_id = ?
              ORDER BY i.created_at DESC`
            , [id]);
        res.json({ status: 'success', message: 'Lấy lịch sử mua hàng thành công', data: invoices });
    } catch (error) {
        next(error);
    }
}

exports.getDebt = async (req, res, next) => {
    try {
        const { id } = req.params;
        const debt = await query(`
            SELECT SUM(total_amount - amount_paid) as total_debt
            FROM invoices
            WHERE customer_id = ? AND status = 'completed'
        `, [id]);
        res.json({ status: 'success', data: { totalDebt: debt[0].total_debt || 0 } });
    } catch (error) {
        next(error);
    }
}
