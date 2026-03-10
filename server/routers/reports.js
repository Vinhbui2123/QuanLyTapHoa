const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/auth');

router.use(verifyToken);

// GET /api/reports/revenue - Báo cáo doanh thu
router.get('/revenue', reportController.getRevenue);

// GET /api/reports/profit - Báo cáo lợi nhuận
router.get('/profit', reportController.getProfit);

// GET /api/reports/inventory - Báo cáo tồn kho
router.get('/inventory', reportController.getInventory);

// GET /api/reports/top-products - Sản phẩm bán chạy
router.get('/top-products', reportController.getTopProducts);

// GET /api/reports/slow-products - Sản phẩm bán chậm
router.get('/slow-products', reportController.getSlowProducts);

// GET /api/reports/daily - Báo cáo hàng ngày
router.get('/daily', reportController.getDailyReport);

// GET /api/reports/dashboard - Dữ liệu dashboard
router.get('/dashboard', reportController.getDashboard);

module.exports = router;
