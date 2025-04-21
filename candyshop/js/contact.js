// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize captcha
    generateCaptcha();
    
    // Add form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show success message
                const popup = document.getElementById('form-popup');
                openPopup(popup);
                
                // Reset form
                this.reset();
                
                // Generate new captcha
                generateCaptcha();
            }
        });
    }
    
    // Add captcha refresh functionality
    const captchaRefresh = document.querySelector('.captcha-refresh');
    
    if (captchaRefresh) {
        captchaRefresh.addEventListener('click', generateCaptcha);
    }
    
    // Add animation to form fields
    animateFormFields();
});

// Generate a random captcha code
function generateCaptcha() {
    const captchaDisplay = document.querySelector('.captcha-image');
    
    if (captchaDisplay) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            captcha += chars.charAt(randomIndex);
        }
        
        captchaDisplay.textContent = captcha;
        
        // Add glitch effect to captcha
        captchaDisplay.style.animation = 'glitch 0.3s infinite';
        setTimeout(() => {
            captchaDisplay.style.animation = '';
        }, 500);
    }
}

// Validate form before submission
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const captchaInput = document.getElementById('captcha');
    const captchaDisplay = document.querySelector('.captcha-image');
    
    let isValid = true;
    
    // Reset error highlights
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formInputs.forEach(input => {
        input.style.borderColor = '';
    });
    
    // Check name
    if (!name.value.trim()) {
        name.style.borderColor = '#ff3c3c';
        showInputError(name, 'Por favor, insira seu nome');
        isValid = false;
    }
    
    // Check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.style.borderColor = '#ff3c3c';
        showInputError(email, 'Por favor, insira um email válido');
        isValid = false;
    }
    
    // Check subject
    if (!subject.value) {
        subject.style.borderColor = '#ff3c3c';
        showInputError(subject, 'Por favor, selecione um assunto');
        isValid = false;
    }
    
    // Check message
    if (!message.value.trim()) {
        message.style.borderColor = '#ff3c3c';
        showInputError(message, 'Por favor, insira sua mensagem');
        isValid = false;
    }
    
    // Check captcha
    if (captchaInput.value.trim() !== captchaDisplay.textContent) {
        captchaInput.style.borderColor = '#ff3c3c';
        showInputError(captchaInput, 'Código captcha incorreto');
        isValid = false;
    }
    
    return isValid;
}

// Show error message for input
function showInputError(input, message) {
    // Check if error message already exists
    let errorMsg = input.nextElementSibling;
    
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#ff3c3c';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '5px';
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    
    errorMsg.textContent = message;
    
    // Add shake animation to input
    input.style.animation = 'shake 0.5s';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

// Animate form fields when they come into view
function animateFormFields() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Open any popup
function openPopup(popup) {
    if (!popup) return;
    
    popup.style.display = 'flex';
    
    // Add click event to close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
}