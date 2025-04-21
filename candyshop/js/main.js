// Utility functions
function animateOnScroll() {
    const elements = document.querySelectorAll('.animated:not(.visible)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
}

// Initialize location display
function initializeLocation() {
    const locationSpan = document.getElementById('user-location');
    
    // In a real application, this would use geolocation or IP detection
    // For demo purposes, we're using a static location
    const cities = ['São Paulo'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    locationSpan.textContent = randomCity;
}

// Initialize buttons and interactive elements
function initializeButtons() {
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            showNotification('Produto adicionado ao carrinho');
        });
    }
    
    // Buy now button
    const buyNowBtn = document.getElementById('buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            openCheckoutModal();
        });
    }
    
    // Quantity buttons
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
    }
    
    if (plusBtn && quantityInput) {
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
            
            // Add active class to current tab and pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // FAQ toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // All shop buttons with "Comprar Agora" text
    const shopButtons = document.querySelectorAll('.btn');
    
    shopButtons.forEach(button => {
        if (button.textContent.includes('Comprar') || button.textContent.includes('Ver Produto')) {
            button.addEventListener('click', function(e) {
                // Only prevent default if it's not a link with href
                if (!this.hasAttribute('href')) {
                    e.preventDefault();
                    openCheckoutPopup();
                }
            });
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const popup = document.getElementById('form-popup');
            
            if (popup) {
                openPopup(popup);
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Close checkout modal
            const modal = document.getElementById('checkout-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            
            // Open checkout popup
            openCheckoutPopup();
            
            // Reset form
            checkoutForm.reset();
        });
    }
    
    // Close buttons for popups and modals
    const closeButtons = document.querySelectorAll('.close-popup, .close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement.parentElement;
            parent.style.display = 'none';
        });
    });
    
    // Captcha refresh button
    const captchaRefresh = document.querySelector('.captcha-refresh');
    const captchaImage = document.querySelector('.captcha-image');
    
    if (captchaRefresh && captchaImage) {
        captchaRefresh.addEventListener('click', function() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let captchaText = '';
            
            for (let i = 0; i < 6; i++) {
                captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            captchaImage.textContent = captchaText;
        });
    }
}

// Show a notification
function showNotification(message) {
    // Check if notification element exists, if not create it
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add styles inline since we may not have added this to the CSS
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--product-color, var(--accent))';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
    }
    
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }, 3000);
}

// Open checkout modal
function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Open checkout popup
function openCheckoutPopup() {
    const popup = document.getElementById('checkout-popup');
    
    if (popup) {
        openPopup(popup);
    }
}

// Open any popup
function openPopup(popup) {
    popup.style.display = 'flex';
    
    // Add click event to close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
}

// Event Listeners
window.addEventListener('DOMContentLoaded', function() {
    initializeLocation();
    initializeButtons();
    
    // Animate elements in view on load
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Apply animations to elements with "animated" class
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const elements = document.querySelectorAll('.animated');
        elements.forEach(element => element.classList.add('visible'));
    }, 300);
});