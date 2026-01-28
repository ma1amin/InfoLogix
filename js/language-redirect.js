// Language Detection and Redirect Script
(function() {
    'use strict';
    
    // Check if we should redirect based on language preference
    function checkLanguageRedirect() {
        // Get current path
        const currentPath = window.location.pathname;
        const currentHost = window.location.host;
        
        // Don't redirect if already in a language-specific folder
        if (currentPath.includes('/ar/') || currentPath.includes('/en/')) {
            return;
        }
        
        // Check if user has a saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        // Check browser language
        const browserLanguage = navigator.language || navigator.userLanguage;
        const isArabicBrowser = browserLanguage.startsWith('ar');
        
        // Determine target language
        let targetLanguage = 'ar'; // Default to Arabic
        
        if (savedLanguage) {
            targetLanguage = savedLanguage;
        } else if (!isArabicBrowser) {
            targetLanguage = 'en';
        }
        
        // Only redirect if not already on the correct language
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
        
        if (targetLanguage === 'en') {
            // Redirect to English version
            const englishUrl = baseUrl + 'en/index.html';
            window.location.href = englishUrl;
        } else {
            // Redirect to Arabic version
            const arabicUrl = baseUrl + 'ar/index.html';
            window.location.href = arabicUrl;
        }
    }
    
    // Initialize immediately
    checkLanguageRedirect();
    
})();
