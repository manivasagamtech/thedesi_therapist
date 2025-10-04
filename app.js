// App.js for Bhoomeeka - The Desi Therapist Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSliders();
    initializeFormLogic();
    initializeAnimations();
    initializeFormValidation();
    initializeScrollAnimations();
});

// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize slider functionality
function initializeSliders() {
    const happinessSlider = document.getElementById('happiness');
    const comfortSlider = document.getElementById('comfortLevel');
    const happinessValue = document.getElementById('happinessValue');
    const comfortValue = document.getElementById('comfortValue');

    if (happinessSlider && happinessValue) {
        happinessSlider.addEventListener('input', function() {
            happinessValue.textContent = this.value;
            updateSliderColor(this);
        });
        updateSliderColor(happinessSlider);
    }

    if (comfortSlider && comfortValue) {
        comfortSlider.addEventListener('input', function() {
            comfortValue.textContent = this.value;
            updateSliderColor(this);
        });
        updateSliderColor(comfortSlider);
    }
}

// Update slider background color based on value
function updateSliderColor(slider) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;
    
    // Create gradient based on slider value
    const gradient = `linear-gradient(to right, #98E4D6 0%, #98E4D6 ${percentage}%, #FFF8F0 ${percentage}%, #FFF8F0 100%)`;
    slider.style.background = gradient;
}

// Initialize form logic
function initializeFormLogic() {
    const previousTherapyRadios = document.querySelectorAll('input[name="previousTherapy"]');
    const therapyDetails = document.getElementById('therapyDetails');
    
    previousTherapyRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                therapyDetails.style.display = 'block';
                therapyDetails.classList.add('fade-in', 'visible');
            } else {
                therapyDetails.style.display = 'none';
                therapyDetails.classList.remove('visible');
            }
        });
    });

    // Handle "neither" checkbox for services
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    const neitherCheckbox = document.querySelector('input[name="services"][value="neither"]');
    
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'neither' && this.checked) {
                // Uncheck other service options
                serviceCheckboxes.forEach(cb => {
                    if (cb.value !== 'neither') {
                        cb.checked = false;
                    }
                });
            } else if (this.value !== 'neither' && this.checked) {
                // Uncheck neither option if other services are selected
                if (neitherCheckbox) {
                    neitherCheckbox.checked = false;
                }
            }
        });
    });
}

// Initialize form animations
function initializeAnimations() {
    const formSections = document.querySelectorAll('.form-section');
    
    formSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('fade-in');
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Add hover effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
        });
    });
}

// Initialize scroll animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .form-section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('therapyForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        field.classList.remove('valid');
        showErrorMessage(field);
    }
    
    return isValid;
}

// Show error message
function showErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#FF5459';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '4px';
    
    if (field.type === 'email') {
        errorDiv.textContent = 'Please enter a valid email address';
    } else if (field.type === 'number') {
        errorDiv.textContent = 'Please enter a valid age';
    } else if (field.tagName === 'SELECT') {
        errorDiv.textContent = 'Please select an option';
    } else if (field.type === 'radio') {
        errorDiv.textContent = 'Please select an option';
    } else {
        errorDiv.textContent = 'This field is required';
    }
    
    field.parentNode.appendChild(errorDiv);
}

// Remove error message
function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('therapyForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    // Validate radio groups
    const radioGroups = ['culturalTherapy', 'previousTherapy'];
    radioGroups.forEach(groupName => {
        const checkedRadio = form.querySelector(`input[name="${groupName}"]:checked`);
        if (!checkedRadio) {
            isFormValid = false;
            const radioGroup = form.querySelector(`input[name="${groupName}"]`);
            if (radioGroup) {
                showErrorMessage(radioGroup);
            }
        }
    });

    return isFormValid;
}

// Submit form
function submitForm() {
    const form = document.getElementById('therapyForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (like checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    // Add slider values
    data.happiness = document.getElementById('happiness').value;
    data.comfortLevel = document.getElementById('comfortLevel').value;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        console.log('Form Data:', data);
        showSuccessMessage();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Reset form
        form.reset();
        
        // Reset slider displays
        document.getElementById('happinessValue').textContent = '5';
        document.getElementById('comfortValue').textContent = '5';
        
        // Hide therapy details section
        document.getElementById('therapyDetails').style.display = 'none';
        
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #98E4D6, #90EE90);
            color: #2C3E50;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(152, 228, 214, 0.4);
            animation: fadeInSuccess 0.5s ease;
        ">
            <h3 style="margin: 0 0 10px 0; font-size: 18px;">🌟 Thank You!</h3>
            <p style="margin: 0; font-size: 16px;">Your intake form has been submitted successfully. Bhoomeeka will review your information and contact you soon to begin your healing journey.</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">You can also DM @thedesi_therapist on Instagram for immediate assistance.</p>
        </div>
    `;
    
    const form = document.getElementById('therapyForm');
    form.parentNode.insertBefore(successDiv, form);
    
    // Add CSS for animation
    if (!document.getElementById('successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes fadeInSuccess {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Add CSS for form validation states
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #FF5459;
        box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.2);
    }
    
    .form-group input.valid,
    .form-group textarea.valid,
    .form-group select.valid {
        border-color: #90EE90;
        box-shadow: 0 0 0 3px rgba(144, 238, 144, 0.2);
    }
    
    .error-message {
        animation: slideInError 0.3s ease;
    }
    
    @keyframes slideInError {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(validationStyles);

// Add floating elements animation
function createFloatingElements() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const shapes = ['✨', '🌸', '🦋', '💫', '🌺'];
    
    for (let i = 0; i < 6; i++) {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-element';
        floatingEl.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        floatingEl.style.cssText = `
            position: absolute;
            font-size: 20px;
            opacity: 0.6;
            pointer-events: none;
            z-index: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(floatingEl);
    }
}

// Add floating animation
const floatingStyles = document.createElement('style');
floatingStyles.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-10px) rotate(5deg);
        }
        50% {
            transform: translateY(-5px) rotate(-5deg);
        }
        75% {
            transform: translateY(-15px) rotate(3deg);
        }
    }
`;
document.head.appendChild(floatingStyles);

// Initialize floating elements
setTimeout(createFloatingElements, 1000);

// Add smooth hover transitions for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, input, select, textarea, .service-card, .testimonial-card');
    
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
});

// Accessibility: Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
        scrollToContact();
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'all 0.5s ease';
    });
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.3;
        heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
}, 16)); // ~60fps
