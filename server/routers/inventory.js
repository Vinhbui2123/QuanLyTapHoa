const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/inventory - Lấy danh sách tồn kho
router.get('/', inventoryController.getAll);

// POST /api/inventory/import - Nhập kho
router.post('/import', inventoryController.import);

// GET /api/inventory/logs - Lịch sử nhập xuất
router.get('/logs', inventoryController.getLogs);

// POST /api/inventory/dispose - Hủy hàng
router.post('/dispose', inventoryController.dispose);

// GET /api/inventory/expiring - Hàng sắp hết hạn
router.get('/expiring', inventoryController.getExpiring);


module.exports = router;
