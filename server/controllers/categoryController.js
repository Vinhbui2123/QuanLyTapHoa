const { query } = require('../config/database');

// TODO: Implement category controller
// Dev 2 sẽ hoàn thiện controller này

exports.getAll = async (req, res, next) => {
    try {
        const categories = await query('SELECT * FROM categories WHERE is_active = TRUE ORDER BY name');
        res.json({ status: 'success', data: categories });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const categories = await query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (categories.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy danh mục' });
        }
        res.json({ status: 'success', data: categories[0] });
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng nhập tên danh mục' });
        }
        const result = await query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ status: 'success', message: 'Thêm danh mục thành công', data: { categoryId: result.insertId } });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        await query('UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
            [name, description, req.params.id]);
        res.json({ status: 'success', message: 'Cập nhật danh mục thành công' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await query('UPDATE categories SET is_active = FALSE WHERE id = ?', [req.params.id]);
        res.json({ status: 'success', message: 'Xóa danh mục thành công' });
    } catch (error) {
        next(error);
    }
};
