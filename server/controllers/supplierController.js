const { query } = require('../config/database');

exports.getAll = async (req, res, next) => {
    try {
        const { search } = req.query;
        let sql = 'SELECT * FROM suppliers WHERE is_active = TRUE';
        const params = [];

        if (search) {
            sql += ' AND (name LIKE ? OR phone LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        sql += ' ORDER BY name ASC';
        const suppliers = await query(sql, params);
        res.json({ status: 'success', data: suppliers });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const suppliers = await query('SELECT * FROM suppliers WHERE id = ?', [req.params.id]);
        if (suppliers.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy nhà cung cấp' });
        }
        res.json({ status: 'success', data: suppliers[0] });
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { name, phone, address, email, contactPerson } = req.body;
        if (!name) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng nhập tên nhà cung cấp' });
        }
        const result = await query(
            'INSERT INTO suppliers (name, phone, address, email, contact_person) VALUES (?, ?, ?, ?, ?)',
            [name, phone ?? null, address ?? null, email ?? null, contactPerson ?? null]
        );
        res.status(201).json({ status: 'success', message: 'Thêm nhà cung cấp thành công', data: { supplierId: result.insertId } });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { name, phone, address, email, contactPerson } = req.body;
        await query(
            `UPDATE suppliers SET 
        name = COALESCE(?, name), 
        phone = COALESCE(?, phone), 
        address = COALESCE(?, address),
        email = COALESCE(?, email),
        contact_person = COALESCE(?, contact_person)
       WHERE id = ?`,
            [name ?? null, phone ?? null, address ?? null, email ?? null, contactPerson ?? null, req.params.id]
        );
        res.json({ status: 'success', message: 'Cập nhật nhà cung cấp thành công' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await query('UPDATE suppliers SET is_active = FALSE WHERE id = ?', [req.params.id]);
        res.json({ status: 'success', message: 'Ngừng sử dụng nhà cung cấp thành công' });
    } catch (error) {
        next(error);
    }
};

exports.getDebt = async (req, res, next) => {
    try {
        const debt = await query(`
      SELECT SUM(total_amount - amount_paid) as total_debt
      FROM purchase_orders
      WHERE supplier_id = ? AND status = 'completed'
    `, [req.params.id]);
        res.json({ status: 'success', data: { totalDebt: debt[0].total_debt || 0 } });
    } catch (error) {
        next(error);
    }
};
