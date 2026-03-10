/**
 * Global Error Handler Middleware
 * Xử lý tất cả lỗi trong ứng dụng
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Có lỗi xảy ra từ server';

    // MySQL duplicate entry error
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 400;
        message = 'Dữ liệu đã tồn tại trong hệ thống';
    }

    // MySQL foreign key constraint error
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        statusCode = 400;
        message = 'Không thể xóa vì dữ liệu đang được sử dụng';
    }

    // Validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

    res.status(statusCode).json({
        status: 'error',
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
