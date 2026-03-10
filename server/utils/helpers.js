/**
 * Utility functions for the application
 */

/**
 * Format số tiền VND
 */
exports.formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

/**
 * Format ngày tháng
 */
exports.formatDate = (date, format = 'DD/MM/YYYY') => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year)
        .replace('HH', hours)
        .replace('mm', minutes);
};

/**
 * Tạo mã hóa đơn
 */
exports.generateInvoiceCode = () => {
    const date = new Date();
    const prefix = 'HD';
    const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${datePart}${randomPart}`;
};

/**
 * Tạo mã lô hàng
 */
exports.generateBatchId = () => {
    const date = new Date();
    const prefix = 'LO';
    const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${datePart}${randomPart}`;
};

/**
 * Pagination helper
 */
exports.paginate = (page = 1, limit = 20) => {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    return { offset, limit: parseInt(limit) };
};

/**
 * Response wrapper thành công
 */
exports.successResponse = (data, message = 'Thành công') => {
    return {
        status: 'success',
        message,
        data
    };
};

/**
 * Response wrapper lỗi
 */
exports.errorResponse = (message = 'Có lỗi xảy ra', code = 'ERROR') => {
    return {
        status: 'error',
        message,
        error: { code }
    };
};
