# 🚀 دليل النشر - إنفولوجيكس Website

**التاريخ:** 24 يناير 2026  
**الإصدار:** 1.0  
**الحالة:** ✅ جاهز للنشر

---

## 📋 نظرة عامة

دليل شامل لنشر موقع إنفولوجيكس على مختلف المنصات والاستضافات.

---

## 🔄 المتطلبات الأساسية قبل النشر

### ✅ قائمة التحقق قبل النشر

#### 1. المحتوى
- [ ] جميع النصوص تم مراجعتها وتدقيقها
- [ ] معلومات التواصل صحيحة
- [ ] الروابط الخارجية تعمل
- [ ] الصور المطلوبة مضافة

#### 2. التقني
- [ ] جميع الروابط الداخلية تعمل
- [ ] نماذج الاتصال جاهزة للربط
- [ ] خريطة جوجل ماب محدثة
- [ ] SEO محسن

#### 3. التصميم
- [ ] الموقع يعمل على جميع الأجهزة
- [ ] الرسوم المتحركة تعمل بشكل سلس
- [ ] الألوان والخطوط صحيحة
- [ ] الترجمة العربية صحيحة

---

## 🌐 خيارات النشر

### 1. استضافة مشتركة (Shared Hosting)

#### 📝 الخطوات
```bash
# 1. تحضير الملفات للنشر
zip -r infologix.zip .

# 2. رفع الملفات إلى الاستضافة
# عبر FTP أو لوحة تحكم الاستضافة

# 3. فك الضغط في المجلد الرئيسي
# عادةً يكون /public_html/ أو /www/

# 4. تعديل صلاحيات الملفات
chmod 755 index.html
chmod 644 css/style.css
chmod 644 js/main.js
```

#### ✅ المزايا
- سهولة الإعداد
- تكلفة منخفضة
- دعم فني

#### ⚠️ العيوب
- أداء محدود
- تحكم أقل في الخادم

---

### 2. GitHub Pages (مجاني)

#### 📝 الخطوات
```bash
# 1. تهيئة المستودع
git init
git add .
git commit -m "Initial commit - InfoLogix Website v1.0"

# 2. إنشاء مستودع جديد على GitHub
# اسم المستودع: username.github.io

# 3. ربط المستودع المحلي بالبعيد
git remote add origin https://github.com/username/username.github.io.git
git branch -M main
git push -u origin main

# 4. تفعيل GitHub Pages
# Settings > Pages > Source: Deploy from branch > main
```

#### ✅ المزايا
- مجاني تماماً
- HTTPS تلقائي
- نشر تلقائي
- CDN مدمج

#### ⚠️ العيوب
- لا يدعم الخادم الخلفي
- محدود للمواقع الثابتة

---

### 3. Netlify (مجاني)

#### 📝 الخطوات
1. **رفع الملفات إلى GitHub**
2. **إنشاء حساب Netlify**
3. **ربط المستودع**
4. **إعدادات النشر:**
   - Build command: فارغ
   - Publish directory: ./
   - Branch: main

#### ✅ المزايا
- مجاني للمواقع الصغيرة
- نشر تلقائي
- HTTPS تلقائي
- CDN سريع
- نطاقات فرعية مجانية

---

### 4. Vercel (مجاني)

#### 📝 الخطوات
1. **رفع الملفات إلى GitHub**
2. **إنشاء حساب Vercel**
3. **استيراد المشروع**
4. **إعدادات النشر:**
   - Framework: Other
   - Build Command: فارغ
   - Output Directory: ./

#### ✅ المزايا
- أداء ممتاز
- نشر تلقائي
- تحسينات تلقائية
- دعم Next.js (للمستقبل)

---

### 5. استضافة خاصة (VPS/Dedicated)

