// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initializeHeader();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeProjectsCarousel();
    initializeNewsCarousel();
    initializeScrollAnimations();
    initializePerformanceOptimizations();
}

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Projects Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.project-slide');
const indicators = document.querySelectorAll('.indicator');

function initializeProjectsCarousel() {
    if (slides.length === 0) return;
    
    // Auto-slide carousel
    setInterval(nextSlide, 5000);
}

function showSlide(index) {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    currentSlideIndex = index;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    if (slides.length === 0) return;
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    if (slides.length === 0) return;
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// News Carousel functionality
let currentNewsSlideIndex = 0;
const newsSlides = document.querySelectorAll('.news-slide');
const newsIndicators = document.querySelectorAll('.news-indicator');

function initializeNewsCarousel() {
    if (newsSlides.length === 0) return;
    
    // Auto-slide news carousel
    setInterval(nextNewsSlide, 6000);
}

function showNewsSlide(index) {
    const newsCarousel = document.getElementById('newsCarousel');
    if (!newsCarousel) return;
    
    currentNewsSlideIndex = index;
    newsCarousel.style.transform = `translateX(-${index * 100}%)`;
    
    newsIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextNewsSlide() {
    if (newsSlides.length === 0) return;
    const nextIndex = (currentNewsSlideIndex + 1) % newsSlides.length;
    showNewsSlide(nextIndex);
}

function previousNewsSlide() {
    if (newsSlides.length === 0) return;
    const prevIndex = (currentNewsSlideIndex - 1 + newsSlides.length) % newsSlides.length;
    showNewsSlide(prevIndex);
}

function currentNewsSlide(index) {
    showNewsSlide(index - 1);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load images when implemented
    lazyLoadImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Add error handling for missing elements
    addErrorHandling();
}

function lazyLoadImages() {
    // Implementation for lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function preloadCriticalResources() {
    // Preload hero image or critical assets
    const criticalAssets = [
        // Add URLs of critical assets here
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

function addErrorHandling() {
    // Add global error handling
    window.addEventListener('error', function(e) {
        console.warn('JavaScript error occurred:', e.error);
        // Could send to analytics or error reporting service
    });
    
    // Handle missing carousel elements gracefully
    if (!document.getElementById('carousel')) {
        console.warn('Projects carousel element not found');
    }
    
    if (!document.getElementById('newsCarousel')) {
        console.warn('News carousel element not found');
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
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
    }
}

// Analytics and tracking (optional)
function trackEvent(eventName, properties = {}) {
    // Implementation for analytics tracking
    // Could integrate with Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Handle carousel navigation with arrow keys
        if (e.target.classList.contains('carousel-btn') || 
            e.target.classList.contains('news-btn')) {
            if (e.key === 'ArrowLeft') {
                if (e.target.classList.contains('carousel-btn')) {
                    previousSlide();
                } else {
                    previousNewsSlide();
                }
            } else if (e.key === 'ArrowRight') {
                if (e.target.classList.contains('carousel-btn')) {
                    nextSlide();
                } else {
                    nextNewsSlide();
                }
            }
        }
    });
    
    // Add focus management
    const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const index = focusable.indexOf(document.activeElement);
            
            if (e.shiftKey) {
                const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
                focusable[prevIndex]?.focus();
            } else {
                const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
                focusable[nextIndex]?.focus();
            }
        }
    });
}

// Initialize accessibility when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Export functions for global access (if needed)
window.DavicenneAnalytics = {
    nextSlide,
    previousSlide,
    currentSlide,
    nextNewsSlide,
    previousNewsSlide,
    currentNewsSlide,
    trackEvent
};