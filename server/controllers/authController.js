const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

/**
 * Đăng ký tài khoản mới
 */
exports.register = async (req, res, next) => {
    try {
        const { username, password, fullName } = req.body;
        const role = 'cashier'; // Luôn tạo tài khoản cashier, không nhận role từ client

        // Validate input
        if (!username || !password || !fullName) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        }

        // Check if username exists
        const existingUser = await query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Tên đăng nhập đã tồn tại'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await query(
            'INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, fullName, role]
        );

        res.status(201).json({
            status: 'success',
            message: 'Đăng ký thành công',
            data: { userId: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Đăng nhập
 */
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập tên đăng nhập và mật khẩu'
            });
        }

        // Find user
        const users = await query(
            'SELECT * FROM users WHERE username = ? AND is_active = TRUE',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        const user = users[0];

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.json({
            status: 'success',
            message: 'Đăng nhập thành công',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    fullName: user.full_name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy thông tin user hiện tại
 */
exports.getMe = async (req, res, next) => {
    try {
        const users = await query(
            'SELECT id, username, full_name, role, created_at FROM users WHERE id = ?',
            [req.user.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Không tìm thấy user'
            });
        }

        res.json({
            status: 'success',
            data: users[0]
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Đổi mật khẩu
 */
exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới'
            });
        }

        // Get user
        const users = await query(
            'SELECT password FROM users WHERE id = ?',
            [req.user.userId]
        );

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, users[0].password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Mật khẩu hiện tại không đúng'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, req.user.userId]
        );

        res.json({
            status: 'success',
            message: 'Đổi mật khẩu thành công'
        });
    } catch (error) {
        next(error);
    }
};
