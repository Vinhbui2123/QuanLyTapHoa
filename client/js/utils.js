/**
 * Utility Functions
 * Các hàm tiện ích dùng chung
 */

/**
 * Debounce - Delay execution
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - Limit execution rate
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep clone object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Format số với dấu phẩy
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Parse số từ string có format
 */
function parseFormattedNumber(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}

/**
 * Validate email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number (Vietnam)
 */
function isValidPhone(phone) {
    const re = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return re.test(phone);
}

/**
 * Get relative time
 */
function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return date.toLocaleDateString('vi-VN');
}

/**
 * Generate random ID
 */
function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

/**
 * Download file from blob
 */
function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}

/**
 * Export table to CSV
 */
function exportTableToCSV(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');

    let csv = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => {
            let text = cell.textContent.trim();
            // Escape quotes
            text = text.replace(/"/g, '""');
            // Wrap in quotes if contains comma
            if (text.includes(',')) {
                text = `"${text}"`;
            }
            return text;
        });
        csv.push(rowData.join(','));
    });

    const blob = new Blob(['\ufeff' + csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
}

/**
 * Local storage helpers
 */
const Storage = {
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};

// Export
window.Utils = window.Utils || {};
Object.assign(window.Utils, {
    debounce,
    throttle,
    deepClone,
    formatNumber,
    parseFormattedNumber,
    isValidEmail,
    isValidPhone,
    getRelativeTime,
    generateId,
    copyToClipboard,
    downloadBlob,
    exportTableToCSV,
    Storage
});
