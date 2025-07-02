// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const serviceButtons = document.querySelectorAll('.service-btn');
const pricingButtons = document.querySelectorAll('.pricing-btn');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Service Selection - Populate Contact Form
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.getAttribute('data-service');
        const serviceSelect = document.getElementById('service');
        const messageTextarea = document.getElementById('message');
        
        // Set the service in the dropdown
        serviceSelect.value = serviceName;
        
        // Pre-fill message with service request
        messageTextarea.value = `Hi, I'm interested in your ${serviceName} service. Please provide more details about the process and timeline.`;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Pricing Button Selection - Populate Contact Form
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.getAttribute('data-service');
        const servicePrice = button.getAttribute('data-price');
        const serviceSelect = document.getElementById('service');
        const messageTextarea = document.getElementById('message');
        const budgetSelect = document.getElementById('budget');
        
        // Set the service in the dropdown
        serviceSelect.value = serviceName;
        
        // Set appropriate budget range based on price
        if (servicePrice.includes('$59')) {
            budgetSelect.value = 'Under $100';
        } else if (servicePrice.includes('$79') || servicePrice.includes('$99')) {
            budgetSelect.value = '$100 - $300';
        } else if (servicePrice.includes('$149')) {
            budgetSelect.value = '$100 - $300';
        } else if (servicePrice.includes('$199')) {
            budgetSelect.value = '$100 - $300';
        } else if (servicePrice.includes('$299')) {
            budgetSelect.value = '$300 - $500';
        }
        
        // Pre-fill message with service and pricing request
        messageTextarea.value = `Hi, I'm interested in your ${serviceName} service (${servicePrice}). Please send me the payment link and let me know the next steps to get started.`;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const budget = formData.get('budget');
    const message = formData.get('message');
    
    // Validate required fields
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Prepare email content
    const emailSubject = `New Service Request: ${service || 'General Inquiry'}`;
    const emailBody = `
New service request from your website:

Name: ${name}
Email: ${email}
Service: ${service || 'Not specified'}
Budget: ${budget || 'Not specified'}

Message:
${message}

---
This message was sent from your freelance website contact form.
    `.trim();
    
    // Create mailto link (fallback method)
    const mailtoLink = `mailto:bazizi426abdellatif@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Simulate form submission (in a real scenario, you would use a backend service)
    setTimeout(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        contactForm.reset();
        
        // Open mailto link
        window.location.href = mailtoLink;
        
    }, 2000);
});

// Show Success Modal
function showSuccessModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .process-step');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form field focus effects
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.classList.remove('focused');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Toggle mobile menu with Enter/Space on nav toggle
    if ((e.key === 'Enter' || e.key === ' ') && e.target === navToggle) {
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'images/web-development.jpg',
        'images/developer.jpg',
        'images/remote-consulting.jpg',
        'images/seo-optimization.jpg',
        'images/website-performance.jpg',
        'images/php-mysql.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Performance optimization: Debounce scroll events
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', debouncedScrollHandler);

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped up - could trigger some action
        } else {
            // Swiped down - could trigger some action
        }
    }
}

// Console welcome message
console.log('%c🚀 DevConsultPro Website Loaded Successfully!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies for optimal performance.', 'color: #6b7280; font-size: 12px;');

