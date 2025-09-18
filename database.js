// Database Management System for Sales Management Application
// إدارة قاعدة البيانات لتطبيق إدارة المبيعات

class DatabaseManager {
    constructor() {
        this.dbName = 'SalesManagementDB';
        this.version = 1.0;
        this.backupKey = 'salesBackup';
        this.init();
    }

    init() {
        this.createBackupSystem();
        this.setupAutoBackup();
    }

    // إنشاء نظام النسخ الاحتياطي
    createBackupSystem() {
        const backupData = localStorage.getItem(this.backupKey);
        if (!backupData) {
            this.createInitialBackup();
        }
    }

    // إنشاء نسخة احتياطية أولية
    createInitialBackup() {
        const initialData = {
            version: this.version,
            timestamp: new Date().toISOString(),
            data: {
                products: [],
                orders: [],
                customers: [],
                settings: {
                    language: 'ar',
                    currency: 'SAR',
                    theme: 'default'
                }
            }
        };
        localStorage.setItem(this.backupKey, JSON.stringify(initialData));
    }

    // حفظ البيانات مع النسخ الاحتياطي
    saveData(dataType, data) {
        try {
            // حفظ البيانات الحالية
            localStorage.setItem(dataType, JSON.stringify(data));
            
            // تحديث النسخة الاحتياطية
            this.updateBackup(dataType, data);
            
            // إنشاء نسخة احتياطية بالتاريخ
            this.createTimestampedBackup();
            
            return { success: true, message: 'تم حفظ البيانات بنجاح' };
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
            return { success: false, message: 'فشل في حفظ البيانات', error };
        }
    }

