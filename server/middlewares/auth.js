const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Không tìm thấy token xác thực'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                message: 'Token đã hết hạn'
            });
        }

        return res.status(401).json({
            status: 'error',
            message: 'Token không hợp lệ'
        });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            status: 'error',
            message: 'Bạn không có quyền thực hiện thao tác này'
        });
    }
    next();
};

const requireManager = (req, res, next) => {
    const allowedRoles = ['admin', 'manager'];
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            status: 'error',
            message: 'Bạn không có quyền thực hiện thao tác này'
        });
    }
    next();
};

module.exports = {
    verifyToken,
    requireAdmin,
    requireManager
};
