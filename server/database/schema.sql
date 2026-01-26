CREATE DATABASE IF NOT EXISTS quanlytaphoa 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
--- vinh
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'manager', 'warehouse', 'cashier', 'fresh_food') DEFAULT 'cashier',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    barcode VARCHAR(50) UNIQUE,
    category_id INT,
    cost_price DECIMAL(12, 2) DEFAULT 0,          
    sale_price DECIMAL(12, 2) NOT NULL,           
    stock_quantity INT DEFAULT 0,                  
    min_stock INT DEFAULT 10,                      
    unit VARCHAR(20) DEFAULT 'cái',               
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

--- hue


CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    customer_type ENUM('regular', 'vip', 'wholesale', 'debt')
DEFAULT 'regular',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
 CREATE TABLE invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) DEFAULT 0,
    payment_method ENUM('cash','transfer', 'momo', 'zalopay')
DEFAULT 'cash',
    status ENUM('completed', 'cancelled', 'pending') DEFAULT 'completed',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
 );


CREATE TABLE invoices_items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
  
 );

--- nam

---Lich su xuat nhap kho
CREATE TABLE inventory logs(
    id INT PRIMATY KEY AUTO INCREMENT,
    product_id INT NOT NULL,
    type ENUM('import','export','dispose','adjust') NOT NULL,
    quantity INT NOT NULL,
    remaining_quantity INT,
    batch_id VARCHAR(50),
    expiry_date DATE,
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id)REFERENCES products(id),
    FOREIGN KEY (supplier_id)REFERENCES suppliers(id),
    FOREIGN KEY (user_id)REFERENCES users(id),
);

--- Phieu nhap hang


CREATE TABLE purchase_orders(
    id INT PRIMATY KEY AUTO INCREMENT,
    supplier_id INT NOT NULL,
    user_id INT NOT NULL,
    total amount DECIMAL(12,2) NOT NULL,
    amount paid DECIMAL(12,2) DEFAULT 0,
    status ENUM('pending','completed','cancelled')DEFAULT'pending'
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id)REFERENCES suppliers(id),
    FOREIGN KEY (user_id)REFERENCES users(id),
);

--- Nha cung cap

CREATE TABLE suppliers (
id INT PRIMATY KEY AUTO INCREMENT,
name VARCHAR(200) NOT NULL,
phone VARCHAR(20),
address TEXT,
email VARCHAR(100),
contact_version VARCHAR(100),
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);


