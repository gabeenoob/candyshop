// Carousel Functionality
class Carousel {
    constructor(container) {
        this.container = container;
        this.items = this.container.querySelectorAll('.carousel-item');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 7000; // 7 seconds between slides
        
        this.init();
    }
    
    init() {
        // Show the first item
        this.showItem(0);
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot click events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showItem(index));
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    showItem(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Hide current item
        this.items[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Update current index
        this.currentIndex = index;
        
        // Show new item
        this.items[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
        
        // Reset animation classes
        const animatedElements = this.items[this.currentIndex].querySelectorAll('.animate-text, .btn');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        });
        
        // Update product color variable for various elements
        const productColor = window.getComputedStyle(this.items[this.currentIndex]).getPropertyValue('--product-color').trim();
        document.documentElement.style.setProperty('--accent', productColor);
        
        // Allow next animation after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }
    
    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.items.length) {
            nextIndex = 0;
        }
        this.showItem(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.items.length - 1;
        }
        this.showItem(prevIndex);
    }
    
    startAutoplay() {
        if (this.autoplayInterval) clearInterval(this.autoplayInterval);
        this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel');
    
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
    
    // Add product hover animations
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const productColor = window.getComputedStyle(this).getPropertyValue('--product-color').trim();
            this.style.boxShadow = `0 15px 40px rgba(${hexToRgb(productColor)}, 0.3)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Return RGB values
    return `${r}, ${g}, ${b}`;
}