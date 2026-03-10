const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/categories - Lấy danh sách danh mục
router.get('/', categoryController.getAll);

// GET /api/categories/:id - Lấy chi tiết danh mục
router.get('/:id', categoryController.getById);

// POST /api/categories - Thêm danh mục mới
router.post('/', categoryController.create);

// PUT /api/categories/:id - Cập nhật danh mục
router.put('/:id', categoryController.update);

// DELETE /api/categories/:id - Xóa danh mục
router.delete('/:id', categoryController.delete);

module.exports = router;
