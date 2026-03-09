const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/suppliers - Lấy danh sách nhà cung cấp
router.get('/', supplierController.getAll);

// GET /api/suppliers/:id - Lấy chi tiết nhà cung cấp
router.get('/:id', supplierController.getById);

// POST /api/suppliers - Thêm nhà cung cấp mới
router.post('/', supplierController.create);

// PUT /api/suppliers/:id - Cập nhật nhà cung cấp
router.put('/:id', supplierController.update);

// DELETE /api/suppliers/:id - Ngừng sử dụng nhà cung cấp
router.delete('/:id', supplierController.delete);

// GET /api/suppliers/:id/debt - Công nợ nhà cung cấp
router.get('/:id/debt', supplierController.getDebt);

module.exports = router;
