// File Manager for Sales Management System
// مدير الملفات لنظام إدارة المبيعات

class FileManager {
    constructor() {
        this.dataFileName = 'sales-data.json';
        this.autoSaveInterval = 5 * 60 * 1000; // حفظ كل 5 دقائق
        this.lastSaveTime = 0;
        this.setupAutoSave();
    }

    // تصدير جميع البيانات إلى ملف JSON
    exportDataToFile(products, orders, customers) {
        const data = {
            products: products || [],
            orders: orders || [],
            customers: customers || [],
            exportDate: new Date().toISOString(),
            version: "1.0"
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = this.dataFileName;
        
        // إضافة الرابط للصفحة وتفعيله ثم حذفه
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    }

    // استيراد البيانات من ملف JSON
    importDataFromFile() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (!file) {
                    reject(new Error('لم يتم اختيار ملف'));
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        
                        // التحقق من صحة البيانات
                        if (this.validateImportedData(data)) {
                            resolve(data);
                        } else {
                            reject(new Error('ملف البيانات غير صحيح'));
                        }
                    } catch (error) {
                        reject(new Error('خطأ في قراءة الملف: ' + error.message));
                    }
                };
                
                reader.onerror = () => {
                    reject(new Error('خطأ في قراءة الملف'));
                };
                
                reader.readAsText(file);
            };
            
            input.click();
        });
    }

    // التحقق من صحة البيانات المستوردة
    validateImportedData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // التحقق من وجود الحقول الأساسية
        const requiredFields = ['products', 'orders', 'customers'];
        for (const field of requiredFields) {
            if (!Array.isArray(data[field])) {
                return false;
            }
        }

        return true;
    }

    // إعداد الحفظ التلقائي
    setupAutoSave() {
        // حفظ تلقائي كل 5 دقائق
        setInterval(() => {
            if (window.salesManager && this.shouldAutoSave()) {
                this.autoSaveData();
            }
        }, this.autoSaveInterval);

        // حفظ عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            if (window.salesManager) {
                this.saveDataToStorage(
                    window.salesManager.products,
                    window.salesManager.orders,
                    window.salesManager.customers
                );
            }
        });
    }

    // تحديد ما إذا كان يجب الحفظ التلقائي
    shouldAutoSave() {
        const now = Date.now();
        return (now - this.lastSaveTime) >= this.autoSaveInterval;
    }

    // حفظ تلقائي للبيانات
    autoSaveData() {
        if (window.salesManager) {
            this.saveDataToStorage(
                window.salesManager.products,
                window.salesManager.orders,
                window.salesManager.customers
            );
            this.lastSaveTime = Date.now();
            console.log('تم الحفظ التلقائي:', new Date().toLocaleString('ar-SA'));
        }
    }

    // حفظ البيانات في localStorage مع نسخة JSON
    saveDataToStorage(products, orders, customers) {
        const data = {
            products: products || [],
            orders: orders || [],
            customers: customers || [],
            lastSaved: new Date().toISOString(),
            version: "1.0"
        };

        // حفظ في localStorage
        localStorage.setItem('products', JSON.stringify(data.products));
        localStorage.setItem('orders', JSON.stringify(data.orders));
        localStorage.setItem('customers', JSON.stringify(data.customers));
        
        // حفظ نسخة كاملة في localStorage
        localStorage.setItem('salesData', JSON.stringify(data));
        
        return data;
    }

    // تحميل البيانات من localStorage
    loadDataFromStorage() {
        try {
            // محاولة تحميل البيانات الكاملة أولاً
            const savedData = localStorage.getItem('salesData');
            if (savedData) {
                const data = JSON.parse(savedData);
                if (this.validateImportedData(data)) {
                    return data;
                }
            }

            // إذا فشل، حمّل البيانات المنفصلة
            return {
                products: JSON.parse(localStorage.getItem('products')) || [],
                orders: JSON.parse(localStorage.getItem('orders')) || [],
                customers: JSON.parse(localStorage.getItem('customers')) || [],
                lastSaved: new Date().toISOString(),
                version: "1.0"
            };
        } catch (error) {
            console.error('خطأ في تحميل البيانات:', error);
            return {
                products: [],
                orders: [],
                customers: [],
                lastSaved: new Date().toISOString(),
                version: "1.0"
            };
        }
    }

    // إنشاء نسخة احتياطية بالتاريخ والوقت
    createBackup(products, orders, customers) {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const backupFileName = `sales-backup-${timestamp}.json`;
        
        const data = {
            products: products || [],
            orders: orders || [],
            customers: customers || [],
            backupDate: now.toISOString(),
            version: "1.0"
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = backupFileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return backupFileName;
    }
}

// إنشاء مثيل عام من FileManager
const fileManager = new FileManager();
window.fileManager = fileManager;