#### 📝 الخطوات
```bash
# 1. إعداد الخادم
sudo apt update
sudo apt install nginx

# 2. تكوين Nginx
sudo nano /etc/nginx/sites-available/infologix

# 3. إنشاء ملف التكوين
server {
    listen 80;
    server_name www.infologix.co infologix.co;
    root /var/www/infologix;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # CSS and JS
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Images
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public";
    }
}

# 4. تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/infologix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### ✅ المزايا
- تحكم كامل
- أداء ممتاز
- إمكانيات غير محدودة

#### ⚠️ العيوب
- يتطلب خبرة تقنية
- تكلفة أعلى
- صيانة يدوية

---

## 🔧 الإعدادات المتقدمة

### 📊 إضافة Google Analytics

#### 📝 الخطوات
1. **إنشاء حساب Google Analytics**
2. **الحصول على كود التتبع**
3. **إضافة الكود إلى جميع الصفحات:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 📱 إضافة Facebook Pixel

#### 📝 الخطوات
1. **إنشاء حساب Facebook Business**
2. **إنشاء Pixel**
3. **إضافة الكود إلى جميع الصفحات:**
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

### 🔒 إعداد SSL Certificate

#### 📝 الخطوات (Let's Encrypt)
```bash
# 1. تثبيت Certbot
sudo apt install certbot python3-certbot-nginx

# 2. الحصول على الشهادة
sudo certbot --nginx -d www.infologix.co -d infologix.co

# 3. تجديد تلقائي
sudo crontab -e
# أضف السطر التالي:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📱 اختبار ما بعد النشر

### 🔍 قائمة التحقق

#### 1. الوظيفية
- [ ] الموقع يعمل على جميع الأجهزة
- [ ] جميع الروابط تعمل
- [ ] نماذج الاتصال تعمل
- [ ] الخريطة تعرض بشكل صحيح

#### 2. الأداء
- [ ] سرعة التحميل جيدة
- [ ] تقدير PageSpeed > 90
- [ ] لا أخطاء في الكونسول

#### 3. SEO
- [ ] عنوان الصفحة صحيح
- [ ] meta description موجود
- [ ] هيكل headings صحيح
- [ ] صور alt text موجودة

#### 4. الأمان
- [ ] HTTPS يعمل
- [ ] لا أخطاء SSL
- [ ] رأس الأمان صحيح

---

## 🚨 استكشاف الأخطاء الشائعة

### ❌ مشاكل شائعة وحلولها

#### 1. الصور لا تظهر
```bash
# تحقق من وجود الصور
ls -la images/

# تحقق من صلاحيات الملفات
chmod 644 images/*
```

#### 2. CSS لا يعمل
```html
<!-- تحقق من مسار CSS -->
<link href="css/style.css" rel="stylesheet">
```

#### 3. JavaScript لا يعمل
```html
<!-- تحقق من مسار JavaScript -->
<script src="js/main.js"></script>
```

#### 4. خطأ 404
```bash
# تحقق من وجود ملف index.html
ls -la index.html

# تحقق من إعدادات الخادم
```

---

## 📈 المراقبة والصيانة

### 📊 أدوات المراقبة
- **Google Analytics** - زيارات وسلوك المستخدمين
- **Google Search Console** - أداء البحث
- **Uptime Robot** - توفر الموقع
- **GTmetrix** - أداء وسرعة

### 🔧 الصيانة الدورية
- تحديث المحتوى شهرياً
- نسخ احتياطي أسبوعي
- مراجعة الأداء شهرياً
- تحديث التقنيات ربع سنوياً

---

## 📞 الدعم الفني

### 🆘 المشاكل الشائعة
- مشاكل في النشر
- استفسارات تقنية
- تحسينات الأداء
- تحديثات المحتوى

### 📞 معلومات التواصل
- **البريد:** support@infologix.co
- **الهاتف:** +966 58 177 3494
- **الموقع:** www.infologix.co

---

## 📜 الترخيص

هذا الدليل ملك لشركة InfoLogix. جميع الحقوق محفوظة © 2026.

---

**آخر تحديث:** 24 يناير 2026  
**الإصدار:** 1.0
