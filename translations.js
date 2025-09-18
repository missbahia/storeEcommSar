// Translation system for Sales Management Application
const translations = {
    ar: {
        // Header
        appTitle: "إدارة مبيعات المتجر",
        totalSales: "إجمالي المبيعات",
        todayOrders: "الطلبات اليوم",
        totalProducts: "المنتجات",
        currency: "ر.س",
        
        // Navigation
        dashboard: "لوحة التحكم",
        products: "المنتجات",
        orders: "الطلبات",
        customers: "العملاء",
        analytics: "التحليلات",
        
        // Dashboard
        weekSales: "مبيعات الأسبوع",
        recentOrders: "آخر الطلبات",
        topProducts: "أفضل المنتجات مبيعاً",
        stockAlerts: "تنبيهات المخزون",
        noStockAlerts: "لا توجد تنبيهات مخزون حالياً",
        remainingQuantity: "الكمية المتبقية:",
        salesAmount: "مبيعة",
        
        // Products
        productManagement: "إدارة المنتجات",
        addNewProduct: "إضافة منتج جديد",
        editProduct: "تعديل المنتج",
        productName: "اسم المنتج",
        price: "السعر",
        availableQuantity: "الكمية المتوفرة",
        category: "الفئة",
        description: "الوصف",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء",
        
        // Categories
        selectCategory: "اختر الفئة",
        electronics: "إلكترونيات",
        clothing: "ملابس",
        books: "كتب",
        home: "منزل وحديقة",
        sports: "رياضة",
        beauty: "جمال وعناية",
        
        // Orders
        orderManagement: "إدارة الطلبات",
        allOrders: "جميع الطلبات",
        orderNumber: "رقم الطلب",
        customer: "العميل",
        productsCol: "المنتجات",
        amount: "المبلغ",
        status: "الحالة",
        date: "التاريخ",
        actions: "الإجراءات",
        orderDate: "تاريخ الطلب",
        
        // Order Status
        pending: "قيد الانتظار",
        processing: "قيد المعالجة",
        shipped: "تم الشحن",
        delivered: "تم التسليم",
        cancelled: "ملغي",
        
        // Customers
        customerManagement: "إدارة العملاء",
        addNewCustomer: "إضافة عميل جديد",
        editCustomer: "تعديل العميل",
        customerName: "اسم العميل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        address: "العنوان",
        ordersCount: "طلبات",
        
        // Analytics
        analyticsReports: "التحليلات والتقارير",
        periodSales: "مبيعات الفترة",
        productSalesDistribution: "توزيع المبيعات حسب المنتج",
        monthlyGrowth: "نمو المبيعات الشهري",
        customerPerformance: "أداء العملاء",
        generateReport: "إنشاء تقرير",
        selectStartDate: "يرجى تحديد تاريخ البداية والنهاية",
        
        // Messages
        productSavedSuccess: "تم حفظ المنتج بنجاح",
        productDeletedSuccess: "تم حذف المنتج بنجاح",
        customerSavedSuccess: "تم حفظ العميل بنجاح",
        customerDeletedSuccess: "تم حذف العميل بنجاح",
        orderStatusUpdated: "تم تحديث حالة الطلب بنجاح",
        confirmDeleteProduct: "هل أنت متأكد من حذف هذا المنتج؟",
        confirmDeleteCustomer: "هل أنت متأكد من حذف هذا العميل؟",
        
        // Report
        reportPeriod: "تقرير الفترة من",
        to: "إلى",
        totalSalesReport: "إجمالي المبيعات:",
        totalOrdersReport: "عدد الطلبات:",
        avgOrderValue: "متوسط قيمة الطلب:",
        
        // Chart Labels
        salesChart: "المبيعات (ر.س)",
        monthlySales: "المبيعات الشهرية (ر.س)",
        growthRate: "معدل النمو (%)",
        
        // Days of week
        sun: "الأحد",
        mon: "الإثنين",
        tue: "الثلاثاء",
        wed: "الأربعاء",
        thu: "الخميس",
        fri: "الجمعة",
        sat: "السبت",
        
        // New Order
        addNewOrder: "إضافة طلب جديد",
        selectCustomer: "اختر العميل",
        addProduct: "إضافة منتج",
        totalAmount: "المبلغ الإجمالي",
        quantity: "الكمية",
        removeProduct: "إزالة المنتج",
        orderSavedSuccess: "تم حفظ الطلب بنجاح",
        
        // Database Management
        database: "قاعدة البيانات",
        databaseManagement: "إدارة قاعدة البيانات",
        databaseStats: "إحصائيات قاعدة البيانات",
        dataExportImport: "تصدير واستيراد البيانات",
        exportData: "تصدير البيانات",
        importData: "استيراد البيانات",
        exportHelp: "تصدير جميع البيانات إلى ملف JSON",
        importHelp: "استيراد البيانات من ملف JSON",
        backupManagement: "إدارة النسخ الاحتياطية",
        createBackup: "إنشاء نسخة احتياطية",
        refresh: "تحديث",
        databaseActions: "إجراءات قاعدة البيانات",
        optimizeDatabase: "تحسين قاعدة البيانات",
        resetDatabase: "إعادة تعيين قاعدة البيانات",
        optimizeHelp: "تنظيف وتحسين أداء قاعدة البيانات",
        resetHelp: "حذف جميع البيانات (سيتم إنشاء نسخة احتياطية)",
        backupDate: "تاريخ النسخة",
        backupSize: "حجم النسخة",
        restore: "استرداد",
        deleteBackup: "حذف",
        noBackups: "لا توجد نسخ احتياطية",
        dataExported: "تم تصدير البيانات بنجاح",
        dataImported: "تم استيراد البيانات بنجاح",
        backupCreated: "تم إنشاء النسخة الاحتياطية",
        dataRestored: "تم استرداد البيانات",
        databaseOptimized: "تم تحسين قاعدة البيانات",
        databaseReset: "تم إعادة تعيين قاعدة البيانات",
        confirmRestore: "هل أنت متأكد من استرداد هذه النسخة الاحتياطية؟",
        confirmDeleteBackup: "هل أنت متأكد من حذف هذه النسخة الاحتياطية؟",
        backupDeleted: "تم حذف النسخة الاحتياطية",
        importError: "خطأ في استيراد البيانات",
        confirmDeleteCustomer: "هل أنت متأكد من حذف هذا العميل؟ سيتم حذف جميع طلبياته أيضاً",
        customerDeleted: "تم حذف العميل بنجاح",
        confirmDeleteOrder: "هل أنت متأكد من حذف هذه الطلبية؟",
        orderDeleted: "تم حذف الطلبية بنجاح"
    },
    
    en: {
        // Header
        appTitle: "Store Sales Management",
        totalSales: "Total Sales",
        todayOrders: "Today's Orders",
        totalProducts: "Products",
        currency: "SAR",
        
        // Navigation
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
        customers: "Customers",
        analytics: "Analytics",
        
        // Dashboard
        weekSales: "Week Sales",
        recentOrders: "Recent Orders",
        topProducts: "Top Selling Products",
        stockAlerts: "Stock Alerts",
        noStockAlerts: "No stock alerts currently",
        remainingQuantity: "Remaining quantity:",
        salesAmount: "sold",
        
        // Products
        productManagement: "Product Management",
        addNewProduct: "Add New Product",
        editProduct: "Edit Product",
        productName: "Product Name",
        price: "Price",
        availableQuantity: "Available Quantity",
        category: "Category",
        description: "Description",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        
        // Categories
        selectCategory: "Select Category",
        electronics: "Electronics",
        clothing: "Clothing",
        books: "Books",
        home: "Home & Garden",
        sports: "Sports",
        beauty: "Beauty & Care",
        
        // Orders
        orderManagement: "Order Management",
        allOrders: "All Orders",
        orderNumber: "Order Number",
        customer: "Customer",
        productsCol: "Products",
        amount: "Amount",
        status: "Status",
        date: "Date",
        actions: "Actions",
        orderDate: "Order Date",
        
        // Order Status
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
        
        // Customers
        customerManagement: "Customer Management",
        addNewCustomer: "Add New Customer",
        editCustomer: "Edit Customer",
        customerName: "Customer Name",
        email: "Email",
        phone: "Phone Number",
        address: "Address",
        ordersCount: "orders",
        
        // Analytics
        analyticsReports: "Analytics & Reports",
        periodSales: "Period Sales",
        productSalesDistribution: "Product Sales Distribution",
        monthlyGrowth: "Monthly Sales Growth",
        customerPerformance: "Customer Performance",
        generateReport: "Generate Report",
        selectStartDate: "Please select start and end dates",
        
        // Messages
        productSavedSuccess: "Product saved successfully",
        productDeletedSuccess: "Product deleted successfully",
        customerSavedSuccess: "Customer saved successfully",
        customerDeletedSuccess: "Customer deleted successfully",
        orderStatusUpdated: "Order status updated successfully",
        confirmDeleteProduct: "Are you sure you want to delete this product?",
        confirmDeleteCustomer: "Are you sure you want to delete this customer?",
        
        // Report
        reportPeriod: "Report for period from",
        to: "to",
        totalSalesReport: "Total Sales:",
        totalOrdersReport: "Total Orders:",
        avgOrderValue: "Average Order Value:",
        
        // Chart Labels
        salesChart: "Sales (SAR)",
        monthlySales: "Monthly Sales (SAR)",
        growthRate: "Growth Rate (%)",
        
        // Days of week
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        
        // New Order
        addNewOrder: "Add New Order",
        selectCustomer: "Select Customer",
        addProduct: "Add Product",
        totalAmount: "Total Amount",
        quantity: "Quantity",
        removeProduct: "Remove Product",
        orderSavedSuccess: "Order saved successfully",
        
        // Database Management
        database: "Database",
        databaseManagement: "Database Management",
        databaseStats: "Database Statistics",
        dataExportImport: "Data Export/Import",
        exportData: "Export Data",
        importData: "Import Data",
        exportHelp: "Export all data to JSON file",
        importHelp: "Import data from JSON file",
        backupManagement: "Backup Management",
        createBackup: "Create Backup",
        refresh: "Refresh",
        databaseActions: "Database Actions",
        optimizeDatabase: "Optimize Database",
        resetDatabase: "Reset Database",
        optimizeHelp: "Clean and optimize database performance",
        resetHelp: "Delete all data (backup will be created)",
        backupDate: "Backup Date",
        backupSize: "Backup Size",
        restore: "Restore",
        deleteBackup: "Delete",
        noBackups: "No backups available",
        dataExported: "Data exported successfully",
        dataImported: "Data imported successfully",
        backupCreated: "Backup created successfully",
        dataRestored: "Data restored successfully",
        databaseOptimized: "Database optimized successfully",
        databaseReset: "Database reset successfully",
        confirmRestore: "Are you sure you want to restore this backup?",
        confirmDeleteBackup: "Are you sure you want to delete this backup?",
        backupDeleted: "Backup deleted successfully",
        importError: "Error importing data",
        confirmDeleteCustomer: "Are you sure you want to delete this customer? All their orders will also be deleted",
        customerDeleted: "Customer deleted successfully",
        confirmDeleteOrder: "Are you sure you want to delete this order?",
        orderDeleted: "Order deleted successfully"
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ar';
        this.translations = translations;
    }
    
    // Get translation for a key
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Set language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            this.updatePageLanguage();
            return true;
        }
        return false;
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Update page language and direction
    updatePageLanguage() {
        const html = document.documentElement;
        const body = document.body;
        
        // Update HTML attributes
        html.setAttribute('lang', this.currentLanguage);
        html.setAttribute('dir', this.currentLanguage === 'ar' ? 'rtl' : 'ltr');
        
        // Update body class for styling
        body.className = body.className.replace(/\b(lang-ar|lang-en)\b/g, '');
        body.classList.add(`lang-${this.currentLanguage}`);
        
        // Update all translatable elements
        this.updateTranslatableElements();
        
        // Trigger custom event for other components to listen
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }
    
    // Update all elements with data-translate attribute
    updateTranslatableElements() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'tel')) {
                element.placeholder = translation;
            } else if (element.tagName === 'INPUT' && element.type === 'date') {
                element.placeholder = translation;
            } else if (element.tagName === 'SELECT') {
                // Handle select options separately
                const firstOption = element.querySelector('option[value=""]');
                if (firstOption) {
                    firstOption.textContent = translation;
                }
            } else {
                element.textContent = translation;
            }
        });
    }
    
    // Initialize language system
    init() {
        this.updatePageLanguage();
        this.createLanguageToggle();
    }
    
    // Create language toggle buttons
    createLanguageToggle() {
        // إضافة event listeners للأزرار الموجودة في HTML
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang') || e.target.parentElement.getAttribute('data-lang');
                if (lang) {
                    this.switchLanguage(lang);
                }
            });
        });
        
        // تحديث حالة الأزرار
        this.updateButtonStates();
    }
    
    // تحديث حالة الأزرار
    updateButtonStates() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-lang="${this.currentLanguage}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    
    // Switch language
    switchLanguage(lang) {
        if (this.setLanguage(lang)) {
            // Update button states
            this.updateButtonStates();
            
            // Refresh the current view
            if (window.salesManager) {
                const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
                window.salesManager.switchTab(activeTab);
                window.salesManager.updateStats();
            }
        }
    }
}

// Export for use in other files
window.LanguageManager = LanguageManager;
window.translations = translations;
