const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/auth');

// Áp dụng middleware auth cho tất cả routes
router.use(verifyToken);

// GET /api/products - Lấy danh sách sản phẩm
router.get('/', productController.getAll);

// GET /api/products/:id - Lấy chi tiết sản phẩm
router.get('/:id', productController.getById);

// POST /api/products - Thêm sản phẩm mới
router.post('/', productController.create);

// PUT /api/products/:id - Cập nhật sản phẩm
router.put('/:id', productController.update);

// DELETE /api/products/:id - Xóa sản phẩm
router.delete('/:id', productController.delete);

// GET /api/products/low-stock - Lấy sản phẩm sắp hết hàng
router.get('/alerts/low-stock', productController.getLowStock);

// GET /api/products/expiring - Lấy sản phẩm sắp hết hạn
router.get('/alerts/expiring', productController.getExpiring);

module.exports = router;
