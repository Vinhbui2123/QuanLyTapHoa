const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/customers - Lấy danh sách khách hàng
router.get('/', customerController.getAll);

// GET /api/customers/:id - Lấy chi tiết khách hàng
router.get('/:id', customerController.getById);

// POST /api/customers - Thêm khách hàng mới
router.post('/', customerController.create);

// PUT /api/customers/:id - Cập nhật thông tin khách hàng
router.put('/:id', customerController.update);

// DELETE /api/customers/:id - Xóa khách hàng
router.delete('/:id', customerController.delete);

// GET /api/customers/:id/history - Lịch sử mua hàng
router.get('/:id/history', customerController.getPurchaseHistory);

// GET /api/customers/:id/debt - Công nợ khách hàng
router.get('/:id/debt', customerController.getDebt);

module.exports = router;
