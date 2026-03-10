/**
 * API Module - Giao tiếp với Backend
 * File này dùng chung cho tất cả pages
 */

const API = {
    baseURL: '/api',

    /**
     * Lấy token từ localStorage
     */
    getToken() {
        return localStorage.getItem('token');
    },

    /**
     * Set token vào localStorage
     */
    setToken(token) {
        localStorage.setItem('token', token);
    },

    /**
     * Xóa token
     */
    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Lấy headers cho request
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    },

    /**
     * Base request method
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const config = {
            headers: this.getHeaders(),
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            // Unauthorized - redirect to login
            if (response.status === 401) {
                this.removeToken();
                window.location.href = '/';
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || 'Có lỗi xảy ra');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * GET request
     */
    async get(endpoint, params = {}) {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams.toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.request(url, { method: 'GET' });
    },

    /**
     * POST request
     */
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * PUT request
     */
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },

    // ============================================
    // AUTH ENDPOINTS
    // ============================================
    auth: {
        login: (username, password) => API.post('/auth/login', { username, password }),
        register: (data) => API.post('/auth/register', data),
        getMe: () => API.get('/auth/me'),
        changePassword: (data) => API.put('/auth/change-password', data)
    },

    // ============================================
    // PRODUCTS ENDPOINTS
    // ============================================
    products: {
        getAll: (params) => API.get('/products', params),
        getById: (id) => API.get(`/products/${id}`),
        create: (data) => API.post('/products', data),
        update: (id, data) => API.put(`/products/${id}`, data),
        delete: (id) => API.delete(`/products/${id}`),
        getLowStock: () => API.get('/products/alerts/low-stock'),
        getExpiring: (days) => API.get('/products/alerts/expiring', { days })
    },

    // ============================================
    // CATEGORIES ENDPOINTS
    // ============================================
    categories: {
        getAll: () => API.get('/categories'),
        create: (data) => API.post('/categories', data),
        update: (id, data) => API.put(`/categories/${id}`, data),
        delete: (id) => API.delete(`/categories/${id}`)
    },

    // ============================================
    // INVOICES ENDPOINTS
    // ============================================
    invoices: {
        getAll: (params) => API.get('/invoices', params),
        getById: (id) => API.get(`/invoices/${id}`),
        create: (data) => API.post('/invoices', data),
        cancel: (id) => API.put(`/invoices/${id}/cancel`)
    },

    // ============================================
    // CUSTOMERS ENDPOINTS
    // ============================================
    customers: {
        getAll: (params) => API.get('/customers', params),
        getById: (id) => API.get(`/customers/${id}`),
        create: (data) => API.post('/customers', data),
        update: (id, data) => API.put(`/customers/${id}`, data),
        delete: (id) => API.delete(`/customers/${id}`),
        getHistory: (id) => API.get(`/customers/${id}/history`),
        getDebt: (id) => API.get(`/customers/${id}/debt`)
    },

    // ============================================
    // SUPPLIERS ENDPOINTS
    // ============================================
    suppliers: {
        getAll: (params) => API.get('/suppliers', params),
        getById: (id) => API.get(`/suppliers/${id}`),
        create: (data) => API.post('/suppliers', data),
        update: (id, data) => API.put(`/suppliers/${id}`, data),
        delete: (id) => API.delete(`/suppliers/${id}`)
    },

    // ============================================
    // INVENTORY ENDPOINTS
    // ============================================
    inventory: {
        getAll: () => API.get('/inventory'),
        import: (data) => API.post('/inventory/import', data),
        export: (data) => API.post('/inventory/export', data),
        getLogs: (params) => API.get('/inventory/logs', params),
        dispose: (data) => API.post('/inventory/dispose', data),
        getExpiring: (days) => API.get('/inventory/expiring', { days })
    },

    // ============================================
    // REPORTS ENDPOINTS
    // ============================================
    reports: {
        getDashboard: () => API.get('/reports/dashboard'),
        getRevenue: (params) => API.get('/reports/revenue', params),
        getProfit: (params) => API.get('/reports/profit', params),
        getInventory: () => API.get('/reports/inventory'),
        getTopProducts: (params) => API.get('/reports/top-products', params),
        getSlowProducts: (params) => API.get('/reports/slow-products', params),
        getDaily: (date) => API.get('/reports/daily', { date })
    }
};

// Export for use in other files
window.API = API;
