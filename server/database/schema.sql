CREATE DATABASE IF NOT EXISTS quanlytaphoa 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
--- vinh

--- hue

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