    // تحديث النسخة الاحتياطية
    updateBackup(dataType, data) {
        const backup = JSON.parse(localStorage.getItem(this.backupKey) || '{}');
        backup.data = backup.data || {};
        backup.data[dataType] = data;
        backup.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.backupKey, JSON.stringify(backup));
    }

    // إنشاء نسخة احتياطية بالتاريخ
    createTimestampedBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupKey = `backup_${timestamp}`;
        
        const allData = {
            products: JSON.parse(localStorage.getItem('products') || '[]'),
            orders: JSON.parse(localStorage.getItem('orders') || '[]'),
            customers: JSON.parse(localStorage.getItem('customers') || '[]'),
            timestamp: new Date().toISOString(),
            version: this.version
        };

        localStorage.setItem(backupKey, JSON.stringify(allData));
        
        // الاحتفاظ بآخر 10 نسخ احتياطية فقط
        this.cleanOldBackups();
    }

    // تنظيف النسخ الاحتياطية القديمة
    cleanOldBackups() {
        const keys = Object.keys(localStorage);
        const backupKeys = keys.filter(key => key.startsWith('backup_'))
                              .sort()
                              .reverse();
        
        // حذف النسخ الاحتياطية الزائدة عن 10
        if (backupKeys.length > 10) {
            const keysToDelete = backupKeys.slice(10);
            keysToDelete.forEach(key => localStorage.removeItem(key));
        }
    }

    // استرداد البيانات
    loadData(dataType) {
        try {
            const data = localStorage.getItem(dataType);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`خطأ في تحميل ${dataType}:`, error);
            return this.loadFromBackup(dataType);
        }
    }

    // استرداد من النسخة الاحتياطية
    loadFromBackup(dataType) {
        try {
            const backup = JSON.parse(localStorage.getItem(this.backupKey) || '{}');
            return backup.data && backup.data[dataType] ? backup.data[dataType] : [];
        } catch (error) {
            console.error('خطأ في استرداد النسخة الاحتياطية:', error);
            return [];
        }
    }

    // تصدير البيانات إلى ملف JSON
    exportData() {
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                version: this.version,
                appName: 'Sales Management System'
            },
            data: {
                products: this.loadData('products'),
                orders: this.loadData('orders'),
                customers: this.loadData('customers'),
                settings: {
                    language: localStorage.getItem('selectedLanguage') || 'ar'
                }
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `sales_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        return { success: true, message: 'تم تصدير البيانات بنجاح' };
    }

    // استيراد البيانات من ملف JSON
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    // التحقق من صحة البيانات
                    if (!this.validateImportData(importedData)) {
                        reject({ success: false, message: 'البيانات المستوردة غير صحيحة' });
                        return;
                    }

                    // إنشاء نسخة احتياطية قبل الاستيراد
                    this.createTimestampedBackup();
                    
                    // استيراد البيانات
                    const data = importedData.data;
                    this.saveData('products', data.products || []);
                    this.saveData('orders', data.orders || []);
                    this.saveData('customers', data.customers || []);
                    
                    // استيراد الإعدادات
                    if (data.settings && data.settings.language) {
                        localStorage.setItem('selectedLanguage', data.settings.language);
                    }
                    
                    resolve({ success: true, message: 'تم استيراد البيانات بنجاح' });
                } catch (error) {
                    reject({ success: false, message: 'خطأ في قراءة الملف', error });
                }
            };
            
            reader.onerror = () => {
                reject({ success: false, message: 'خطأ في قراءة الملف' });
            };
            
            reader.readAsText(file);
        });
    }

    // التحقق من صحة البيانات المستوردة
    validateImportData(data) {
        return data && 
               data.data && 
               typeof data.data === 'object' &&
               Array.isArray(data.data.products || []) &&
               Array.isArray(data.data.orders || []) &&
               Array.isArray(data.data.customers || []);
    }

    // الحصول على قائمة النسخ الاحتياطية
    getBackupList() {
        const keys = Object.keys(localStorage);
        const backupKeys = keys.filter(key => key.startsWith('backup_'));
        
        return backupKeys.map(key => {
            try {
                const backup = JSON.parse(localStorage.getItem(key));
                return {
                    key,
                    timestamp: backup.timestamp,
                    date: new Date(backup.timestamp).toLocaleString('ar-SA'),
                    size: JSON.stringify(backup).length
                };
            } catch {
                return null;
            }
        }).filter(backup => backup !== null)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // استرداد من نسخة احتياطية محددة
    restoreFromBackup(backupKey) {
        try {
            const backup = JSON.parse(localStorage.getItem(backupKey));
            
            if (!backup || !backup.products) {
                return { success: false, message: 'النسخة الاحتياطية غير صحيحة' };
            }

            // إنشاء نسخة احتياطية من البيانات الحالية قبل الاسترداد
            this.createTimestampedBackup();
            
            // استرداد البيانات
            this.saveData('products', backup.products || []);
            this.saveData('orders', backup.orders || []);
            this.saveData('customers', backup.customers || []);
            
            return { success: true, message: 'تم استرداد البيانات بنجاح' };
        } catch (error) {
            return { success: false, message: 'خطأ في استرداد البيانات', error };
        }
    }

    // إعداد النسخ الاحتياطي التلقائي
    setupAutoBackup() {
        // إنشاء نسخة احتياطية كل 30 دقيقة
        setInterval(() => {
            this.createTimestampedBackup();
        }, 30 * 60 * 1000);
    }

    // حذف جميع البيانات (إعادة تعيين)
    resetAllData() {
        if (confirm('هل أنت متأكد من حذف جميع البيانات؟ سيتم إنشاء نسخة احتياطية أولاً.')) {
            // إنشاء نسخة احتياطية قبل الحذف
            this.createTimestampedBackup();
            
            // حذف البيانات الرئيسية
            localStorage.removeItem('products');
            localStorage.removeItem('orders');
            localStorage.removeItem('customers');
            
            // إعادة إنشاء البيانات الأولية
            this.createInitialBackup();
            
            return { success: true, message: 'تم حذف جميع البيانات وإنشاء نسخة احتياطية' };
        }
        return { success: false, message: 'تم إلغاء العملية' };
    }

    // الحصول على إحصائيات قاعدة البيانات
    getDatabaseStats() {
        const products = this.loadData('products');
        const orders = this.loadData('orders');
        const customers = this.loadData('customers');
        const backups = this.getBackupList();
        
        const totalSize = JSON.stringify({products, orders, customers}).length;
        
        return {
            products: products.length,
            orders: orders.length,
            customers: customers.length,
            backups: backups.length,
            totalSize: (totalSize / 1024).toFixed(2) + ' KB',
            lastBackup: backups.length > 0 ? backups[0].date : 'لا توجد نسخ احتياطية'
        };
    }
}

// إنشاء مثيل عام لمدير قاعدة البيانات
const dbManager = new DatabaseManager();

// تصدير المدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseManager;
}
