// Sales Management System JavaScript
// Data Storage
class SalesManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.customers = JSON.parse(localStorage.getItem('customers')) || [];
        this.languageManager = new LanguageManager();
        this.init();
    }

    init() {
        this.languageManager.init();
        this.setupEventListeners();
        this.setupLanguageListeners();
        this.loadDashboard();
        this.updateStats();
        this.loadSampleData();
    }

    // Save data automatically to localStorage
    saveData() {
        localStorage.setItem('products', JSON.stringify(this.products));
        localStorage.setItem('orders', JSON.stringify(this.orders));
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    // Load sample data if empty
    loadSampleData() {
        if (this.products.length === 0) {
            this.products = [
                {
                    id: 1,
                    name: 'هاتف ذكي سامسونج',
                    price: 2500,
                    stock: 15,
                    category: 'electronics',
                    description: 'هاتف ذكي بمواصفات عالية'
                },
                {
                    id: 2,
                    name: 'قميص قطني',
                    price: 120,
                    stock: 50,
                    category: 'clothing',
                    description: 'قميص قطني عالي الجودة'
                },
                {
                    id: 3,
                    name: 'كتاب البرمجة',
                    price: 85,
                    stock: 5,
                    category: 'books',
                    description: 'كتاب تعليم البرمجة للمبتدئين'
                }
            ];
        }

        this.saveData();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Tab navigation - improved event handling
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the tab name from the button or its parent
                let tabName = e.target.dataset.tab;
                if (!tabName && e.target.parentElement) {
                    tabName = e.target.parentElement.dataset.tab;
                }
                if (!tabName && e.target.closest('[data-tab]')) {
                    tabName = e.target.closest('[data-tab]').dataset.tab;
                }
                
                if (tabName) {
                    this.switchTab(tabName);
                }
            });
        });

        // Product modal
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openProductModal();
        });

        document.getElementById('closeProductModal').addEventListener('click', () => {
            this.closeProductModal();
        });

        document.getElementById('cancelProductBtn').addEventListener('click', () => {
            this.closeProductModal();
        });

        document.getElementById('productForm').addEventListener('submit', (e) => {
            this.handleProductSubmit(e);
        });

        // Customer modal
        document.getElementById('addCustomerBtn').addEventListener('click', () => {
            this.openCustomerModal();
        });

        document.getElementById('closeCustomerModal').addEventListener('click', () => {
            this.closeCustomerModal();
        });

        document.getElementById('cancelCustomerBtn').addEventListener('click', () => {
            this.closeCustomerModal();
        });

        document.getElementById('customerForm').addEventListener('submit', (e) => {
            this.handleCustomerSubmit(e);
        });

        // Filters
        document.getElementById('orderStatusFilter').addEventListener('change', () => {
            this.loadOrders();
        });

        document.getElementById('orderDateFilter').addEventListener('change', () => {
            this.loadOrders();
        });

        // Analytics
        document.getElementById('generateReportBtn').addEventListener('click', () => {
            this.generateAnalyticsReport();
        });

        // Order modal
        document.getElementById('addOrderBtn').addEventListener('click', () => {
            this.openOrderModal();
        });

        document.getElementById('closeOrderModal').addEventListener('click', () => {
            this.closeOrderModal();
        });

        document.getElementById('cancelOrderBtn').addEventListener('click', () => {
            this.closeOrderModal();
        });

        document.getElementById('orderForm').addEventListener('submit', (e) => {
            this.handleOrderSubmit(e);
        });

        document.getElementById('addProductToOrder').addEventListener('click', () => {
            this.addProductToOrder();
        });


        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Setup Language Event Listeners
    setupLanguageListeners() {
        // Listen for language change events
        document.addEventListener('languageChanged', (e) => {
            this.onLanguageChanged(e.detail.language);
        });
    }

    // Handle language change
    onLanguageChanged(language) {
        // Update document title
        document.title = this.languageManager.t('appTitle');
        
        // Refresh current view
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        this.switchTab(activeTab);
        this.updateStats();
        
        // Update charts with new language
        this.updateChartsLanguage();
    }

    // Update charts with new language labels
    updateChartsLanguage() {
        // Recreate charts with new language labels
        if (document.querySelector('.tab-content.active').id === 'dashboard') {
            this.createSalesChart();
        }
        if (document.querySelector('.tab-content.active').id === 'analytics') {
            this.loadAnalytics();
        }
    }

    // Tab Management
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Load specific tab content
        if (tabName === 'dashboard') this.loadDashboard();
        if (tabName === 'products') this.loadProducts();
        if (tabName === 'orders') this.loadOrders();
        if (tabName === 'customers') this.loadCustomers();
        if (tabName === 'analytics') this.loadAnalytics();
    }

    // Update Statistics
    updateStats() {
        const totalSales = this.orders.reduce((sum, order) => sum + order.total, 0);
        const todayOrders = this.orders.filter(order => 
            order.date === new Date().toISOString().split('T')[0]
        ).length;
        const totalProducts = this.products.length;

        document.getElementById('totalSales').innerHTML = `${totalSales.toLocaleString()} <span data-translate="currency">${this.languageManager.t('currency')}</span>`;
        document.getElementById('todayOrders').textContent = todayOrders;
        document.getElementById('totalProducts').textContent = totalProducts;
    }

    // Dashboard Functions
    loadDashboard() {
        this.loadRecentOrders();
        this.loadTopProducts();
        this.loadStockAlerts();
        this.createSalesChart();
    }

    loadRecentOrders() {
        const recentOrders = this.orders.slice(-5).reverse();
        const container = document.getElementById('recentOrders');
        
        container.innerHTML = recentOrders.map(order => `
            <div class="recent-order">
                <div class="order-info">
                    <div class="order-number">#${order.id}</div>
                    <div class="order-customer">${order.customerName}</div>
                </div>
                <div class="order-amount">${order.total.toLocaleString()} ${this.languageManager.t('currency')}</div>
            </div>
        `).join('');
    }

    loadTopProducts() {
        const productSales = {};
        this.orders.forEach(order => {
            order.products.forEach(product => {
                if (productSales[product.id]) {
                    productSales[product.id].quantity += product.quantity;
                } else {
                    productSales[product.id] = {
                        name: product.name,
                        quantity: product.quantity
                    };
                }
            });
        });

        const topProducts = Object.values(productSales)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        const container = document.getElementById('topProducts');
        container.innerHTML = topProducts.map(product => `
            <div class="top-product">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                </div>
                <div class="product-sales">${product.quantity} ${this.languageManager.t('salesAmount')}</div>
            </div>
        `).join('');
    }

    loadStockAlerts() {
        const lowStockProducts = this.products.filter(product => product.stock < 10);
        const container = document.getElementById('stockAlerts');
        
        if (lowStockProducts.length === 0) {
            container.innerHTML = `<div class="stock-alert"><div class="alert-info">${this.languageManager.t('noStockAlerts')}</div></div>`;
            return;
        }

        container.innerHTML = lowStockProducts.map(product => `
            <div class="stock-alert">
                <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="alert-info">
                    <div class="alert-product">${product.name}</div>
                    <div class="alert-message">${this.languageManager.t('remainingQuantity')} ${product.stock}</div>
                </div>
            </div>
        `).join('');
    }

    createSalesChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        
        // Generate last 7 days data
        const last7Days = [];
        const salesData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Get day name based on current language
            const locale = this.languageManager.getCurrentLanguage() === 'ar' ? 'ar-SA' : 'en-US';
            last7Days.push(date.toLocaleDateString(locale, { weekday: 'short' }));
            
            const daySales = this.orders
                .filter(order => order.date === dateStr)
                .reduce((sum, order) => sum + order.total, 0);
            salesData.push(daySales);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: this.languageManager.t('salesChart'),
                    data: salesData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => {
                                return value.toLocaleString() + ' ' + this.languageManager.t('currency');
                            }
                        }
                    }
                }
            }
        });
    }

    // Product Management
    loadProducts() {
        const container = document.getElementById('productsGrid');
        container.innerHTML = this.products.map(product => `
            <div class="product-card">
                <div class="product-header">
                    <div>
                        <div class="product-name">${product.name}</div>
                        <span class="product-category">${this.getCategoryName(product.category)}</span>
                    </div>
                </div>
                <div class="product-price">${product.price.toLocaleString()} ${this.languageManager.t('currency')}</div>
                <div class="product-stock">
                    <span class="stock-indicator ${this.getStockLevel(product.stock)}"></span>
                    ${this.languageManager.t('availableQuantity')}: ${product.stock}
                </div>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-warning" onclick="salesManager.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> ${this.languageManager.t('edit')}
                    </button>
                    <button class="btn btn-danger" onclick="salesManager.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> ${this.languageManager.t('delete')}
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        return this.languageManager.t(category) || category;
    }

    getStockLevel(stock) {
        if (stock > 20) return 'high';
        if (stock > 10) return 'medium';
        return 'low';
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const form = document.getElementById('productForm');
        const title = document.getElementById('productModalTitle');
        
        if (productId) {
            const product = this.products.find(p => p.id === productId);
            title.textContent = this.languageManager.t('editProduct');
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productDescription').value = product.description;
            form.dataset.productId = productId;
        } else {
            title.textContent = this.languageManager.t('addNewProduct');
            form.reset();
            delete form.dataset.productId;
        }
        
        modal.style.display = 'block';
    }

    closeProductModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    handleProductSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const productId = form.dataset.productId;
        
        const productData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value
        };

        if (productId) {
            // Edit existing product
            const index = this.products.findIndex(p => p.id === parseInt(productId));
            this.products[index] = { ...this.products[index], ...productData };
        } else {
            // Add new product
            const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
            this.products.push({ id: newId, ...productData });
        }

        this.saveData();
        this.loadProducts();
        this.updateStats();
        this.closeProductModal();
        this.showMessage(this.languageManager.t('productSavedSuccess'), 'success');
    }

    editProduct(id) {
        this.openProductModal(id);
    }

    deleteProduct(id) {
        if (confirm(this.languageManager.t('confirmDeleteProduct'))) {
            this.products = this.products.filter(p => p.id !== id);
            this.saveData();
            this.loadProducts();
            this.updateStats();
            this.showMessage(this.languageManager.t('productDeletedSuccess'), 'success');
        }
    }

    // Order Management
    loadOrders() {
        const statusFilter = document.getElementById('orderStatusFilter').value;
        const dateFilter = document.getElementById('orderDateFilter').value;
        
        let filteredOrders = this.orders;
        
        if (statusFilter) {
            filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
        }
        
        if (dateFilter) {
            filteredOrders = filteredOrders.filter(order => order.date === dateFilter);
        }

        const tbody = document.getElementById('ordersTableBody');
        const locale = this.languageManager.getCurrentLanguage() === 'ar' ? 'ar-SA' : 'en-US';
        
        tbody.innerHTML = filteredOrders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.products.map(p => `${p.name} (${p.quantity})`).join(', ')}</td>
                <td>${order.total.toLocaleString()} ${this.languageManager.t('currency')}</td>
                <td><span class="order-status status-${order.status}">${this.getStatusName(order.status)}</span></td>
                <td>${new Date(order.date).toLocaleDateString(locale)}</td>
                <td>
                    <select onchange="salesManager.updateOrderStatus(${order.id}, this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>${this.languageManager.t('pending')}</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>${this.languageManager.t('processing')}</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>${this.languageManager.t('shipped')}</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>${this.languageManager.t('delivered')}</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>${this.languageManager.t('cancelled')}</option>
                    </select>
                    <button class="btn btn-danger btn-sm" onclick="salesManager.deleteOrder(${order.id})" style="margin-left: 10px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getStatusName(status) {
        return this.languageManager.t(status) || status;
    }

    updateOrderStatus(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            this.saveData();
            this.loadOrders();
            this.showMessage(this.languageManager.t('orderStatusUpdated'), 'success');
        }
    }

    deleteOrder(orderId) {
        if (confirm(this.languageManager.t('confirmDeleteOrder'))) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                // تحديث إحصائيات العميل
                const customer = this.customers.find(c => c.id === order.customerId);
                if (customer) {
                    customer.totalOrders -= 1;
                    customer.totalSpent -= order.total;
                    // التأكد من عدم وجود قيم سالبة
                    if (customer.totalOrders < 0) customer.totalOrders = 0;
                    if (customer.totalSpent < 0) customer.totalSpent = 0;
                }
                
                // حذف الطلبية
                this.orders = this.orders.filter(o => o.id !== orderId);
                
                this.saveData();
                this.loadOrders();
                this.loadCustomers(); // تحديث قائمة العملاء
                this.updateStats();
                this.showMessage(this.languageManager.t('orderDeleted'), 'success');
            }
        }
    }

    // Customer Management
    loadCustomers() {
        const container = document.getElementById('customersGrid');
        container.innerHTML = this.customers.map(customer => `
            <div class="customer-card">
                <div class="customer-info">
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-details">
                        <div><i class="fas fa-envelope"></i> ${customer.email}</div>
                        <div><i class="fas fa-phone"></i> ${customer.phone}</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${customer.address}</div>
                    </div>
                </div>
                <div class="customer-stats">
                    <div class="customer-stat">
                        <span class="customer-stat-value">${customer.totalOrders}</span>
                        <span class="customer-stat-label">${this.languageManager.t('ordersCount')}</span>
                    </div>
                    <div class="customer-stat">
                        <span class="customer-stat-value">${customer.totalSpent.toLocaleString()}</span>
                        <span class="customer-stat-label">${this.languageManager.t('currency')}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-warning" onclick="salesManager.editCustomer(${customer.id})">
                        <i class="fas fa-edit"></i> ${this.languageManager.t('edit')}
                    </button>
                    <button class="btn btn-danger" onclick="salesManager.deleteCustomer(${customer.id})">
                        <i class="fas fa-trash"></i> ${this.languageManager.t('delete')}
                    </button>
                </div>
            </div>
        `).join('');
    }

    openCustomerModal(customerId = null) {
        const modal = document.getElementById('customerModal');
        const form = document.getElementById('customerForm');
        const title = document.getElementById('customerModalTitle');
        
        if (customerId) {
            const customer = this.customers.find(c => c.id === customerId);
            title.textContent = this.languageManager.t('editCustomer');
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phone;
            document.getElementById('customerAddress').value = customer.address;
            form.dataset.customerId = customerId;
        } else {
            title.textContent = this.languageManager.t('addNewCustomer');
            form.reset();
            delete form.dataset.customerId;
        }
        
        modal.style.display = 'block';
    }

    closeCustomerModal() {
        document.getElementById('customerModal').style.display = 'none';
    }

    handleCustomerSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const customerId = form.dataset.customerId;
        
        const customerData = {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value
        };

        if (customerId) {
            // Edit existing customer
            const index = this.customers.findIndex(c => c.id === parseInt(customerId));
            this.customers[index] = { ...this.customers[index], ...customerData };
        } else {
            // Add new customer
            const newId = Math.max(...this.customers.map(c => c.id), 0) + 1;
            this.customers.push({ 
                id: newId, 
                ...customerData, 
                totalOrders: 0, 
                totalSpent: 0 
            });
        }

        this.saveData();
        this.loadCustomers();
        this.closeCustomerModal();
        this.showMessage(this.languageManager.t('customerSavedSuccess'), 'success');
    }

    editCustomer(id) {
        this.openCustomerModal(id);
    }

    deleteCustomer(id) {
        if (confirm(this.languageManager.t('confirmDeleteCustomer'))) {
            // حذف العميل
            this.customers = this.customers.filter(c => c.id !== id);
            
            // حذف جميع طلبيات هذا العميل تلقائياً
            const deletedOrdersCount = this.orders.filter(order => order.customerId === id).length;
            this.orders = this.orders.filter(order => order.customerId !== id);
            
            this.saveData();
            this.loadCustomers();
            this.loadOrders(); // تحديث قائمة الطلبات
            this.updateStats();
            
            // رسالة تأكيد تتضمن عدد الطلبيات المحذوفة
            const message = deletedOrdersCount > 0 
                ? `${this.languageManager.t('customerDeleted')} وتم حذف ${deletedOrdersCount} طلبية مرتبطة به`
                : this.languageManager.t('customerDeleted');
            this.showMessage(message, 'success');
        }
    }

    createPeriodSalesChart() {
        const ctx = document.getElementById('periodSalesChart').getContext('2d');
        
        // Generate monthly data for the last 6 months
        const monthlyData = [];
        const monthLabels = [];
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStr = date.toLocaleDateString('ar-SA', { month: 'short', year: 'numeric' });
            monthLabels.push(monthStr);
            
            const monthSales = this.orders
                .filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.getMonth() === date.getMonth() && 
                           orderDate.getFullYear() === date.getFullYear();
                })
                .reduce((sum, order) => sum + order.total, 0);
            monthlyData.push(monthSales);
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: this.languageManager.t('monthlySales'),
                    data: monthlyData,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667eea',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => {
                                return value.toLocaleString() + ' ' + this.languageManager.t('currency');
                            }
                        }
                    }
                }
            }
        });
    }

    createProductSalesChart() {
        const ctx = document.getElementById('productSalesChart').getContext('2d');
        
        const productSales = {};
        this.orders.forEach(order => {
            order.products.forEach(product => {
                if (productSales[product.name]) {
                    productSales[product.name] += product.quantity * product.price;
                } else {
                    productSales[product.name] = product.quantity * product.price;
                }
            });
        });

        const sortedProducts = Object.entries(productSales)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: sortedProducts.map(([name]) => name),
                datasets: [{
                    data: sortedProducts.map(([, sales]) => sales),
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#f5576c',
                        '#4facfe'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createMonthlyGrowthChart() {
        const ctx = document.getElementById('monthlyGrowthChart').getContext('2d');
        
        // Calculate growth rate for last 6 months
        const growthData = [];
        const monthLabels = [];
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStr = date.toLocaleDateString('ar-SA', { month: 'short' });
            monthLabels.push(monthStr);
            
            const currentMonthSales = this.orders
                .filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.getMonth() === date.getMonth() && 
                           orderDate.getFullYear() === date.getFullYear();
                })
                .reduce((sum, order) => sum + order.total, 0);
            
            const prevDate = new Date(date);
            prevDate.setMonth(prevDate.getMonth() - 1);
            
            const prevMonthSales = this.orders
                .filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.getMonth() === prevDate.getMonth() && 
                           orderDate.getFullYear() === prevDate.getFullYear();
                })
                .reduce((sum, order) => sum + order.total, 0);
            
            const growth = prevMonthSales > 0 ? 
                ((currentMonthSales - prevMonthSales) / prevMonthSales) * 100 : 0;
            growthData.push(growth);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: this.languageManager.t('growthRate'),
                    data: growthData,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    loadCustomerPerformance() {
        const customerPerformance = this.customers
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5);

        const container = document.getElementById('customerPerformance');
        container.innerHTML = customerPerformance.map(customer => `
            <div class="performance-item">
                <div class="performance-customer">
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-orders">${customer.totalOrders} ${this.languageManager.t('ordersCount')}</div>
                </div>
                <div class="performance-value">${customer.totalSpent.toLocaleString()} ${this.languageManager.t('currency')}</div>
            </div>
        `).join('');
    }

    generateAnalyticsReport() {
        const startDate = document.getElementById('analyticsStartDate').value;
        const endDate = document.getElementById('analyticsEndDate').value;
        
        if (!startDate || !endDate) {
            this.showMessage(this.languageManager.t('selectStartDate'), 'warning');
            return;
        }
        
        // Filter orders by date range
        const filteredOrders = this.orders.filter(order => {
            return order.date >= startDate && order.date <= endDate;
        });
        
        const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = filteredOrders.length;
        const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
        
        this.showMessage(
            `${this.languageManager.t('reportPeriod')} ${startDate} ${this.languageManager.t('to')} ${endDate}:\n` +
            `${this.languageManager.t('totalSalesReport')} ${totalSales.toLocaleString()} ${this.languageManager.t('currency')}\n` +
            `${this.languageManager.t('totalOrdersReport')} ${totalOrders}\n` +
            `${this.languageManager.t('avgOrderValue')} ${avgOrderValue.toFixed(2)} ${this.languageManager.t('currency')}`,
            'success'
        );
    }

    // Order Management Functions
    openOrderModal() {
        const modal = document.getElementById('orderModal');
        const form = document.getElementById('orderForm');
        
        // Reset form
        form.reset();
        
        // Set default date to today
        document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];
        
        // Populate customers
        this.populateCustomerSelect();
        
        // Clear products
        this.clearOrderProducts();
        
        modal.style.display = 'block';
    }

    closeOrderModal() {
        document.getElementById('orderModal').style.display = 'none';
    }

    populateCustomerSelect() {
        const select = document.getElementById('orderCustomer');
        select.innerHTML = `<option value="">${this.languageManager.t('selectCustomer')}</option>`;
        
        this.customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = customer.name;
            select.appendChild(option);
        });
    }

    addProductToOrder() {
        const container = document.getElementById('orderProducts');
        const productItem = document.createElement('div');
        productItem.className = 'order-product-item';
        
        productItem.innerHTML = `
            <div class="order-product-select">
                <select class="product-select" required>
                    <option value="">${this.languageManager.t('selectCategory')}</option>
                    ${this.products.map(product => 
                        `<option value="${product.id}" data-price="${product.price}">${product.name} - ${product.price} ${this.languageManager.t('currency')}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="order-product-quantity">
                <input type="number" class="quantity-input" min="1" value="1" placeholder="${this.languageManager.t('quantity')}">
            </div>
            <div class="order-product-price">
                <span class="item-total">0 ${this.languageManager.t('currency')}</span>
            </div>
            <button type="button" class="btn btn-danger order-product-remove">
                <i class="fas fa-trash"></i> ${this.languageManager.t('removeProduct')}
            </button>
        `;
        
        container.appendChild(productItem);
        
        // Add event listeners
        const select = productItem.querySelector('.product-select');
        const quantityInput = productItem.querySelector('.quantity-input');
        const removeBtn = productItem.querySelector('.order-product-remove');
        
        select.addEventListener('change', () => this.updateOrderTotal());
        quantityInput.addEventListener('input', () => this.updateOrderTotal());
        removeBtn.addEventListener('click', () => {
            productItem.remove();
            this.updateOrderTotal();
        });
        
        this.updateOrderTotal();
    }

    clearOrderProducts() {
        const container = document.getElementById('orderProducts');
        container.innerHTML = `<div class="empty-order-products">${this.languageManager.t('addProduct')}</div>`;
        this.updateOrderTotal();
    }

    updateOrderTotal() {
        const productItems = document.querySelectorAll('.order-product-item');
        let total = 0;
        
        productItems.forEach(item => {
            const select = item.querySelector('.product-select');
            const quantityInput = item.querySelector('.quantity-input');
            const itemTotalSpan = item.querySelector('.item-total');
            
            if (select.value && quantityInput.value) {
                const price = parseFloat(select.selectedOptions[0].dataset.price || 0);
                const quantity = parseInt(quantityInput.value || 0);
                const itemTotal = price * quantity;
                
                itemTotalSpan.textContent = `${itemTotal.toLocaleString()} ${this.languageManager.t('currency')}`;
                total += itemTotal;
            } else {
                itemTotalSpan.textContent = `0 ${this.languageManager.t('currency')}`;
            }
        });
        
        document.getElementById('orderTotal').innerHTML = `${total.toLocaleString()} <span data-translate="currency">${this.languageManager.t('currency')}</span>`;
    }

    handleOrderSubmit(e) {
        e.preventDefault();
        
        const customerId = document.getElementById('orderCustomer').value;
        const status = document.getElementById('orderStatus').value;
        const date = document.getElementById('orderDate').value;
        
        if (!customerId) {
            this.showMessage(this.languageManager.t('selectCustomer'), 'warning');
            return;
        }
        
        // Get selected products
        const productItems = document.querySelectorAll('.order-product-item');
        const products = [];
        let total = 0;
        
        productItems.forEach(item => {
            const select = item.querySelector('.product-select');
            const quantityInput = item.querySelector('.quantity-input');
            
            if (select.value && quantityInput.value) {
                const productId = parseInt(select.value);
                const product = this.products.find(p => p.id === productId);
                const quantity = parseInt(quantityInput.value);
                const price = product.price;
                
                products.push({
                    id: productId,
                    name: product.name,
                    quantity: quantity,
                    price: price
                });
                
                total += price * quantity;
                
                // Update product stock
                product.stock -= quantity;
            }
        });
        
        if (products.length === 0) {
            this.showMessage(this.languageManager.t('addProduct'), 'warning');
            return;
        }
        
        // Create new order
        const customer = this.customers.find(c => c.id === parseInt(customerId));
        const newOrderId = Math.max(...this.orders.map(o => o.id), 1000) + 1;
        
        const newOrder = {
            id: newOrderId,
            customerId: parseInt(customerId),
            customerName: customer.name,
            products: products,
            total: total,
            status: status,
            date: date
        };
        
        this.orders.push(newOrder);
        
        // Update customer stats
        customer.totalOrders += 1;
        customer.totalSpent += total;
        
        this.saveData();
        this.loadOrders();
        this.updateStats();
        this.closeOrderModal();
        this.showMessage(this.languageManager.t('orderSavedSuccess'), 'success');
    }


    // Utility Functions
    showMessage(message, type = 'success') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle'}"></i>
            ${message.replace(/\n/g, '<br>')}
        `;
        
        // Insert at top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageEl, mainContent.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Initialize the application
let salesManager;
document.addEventListener('DOMContentLoaded', () => {
    salesManager = new SalesManager();
});
