const { query } = require('../config/database');

// GET Lấy tất cả danh mục
exports.getAll = async (req, res, next) => {
    try {
        const categories = await query('SELECT * FROM categories WHERE is_active = TRUE ORDER BY name');
        res.json({ status: 'success', data: categories });
    } catch (error) {
        next(error);
    }
};

// GET  lấy danh mục theo id
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categories = await query('SELECT * FROM categories WHERE id = ?', [id]);
        if (categories.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy danh mục'});
        }
        res.json({ status: 'success', data: categories[0] });
    } catch (error) {
        next(error);
    }
}; 

// POST thêm mới danh mục
exports.create = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng nhập tên danh mục'});
        }
        const result = await query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.json({ status: 'success', message: 'Thêm mới danh mục thành công', data: result.insertId });
    } catch (error) {
        next(error);
    }
}; 

// PUT cập nhật danh mục
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await query('UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
            [name, description,id]);
        res.json({ status: 'success', message: 'Cập nhật danh mục thành công' });
    } catch (error) {
        next(error);
    }
}; 

// DELETE xóa danh mục
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await query('UPDATE categories SET is_active = FALSE WHERE id = ?', [id]);
        res.json({ status: 'success', message: 'Xóa danh mục thành công' });
    } catch (error) {
        next(error);
    }
}; 
