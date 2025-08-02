// Set default language to English
document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    document.body.classList.add('english');
    
    // Language switcher functionality
    const englishBtn = document.getElementById('english-btn');
    const hindiBtn = document.getElementById('hindi-btn');
    
    englishBtn.addEventListener('click', function() {
        document.body.classList.remove('hindi');
        document.body.classList.add('english');
        englishBtn.classList.add('active');
        hindiBtn.classList.remove('active');
        localStorage.setItem('language', 'english');
    });
    
    hindiBtn.addEventListener('click', function() {
        document.body.classList.remove('english');
        document.body.classList.add('hindi');
        hindiBtn.classList.add('active');
        englishBtn.classList.remove('active');
        localStorage.setItem('language', 'hindi');
    });
    
    // Check if language preference is stored in localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
        document.body.classList.remove('english');
        document.body.classList.add('hindi');
        hindiBtn.classList.add('active');
        englishBtn.classList.remove('active');
    } else {
        document.body.classList.remove('hindi');
        document.body.classList.add('english');
        englishBtn.classList.add('active');
        hindiBtn.classList.remove('active');
    }
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        
        // Check if mobile nav already exists
        if (document.querySelector('.mobile-nav-toggle')) return;
        
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.appendChild(mobileNavToggle);
        
        const nav = document.querySelector('nav');
        nav.classList.add('desktop-nav');
        
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Call mobile nav function if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileNav();
    }
    
    // Add mobile nav on resize if needed
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            createMobileNav();
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation for admission and login forms
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Create error message if it doesn't exist
            let errorMsg = field.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('span');
                errorMsg.classList.add('error-message');
                const fieldLabel = field.previousElementSibling ? field.previousElementSibling.textContent : 'This field';
                errorMsg.textContent = `${fieldLabel} is required`;
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            const errorMsg = field.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
            
            let errorMsg = emailField.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('span');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'Please enter a valid email address';
                emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
            }
        }
    }
    
    // Password validation for login forms
    const passwordField = form.querySelector('input[type="password"]');
    if (passwordField && passwordField.value.trim() && passwordField.value.length < 6) {
        isValid = false;
        passwordField.classList.add('error');
        
        let errorMsg = passwordField.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('span');
            errorMsg.classList.add('error-message');
            errorMsg.textContent = 'Password must be at least 6 characters';
            passwordField.parentNode.insertBefore(errorMsg, passwordField.nextSibling);
        }
    }
    
    return isValid;
}

// Add event listeners to forms when they exist
document.addEventListener('DOMContentLoaded', function() {
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            if (!validateForm('admission-form')) {
                e.preventDefault();
            }
        });
    }
    
    const studentLoginForm = document.getElementById('student-login-form');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            if (!validateForm('student-login-form')) {
                e.preventDefault();
            }
        });
    }
    
    const parentLoginForm = document.getElementById('parent-login-form');
    if (parentLoginForm) {
        parentLoginForm.addEventListener('submit', function(e) {
            if (!validateForm('parent-login-form')) {
                e.preventDefault();
            }
        });
    }
});