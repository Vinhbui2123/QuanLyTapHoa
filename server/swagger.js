const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'QuanLyTapHoa API',
    version: '1.0.0',
    description: 'API documentation for QuanLyTapHoa - Hệ thống quản lý cửa hàng tạp hóa'
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {

    // ===== AUTH =====
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['username', 'password']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } },
        security: []
      }
    },

    // ===== PRODUCTS =====
    '/api/products': {
      get: {
        tags: ['Products'],
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Tìm kiếm theo tên hoặc barcode' },
          { name: 'category', in: 'query', schema: { type: 'integer' }, description: 'Lọc theo danh mục' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: { '200': { description: 'Thành công' } }
      },
      post: {
        tags: ['Products'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  barcode: { type: 'string' },
                  categoryId: { type: 'integer' },
                  costPrice: { type: 'number' },
                  salePrice: { type: 'number' },
                  unit: { type: 'string' },
                  minStock: { type: 'integer', default: 10 }
                },
                required: ['name', 'salePrice']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/products/{id}': {
      get: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      },
      put: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  barcode: { type: 'string' },
                  categoryId: { type: 'integer' },
                  costPrice: { type: 'number' },
                  salePrice: { type: 'number' },
                  unit: { type: 'string' },
                  minStock: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      },
      delete: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/products/alerts/low-stock': {
      get: {
        tags: ['Products'],
        responses: { '200': { description: 'Thành công' } }
      }
    },

    // ===== CATEGORIES =====
    '/api/categories': {
      get: {
        tags: ['Categories'],
        description: 'Trả về danh sách tất cả danh mục đang hoạt động, sắp xếp theo tên',
        responses: {
          '200': {
            description: 'Thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer'},
                          name: { type: 'string' },
                          description: { type: 'string' },
                          is_active: { type: 'boolean' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Categories'],
        description: 'Thêm một danh mục mới vào hệ thống',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' }
                },
                required: ['name']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Tạo thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        categoryId: { type: 'integer'}
                      }
                    }
                  }
                }
              }
            }
          },
          '400': { description: 'Thiếu tên danh mục' }
        }
      }
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        description: 'Trả về chi tiết danh mục theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID của danh mục' }
        ],
        responses: {
          '200': {
            description: 'Thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        is_active: { type: 'boolean' }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'Không tìm thấy danh mục' }
        }
      },
      put: {
        tags: ['Categories'],
        description: 'Cập nhật tên hoặc mô tả của danh mục theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID của danh mục' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' }
                }         
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Cập nhật thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Categories'],
        description: 'Đánh dấu danh mục là không hoạt động (soft delete), không xóa khỏi database',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID của danh mục' }
        ],
        responses: {
          '200': {
            description: 'Xóa thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },

    // ===== INVOICES =====
    '/api/invoices': {
      get: {
        tags: ['Invoices'],
        parameters: [
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Lọc từ ngày (YYYY-MM-DD)' },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Lọc đến ngày (YYYY-MM-DD)' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: { '200': { description: 'Thành công' } }
      },
      post: {
        tags: ['Invoices'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customerId: { type: 'integer', description: 'ID khách hàng (nếu có)' },
                  items: {
                    type: 'array',
                    description: 'Danh sách sản phẩm mua',
                    items: {
                      type: 'object',
                      properties: {
                        productId: { type: 'integer' },
                        quantity: { type: 'number' },
                        price: { type: 'number' }
                      },
                      required: ['productId', 'quantity', 'price']
                    }
                  },
                  paymentMethod: { type: 'string', enum: ['cash', 'transfer', 'momo', 'zalopay'], default: 'cash' },
                  amountPaid: { type: 'number', description: 'Số tiền khách trả (Bắt buộc nếu paymentMethod là cash)' },
                  note: { type: 'string' }
                },
                required: ['items']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/invoices/{id}/print': {
      get: {
        tags: ['Invoices'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/invoices/{id}/cancel': {
      put: {
        tags: ['Invoices'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      }
    },

    // ===== CUSTOMERS =====
    '/api/customers': {
      get: {
        tags: ['Customers'],
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Tìm kiếm theo tên hoặc số điện thoại' }
        ],
        responses: { '200': { description: 'Thành công' } }
      },
      post: {
        tags: ['Customers'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  customerType: { type: 'string', default: 'regular' }
                },
                required: ['name']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/customers/{id}': {
      put: {
        tags: ['Customers'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  customerType: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      },
      delete: {
        tags: ['Customers'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      }
    },

    // ===== SUPPLIERS =====
    '/api/suppliers': {
      get: {
        tags: ['Suppliers'],
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Tìm kiếm theo tên hoặc số điện thoại' }
        ],
        responses: { '200': { description: 'Thành công' } }
      },
      post: {
        tags: ['Suppliers'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  email: { type: 'string' },
                  contactPerson: { type: 'string' }
                },
                required: ['name']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/suppliers/{id}': {
      put: {
        tags: ['Suppliers'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  email: { type: 'string' },
                  contactPerson: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      },
      delete: {
        tags: ['Suppliers'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Thành công' } }
      }
    },

    // ===== INVENTORY =====
    '/api/inventory': {
      get: {
        tags: ['Inventory'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/inventory/import': {
      post: {
        tags: ['Inventory'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  supplierId: { type: 'integer', description: 'ID nhà cung cấp' },
                  items: {
                    type: 'array',
                    description: 'Danh sách sản phẩm nhập kho',
                    items: {
                      type: 'object',
                      properties: {
                        productId: { type: 'integer' },
                        quantity: { type: 'integer' },
                        batchId: { type: 'string' },
                        expiryDate: { type: 'string', format: 'date' }
                      },
                      required: ['productId', 'quantity']
                    }
                  },
                  note: { type: 'string' }
                },
                required: ['items']
              }
            }
          }
        },
        responses: { '200': { description: 'Thành công' } }
      }
    },

    // ===== REPORTS =====
    '/api/reports/dashboard': {
      get: {
        tags: ['Reports'],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/reports/revenue': {
      get: {
        tags: ['Reports'],
        parameters: [
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Từ ngày (YYYY-MM-DD)' },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Đến ngày (YYYY-MM-DD)' },
          { name: 'groupBy', in: 'query', schema: { type: 'string', enum: ['day', 'month', 'year'], default: 'day' }, description: 'Gom nhóm theo' }
        ],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/reports/top-products': {
      get: {
        tags: ['Reports'],
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Giới hạn số lượng' }
        ],
        responses: { '200': { description: 'Thành công' } }
      }
    },
    '/api/reports/slow-products': {
      get: {
        tags: ['Reports'],
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Giới hạn số lượng' }
        ],
        responses: { '200': { description: 'Thành công' } }
      }
    }
  }
};

module.exports = swaggerSpec;
