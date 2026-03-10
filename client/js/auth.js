/**
 * Auth Module - Xử lý đăng nhập/đăng xuất
 */

const Auth = {
    /**
     * Kiểm tra đã đăng nhập chưa
     */
    isLoggedIn() {
        return !!API.getToken();
    },

    /**
     * Lấy thông tin user hiện tại
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Lưu thông tin user
     */
    setCurrentUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Đăng nhập
     */
    async login(username, password) {
        try {
            const response = await API.auth.login(username, password);

            if (response.status === 'success') {
                API.setToken(response.data.token);
                this.setCurrentUser(response.data.user);
                return { success: true, user: response.data.user };
            }

            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    /**
     * Đăng xuất
     */
    logout() {
        API.removeToken();
        window.location.href = '/';
    },

    /**
     * Kiểm tra quyền truy cập
     */
    checkAccess(requiredRoles = []) {
        const user = this.getCurrentUser();

        if (!user) {
            return false;
        }

        if (requiredRoles.length === 0) {
            return true;
        }

        return requiredRoles.includes(user.role);
    },

    /**
     * Redirect nếu chưa đăng nhập
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/';
            return false;
        }
        return true;
    },

    /**
     * Redirect nếu đã đăng nhập (cho trang login)
     */
    redirectIfLoggedIn() {
        if (this.isLoggedIn()) {
            window.location.href = '/pages/dashboard.html';
            return true;
        }
        return false;
    }
};

// Export
window.Auth = Auth;
