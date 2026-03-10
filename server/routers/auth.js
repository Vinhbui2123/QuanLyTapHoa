const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, requireAdmin } = require('../middlewares/auth');

// POST /api/auth/register - Đăng ký tài khoản mới (chỉ admin)
router.post('/register', verifyToken, requireAdmin, authController.register);

// POST /api/auth/login - Đăng nhập
router.post('/login', authController.login);

// GET /api/auth/me - Lấy thông tin user hiện tại
router.get('/me', verifyToken, authController.getMe);

// PUT /api/auth/change-password - Đổi mật khẩu
router.put('/change-password', verifyToken, authController.changePassword);

module.exports = router;
