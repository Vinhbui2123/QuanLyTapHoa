/**
 * Main App - Entry point cho frontend
 */

document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = document.querySelector('.login-page');

    if (isLoginPage) {
        initLoginPage();
    } else if (Auth.requireAuth()) {
        initApp();
    }
});

function initLoginPage() {
    if (Auth.redirectIfLoggedIn()) {
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    if (!loginForm || !loginBtn || !loginError) {
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        loginBtn.disabled = true;
        loginBtn.querySelector('.btn-text').style.display = 'none';
        loginBtn.querySelector('.btn-loading').style.display = 'inline';
        loginError.style.display = 'none';

        const result = await Auth.login(username, password);

        if (result.success) {
            window.location.href = '/pages/dashboard.html';
            return;
        }

        loginError.textContent = result.message;
        loginError.style.display = 'block';
        loginBtn.disabled = false;
        loginBtn.querySelector('.btn-text').style.display = 'inline';
        loginBtn.querySelector('.btn-loading').style.display = 'none';
    });
}

function initApp() {
    updateUserInfo();
    initNavigation();
    initLogout();
}

function updateUserInfo() {
    const user = Auth.getCurrentUser();
    const userNameEl = document.querySelector('.header-user-name');
    const userAvatarEl = document.querySelector('.header-user-avatar');

    if (!user) {
        return;
    }

    if (userNameEl) {
        userNameEl.textContent = user.fullName;
    }

    if (userAvatarEl) {
        userAvatarEl.textContent = user.fullName.charAt(0).toUpperCase();
    }
}

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach((item) => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            Auth.logout();
        }
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const palette = {
        success: { color: '#166534', bg: '#f0fdf4', border: '#bbf7d0', icon: 'M20 6 9 17l-5-5' },
        warning: { color: '#92400e', bg: '#fffbeb', border: '#fde68a', icon: 'M12 8v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z' },
        error: { color: '#991b1b', bg: '#fef2f2', border: '#fecaca', icon: 'm15 9-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
        info: { color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', icon: 'M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z' }
    };

    const tone = palette[type] || palette.info;
    const toast = document.createElement('div');
    toast.style.cssText = `
        min-width: 240px;
        max-width: 320px;
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
        border: 1px solid ${tone.border};
        border-radius: 12px;
        background: ${tone.bg};
        color: ${tone.color};
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        opacity: 0;
        transform: translateY(-6px);
        transition: opacity 140ms ease, transform 140ms ease;
        pointer-events: auto;
    `;
    toast.innerHTML = `
        <span style="display:inline-flex;flex:none;width:18px;height:18px;margin-top:1px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="${tone.icon}"></path>
            </svg>
        </span>
        <span style="font-size:14px;line-height:1.5;"></span>
    `;
    toast.lastElementChild.textContent = message;

    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-6px)';
        setTimeout(() => toast.remove(), 160);
    }, 2400);
}

function confirmDialog(message) {
    return confirm(message);
}

function showLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.62);
        z-index: 9998;
    `;
    overlay.innerHTML = `
        <div style="
            width: 28px;
            height: 28px;
            border: 3px solid rgba(15, 23, 42, 0.12);
            border-top-color: #1f4c7a;
            border-radius: 999px;
            animation: spin 0.7s linear infinite;
        "></div>
    `;

    if (!document.getElementById('loadingSpinnerStyle')) {
        const style = document.createElement('style');
        style.id = 'loadingSpinnerStyle';
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

window.Utils = {
    formatCurrency,
    formatDate,
    formatDateTime,
    showToast,
    confirmDialog,
    showLoading,
    hideLoading
};
