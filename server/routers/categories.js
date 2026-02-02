const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET Lấy danh sách danh mục
router.get('/', categoryController.getAll);

// GET Lấy chi tiết danh mục
router.get('/:id', categoryController.getById);

// POST Thêm danh mục mới
router.post('/', categoryController.create);

// PUT  Cập nhật danh mục
router.put('/:id', categoryController.update);

// DELETE  Xóa danh mục
router.delete('/:id', categoryController.delete);

module.exports = router;
