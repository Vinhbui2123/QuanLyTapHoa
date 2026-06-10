const { query } = require('../config/database');
const { validationResult, body, param } = require('express-validator');

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

exports.getById = [
    param('id').isInt().withMessage('ID không hợp lệ'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', message: errors.array().map(err => err.msg).join(', ') });
            }
            const suppliers = await query('SELECT * FROM suppliers WHERE id = ?', [req.params.id]);
            if (suppliers.length === 0) {
                return res.status(404).json({ status: 'error', message: 'Không tìm thấy nhà cung cấp' });
            }
            res.json({ status: 'success', data: suppliers[0] });
        } catch (error) {
            next(error);
        }
    }
];

exports.create = [
    body('name').notEmpty().withMessage('Vui lòng nhập tên nhà cung cấp'),
    body('phone').optional().isString().withMessage('Số điện thoại phải là chuỗi'),
    body('address').optional().isString().withMessage('Địa chỉ phải là chuỗi'),
    body('email').optional().isEmail().withMessage('Email không hợp lệ'),
    body('contactPerson').optional().isString().withMessage('Người liên hệ phải là chuỗi'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', message: errors.array().map(err => err.msg).join(', ') });
            }
            const { name, phone, address, email, contactPerson } = req.body;
            const result = await query(
                'INSERT INTO suppliers (name, phone, address, email, contact_person) VALUES (?, ?, ?, ?, ?)',
                [name, phone, address, email, contactPerson]
            );
            res.status(201).json({ status: 'success', message: 'Thêm nhà cung cấp thành công', data: { supplierId: result.insertId } });
        } catch (error) {
            next(error);
        }
    }
];

exports.update = [
    param('id').isInt().withMessage('ID không hợp lệ'),
    body('name').optional().isString().withMessage('Tên phải là chuỗi'),
    body('phone').optional().isString().withMessage('Số điện thoại phải là chuỗi'),
    body('address').optional().isString().withMessage('Địa chỉ phải là chuỗi'),
    body('email').optional().isEmail().withMessage('Email không hợp lệ'),
    body('contactPerson').optional().isString().withMessage('Người liên hệ phải là chuỗi'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', message: errors.array().map(err => err.msg).join(', ') });
            }
            const { name, phone, address, email, contactPerson } = req.body;
            await query(
                `UPDATE suppliers SET 
                name = COALESCE(?, name), 
                phone = COALESCE(?, phone), 
                address = COALESCE(?, address), 
                email = COALESCE(?, email), 
                contact_person = COALESCE(?, contact_person)
                WHERE id = ?`,
                [name, phone, address, email, contactPerson, req.params.id]
            );
            res.json({ status: 'success', message: 'Cập nhật nhà cung cấp thành công' });
        } catch (error) {
            next(error);
        }
    }
];

exports.delete = [
    param('id').isInt().withMessage('ID không hợp lệ'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', message: errors.array().map(err => err.msg).join(', ') });
            }
            await query('UPDATE suppliers SET is_active = FALSE WHERE id = ?', [req.params.id]);
            res.json({ status: 'success', message: 'Ngừng sử dụng nhà cung cấp thành công' });
        } catch (error) {
            next(error);
        }
    }
];

exports.getDebt = [
    param('id').isInt().withMessage('ID không hợp lệ'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', message: errors.array().map(err => err.msg).join(', ') });
            }
            const debt = await query(`
                SELECT SUM(total_amount - amount_paid) as total_debt
                FROM purchase_orders
                WHERE supplier_id = ? AND status = 'completed'
            `, [req.params.id]);
            res.json({ status: 'success', data: { totalDebt: debt[0].total_debt || 0 } });
        } catch (error) {
            next(error);
        }
    }
];

