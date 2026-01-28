// InfoLogix Website Main JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize all components
    initThemeSwitch();
    initLanguageSwitch();
    initContactForm();
    initScrollEffects();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }

function getContactFormStrings(lang) {
    if (lang === 'en') {
        return {
            lang,
            recipient: 'info@infologix.co',
            loadingText: '<span class="spinner-border spinner-border-sm me-2"></span> Sending...',
            successMessage: 'Your email application has been opened. Please review and send to complete the request.',
            defaultSubject: 'New inquiry from InfoLogix website',
            locale: 'en-US',
            labels: {
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                company: 'Company',
                service: 'Service',
                budget: 'Budget',
                subject: 'Subject',
                message: 'Message',
                newsletter: 'Subscribed to newsletter',
                privacy: 'Accepted privacy policy',
                timestamp: 'Submitted at'
            },
            bool: {
                yes: 'Yes',
                no: 'No'
            },
            errors: {
                name: 'Please enter a valid full name (3+ characters).',
                email: 'Please enter a valid email address.',
                subject: 'Subject must be at least 3 characters long.',
                message: 'Message should contain at least 10 characters.',
                privacy: 'You must accept the privacy policy to continue.'
            }
        };
    }

    return {
        lang: 'ar',
        recipient: 'info@infologix.co',
        loadingText: '<span class="loading"></span> جاري الإرسال...',
        successMessage: 'تم فتح برنامج البريد لديك. يرجى إرسال الرسالة لإكمال الطلب.',
        defaultSubject: 'رسالة جديدة من موقع إنفولوجيكس',
        locale: 'ar-SA',
        labels: {
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            company: 'الشركة',
            service: 'الخدمة المطلوبة',
            budget: 'الميزانية',
            subject: 'الموضوع',
            message: 'الرسالة',
            newsletter: 'مشترك في النشرة البريدية',
            privacy: 'وافق على سياسة الخصوصية',
            timestamp: 'وقت الإرسال'
        },
        bool: {
            yes: 'نعم',
            no: 'لا'
        },
        errors: {
            name: 'الرجاء إدخال اسم كامل صحيح (3 أحرف على الأقل).',
            email: 'الرجاء إدخال بريد إلكتروني صحيح.',
            subject: 'الموضوع يجب أن يحتوي على 3 أحرف على الأقل.',
            message: 'الرسالة يجب أن تحتوي على 10 أحرف على الأقل.',
            privacy: 'يجب الموافقة على سياسة الخصوصية وسياسة الاستخدام.'
        }
    };
}

function buildEmailBody(data, strings) {
    const { labels, bool, locale } = strings;
    const yesNo = value => (value ? bool.yes : bool.no);

    const details = [
        `${labels.name}: ${data.name || '-'}`,
        `${labels.email}: ${data.email || '-'}`,
        `${labels.phone || 'Phone'}: ${data.phone || '-'}`,
        `${labels.company}: ${data.company || '-'}`,
        `${labels.service}: ${data.service || '-'}`,
        `${labels.budget}: ${data.budget || '-'}`,
        `${labels.newsletter}: ${yesNo(data.newsletter)}`,
        `${labels.privacy}: ${yesNo(!data.requiresPrivacy || data.privacyAccepted)}`
    ];

    if (data.subject) {
        details.push(`${labels.subject}: ${data.subject}`);
    }

    if (data.message) {
        details.push(`\n${labels.message}:\n${data.message}`);
    }

    const timestamp = new Date().toLocaleString(strings.lang === 'en' ? 'en-US' : locale, {
        dateStyle: 'full',
        timeStyle: 'short'
    });
    details.push(`\n${labels.timestamp}: ${timestamp}`);

    return details.join('\n');
}
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForms = document.querySelectorAll('form[data-contact-form]');
    if (!contactForms.length) {
        return;
    }

    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const lang = (form.getAttribute('data-lang') || document.documentElement.lang || 'ar').toLowerCase();
            const strings = getContactFormStrings(lang.startsWith('en') ? 'en' : 'ar');

            const formData = new FormData(form);
            const formObject = {};

            formData.forEach((value, key) => {
                formObject[key] = typeof value === 'string' ? value.trim() : value;
            });

            const newsletterInput = form.querySelector('input[name="newsletter"]');
            if (newsletterInput) {
                formObject.newsletter = newsletterInput.checked;
            }

            const privacyInput = form.querySelector('input[name="privacy"]');
            formObject.privacyAccepted = privacyInput ? privacyInput.checked : true;
            formObject.requiresPrivacy = !!(privacyInput && privacyInput.required);

            const errors = validateContactForm(formObject, strings);
            if (errors.length) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton ? submitButton.innerHTML : '';

            if (submitButton) {
                submitButton.innerHTML = strings.loadingText;
                submitButton.disabled = true;
            }

            const subject = formObject.subject && formObject.subject.length >= 3
                ? formObject.subject
                : strings.defaultSubject;
            const emailBody = buildEmailBody(formObject, strings);
            const mailtoLink = `mailto:${strings.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            window.location.href = mailtoLink;

            setTimeout(() => {
                showNotification(strings.successMessage, 'success');
                form.reset();

                if (submitButton) {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            }, 600);
        });
    });
}

// Form validation
function validateContactForm(data, strings) {
    const errors = [];

    if (!data.name || data.name.length < 3) {
        errors.push(strings.errors.name);
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push(strings.errors.email);
    }

    if (data.subject !== undefined && data.subject.length > 0 && data.subject.length < 3) {
        errors.push(strings.errors.subject);
    }

    if (!data.message || data.message.length < 10) {
        errors.push(strings.errors.message);
    }

    if (data.requiresPrivacy && !data.privacyAccepted) {
        errors.push(strings.errors.privacy);
    }

    return errors;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : 'success'}`;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
            <div>${message}</div>
            <button type="button" class="btn-close me-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(30, 64, 175, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Scroll to top button
    createScrollTopButton();
}

// Create scroll to top button
function createScrollTopButton() {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopButton.setAttribute('aria-label', 'العودة للأعلى');
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme switch functionality
function initThemeSwitch() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Language switch functionality
function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const lang = this.getAttribute('data-lang');
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Redirect to the correct language version
            window.location.href = href;
        });
    });
}

// Switch language function
function switchLanguage(lang) {
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Show loading notification
    showNotification('جاري تغيير اللغة...', 'success');
    
    // In a real implementation, this would load different content
    // For now, we'll just simulate the language change
    setTimeout(() => {
        if (lang === 'en') {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            showNotification('Language changed to English', 'success');
        } else {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            showNotification('تم تغيير اللغة إلى العربية', 'success');
        }
    }, 500);
}

// Initialize animations
function initAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .navbar-nav .nav-link.active {
            color: #fbbf24 !important;
        }
        
        .navbar-nav .nav-link.active::after {
            width: 80%;
        }
    `;
    document.head.appendChild(style);
    
    // Animate elements on page load
    const animateOnLoad = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    // Run animations after a short delay
    setTimeout(animateOnLoad, 100);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log performance metrics
        if (performance.getEntriesByType) {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Navigation timing:', {
                dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcp: navigation.connectEnd - navigation.connectStart,
                request: navigation.responseStart - navigation.requestStart,
                response: navigation.responseEnd - navigation.responseStart,
                dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
            });
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment and create service worker file when ready for PWA
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
        */
    });
}

// Export functions for external use
window.InfoLogix = {
    switchLanguage,
    showNotification,
    validateContactForm,
    debounce,
    throttle
};

// Counter Animation Function
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Use Intersection Observer to trigger animation when visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCounters();
});
