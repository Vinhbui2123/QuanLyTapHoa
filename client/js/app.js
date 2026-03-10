/**
 * Main App - Entry point cho frontend
 */

document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra trang hiện tại
    const isLoginPage = document.querySelector('.login-page');

    if (isLoginPage) {
        initLoginPage();
    } else {
        // Các trang khác cần đăng nhập
        if (Auth.requireAuth()) {
            initApp();
        }
    }
});

/**
 * Khởi tạo trang Login
 */
function initLoginPage() {
    // Nếu đã đăng nhập thì redirect
    if (Auth.redirectIfLoggedIn()) {
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Disable button
            loginBtn.disabled = true;
            loginBtn.querySelector('.btn-text').style.display = 'none';
            loginBtn.querySelector('.btn-loading').style.display = 'inline';
            loginError.style.display = 'none';

            // Call login
            const result = await Auth.login(username, password);

            if (result.success) {
                // Redirect to dashboard
                window.location.href = '/pages/dashboard.html';
            } else {
                // Show error
                loginError.textContent = result.message;
                loginError.style.display = 'block';

                // Re-enable button
                loginBtn.disabled = false;
                loginBtn.querySelector('.btn-text').style.display = 'inline';
                loginBtn.querySelector('.btn-loading').style.display = 'none';
            }
        });
    }
}

/**
 * Khởi tạo App (sau đăng nhập)
 */
function initApp() {
    // Hiển thị thông tin user
    updateUserInfo();

    // Setup navigation
    initNavigation();

    // Setup logout
    initLogout();
}

/**
 * Cập nhật thông tin user trên header
 */
function updateUserInfo() {
    const user = Auth.getCurrentUser();

    const userNameEl = document.querySelector('.header-user-name');
    const userAvatarEl = document.querySelector('.header-user-avatar');

    if (user) {
        if (userNameEl) {
            userNameEl.textContent = user.fullName;
        }
        if (userAvatarEl) {
            userAvatarEl.textContent = user.fullName.charAt(0).toUpperCase();
        }
    }
}

/**
 * Khởi tạo Navigation (mobile)
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Đóng sidebar khi click bên ngoài
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // Highlight active nav item
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

/**
 * Khởi tạo nút đăng xuất
 */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                Auth.logout();
            }
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format số tiền VND
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

/**
 * Format ngày tháng
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

/**
 * Format ngày giờ
 */
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
}

/**
 * Hiển thị thông báo toast
 */
function showToast(message, type = 'info') {
    // Tạo toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Auto remove sau 3s
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Confirm dialog
 */
function confirmDialog(message) {
    return confirm(message);
}

/**
 * Loading overlay
 */
function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Export utilities
window.Utils = {
    formatCurrency,
    formatDate,
    formatDateTime,
    showToast,
    confirmDialog,
    showLoading,
    hideLoading
};
