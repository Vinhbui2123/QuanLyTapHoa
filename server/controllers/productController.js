const { query } = require('../config/database');

/**
 * Lấy danh sách sản phẩm
 */
exports.getAll = async (req, res, next) => {
    try {
        const { search, category, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        let sql = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE
    `;
        const params = [];

        if (search) {
            sql += ' AND (p.name LIKE ? OR p.barcode LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (category) {
            sql += ' AND p.category_id = ?';
            params.push(category);
        }

        sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const products = await query(sql, params);

        res.json({
            status: 'success',
            data: products,
            meta: { page: parseInt(page), limit: parseInt(limit) }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy chi tiết sản phẩm
 */
exports.getById = async (req, res, next) => {
    try {
        const products = await query(
            `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.json({
            status: 'success',
            data: products[0]
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Thêm sản phẩm mới
 */
exports.create = async (req, res, next) => {
    try {
        const { name, barcode, categoryId, costPrice, salePrice,unit, minStock = 10 } = req.body;

        if (!name || !salePrice) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập tên và giá bán sản phẩm'
            });
        }

        const result = await query(
            `INSERT INTO products (name, barcode, category_id, cost_price, sale_price, unit, min_stock) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, barcode, categoryId, costPrice, salePrice, unit, minStock]
        );

        res.status(201).json({
            status: 'success',
            message: 'Thêm sản phẩm thành công',
            data: { productId: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Cập nhật sản phẩm
 */
exports.update = async (req, res, next) => {
    try {
        const { name, barcode, categoryId, costPrice, salePrice, unit, minStock } = req.body;

        await query(
            `UPDATE products SET 
        name = COALESCE(?, name),
        barcode = COALESCE(?, barcode),
        category_id = COALESCE(?, category_id),
        cost_price = COALESCE(?, cost_price),
        sale_price = COALESCE(?, sale_price),
        unit = COALESCE(?, unit),
        min_stock = COALESCE(?, min_stock),
        updated_at = NOW()
       WHERE id = ?`,
            [name ?? null, barcode ?? null, categoryId ?? null, costPrice ?? null, salePrice ?? null, unit ?? null, minStock ?? null, req.params.id]
        );

        res.json({
            status: 'success',
            message: 'Cập nhật sản phẩm thành công'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Xóa sản phẩm (soft delete)
 */
exports.delete = async (req, res, next) => {
    try {
        await query(
            'UPDATE products SET is_active = FALSE, updated_at = NOW() WHERE id = ?',
            [req.params.id]
        );

        res.json({
            status: 'success',
            message: 'Xóa sản phẩm thành công'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy sản phẩm sắp hết hàng
 */
exports.getLowStock = async (req, res, next) => {
    try {
        const products = await query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE AND p.stock_quantity <= p.min_stock
      ORDER BY p.stock_quantity ASC
    `);

        res.json({
            status: 'success',
            data: products
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy sản phẩm sắp hết hạn
 */
exports.getExpiring = async (req, res, next) => {
    try {
        const { days = 30 } = req.query;

        const products = await query(`
      SELECT il.*, p.name as product_name 
      FROM inventory_logs il
      JOIN products p ON il.product_id = p.id
      WHERE il.expiry_date IS NOT NULL 
        AND il.expiry_date <= DATE_ADD(CURDATE(), INTERVAL ? DAY)
        AND il.remaining_quantity > 0
      ORDER BY il.expiry_date ASC
    `, [parseInt(days)]);

        res.json({
            status: 'success',
            data: products
        });
    } catch (error) {
        next(error);
    }
};
