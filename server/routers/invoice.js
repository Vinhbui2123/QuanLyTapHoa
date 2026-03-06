const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/invoices - Lấy danh sách hóa đơn
router.get('/', invoiceController.getAll);

// GET /api/invoices/:id - Lấy chi tiết hóa đơn
router.get('/:id', invoiceController.getById);

// POST /api/invoices - Tạo hóa đơn mới (bán hàng)
router.post('/', invoiceController.create);

// PUT /api/invoices/:id/cancel - Hủy hóa đơn
router.put('/:id/cancel', invoiceController.cancel);

// GET /api/invoices/:id/print - In hóa đơn
router.get('/:id/print', invoiceController.print);

module.exports = router;
