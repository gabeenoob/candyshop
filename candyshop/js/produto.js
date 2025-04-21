// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'red';
    
    // Product data (simulated database)
    const products = {
        red: {
            name: 'Red MDMA',
            price: 'R$ 50,00',
            btcPrice: '0.00045 BTC',
            quantity: '300mg',
            image: 'assets/img/red-pill.png',
            color: '#ff3c3c',
            description: 'Red MDMA oferece uma experiência intensa com foco em energia e euforia. Este produto é conhecido por seu efeito energético potente e duradouro, ideal para ambientes festivos.   ',
        },
        blue: {
            name: 'Blue MDMA',
            price: 'R$ 45,00',
            btcPrice: '0.00041 BTC',
            quantity: '250mg',
            image: 'assets/img/blue-pill.png',
            color: '#3caeff',
            description: 'Blue MDMA proporciona uma experiência relaxante com ondas de euforia controlada. Este produto  equilibra sensações de calma com momentos de intenso bem-estar.   ',
        },
        green: {
            name: 'Green MDMA',
            price: 'R$ 48,00',
            btcPrice: '0.00043 BTC',
            quantity: '280mg',
            image: 'assets/img/green-pill.png',
            color: '#4cff4c',
            description: 'Green MDMA oferece o equilíbrio perfeito entre energia e relaxamento, ideal para noites longas. Este produto é conhecido pela experiência suave e duradoura.   ',
        },
        pink: {
            name: 'Pink MDMA',
            price: 'R$ 55,00',
            btcPrice: '0.00049 BTC',
            quantity: '320mg',
            image: 'assets/img/pink-pill.png',
            color: '#ff8eda',
            description: 'Pink MDMA proporciona sensação de amor e conexão social com efeitos sensoriais intensos. Este produto é famoso por amplificar a empatia e sensações táteis.   ',
        },
        gold: {
            name: 'Gold MDMA',
            price: 'R$ 75,00',
            btcPrice: '0.00068 BTC',
            quantity: '400mg',
            image: 'assets/img/gold-pill.png',
            color: '#ffd700',
            description: 'Nossa formulação premium com pureza máxima e efeitos balanceados. Este produto  de edição limitada representa o ápice da nossa linha.   ',
        },
        purple: {
            name: 'Purple MDMA',
            price: 'R$ 52,00',
            btcPrice: '0.00047 BTC',
            quantity: '290mg',
            image: 'assets/img/purple-pill.png',
            color: '#9b4cf7',
            description: 'Purple MDMA oferece uma experiência visual e sensorial potencializada. Este produto é ideal para quem busca efeitos visuais mais intensos.   ',
        }
    };
    
    // Get product data
    const product = products[productId] || products.red;
    
    // Update product details on page
    updateProductDetails(product);
    
    // Set active thumbnail
    setActiveThumbnail(productId);
    
    // Add thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const color = this.querySelector('img').getAttribute('data-color');
            updateProductDetails(products[color]);
            setActiveThumbnail(color);
        });
    });
    
    // Initialize product image hover effects
    initializeProductImageEffects();
});

function updateProductDetails(product) {
    // Update text details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-btc-price').textContent = product.btcPrice;
    document.getElementById('product-quantity').textContent = product.quantity;
    document.getElementById('product-description').innerHTML = product.description;
    
    // Update image
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--product-color', product.color);
    document.documentElement.style.setProperty('--accent', product.color);
    
    // Update page title
    document.title = `${product.name} - CandyShop`;
    
    // Add animation effect to image
    const productImage = document.getElementById('product-image');
    productImage.style.animation = 'none';
    setTimeout(() => {
        productImage.style.animation = 'float 6s ease-in-out infinite';
    }, 10);
}

function setActiveThumbnail(productId) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        const thumbColor = thumb.querySelector('img').getAttribute('data-color');
        if (thumbColor === productId) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function initializeProductImageEffects() {
    const productImage = document.querySelector('.main-product-image');
    
    if (productImage) {
        productImage.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const img = this.querySelector('img');
            
            // Apply 3D rotation effect
            img.style.transform = `
                rotateY(${(x - 0.5) * 20}deg)
                rotateX(${(y - 0.5) * -20}deg)
                scale(1.1)
            `;
            
            // Create a glow effect that follows the mouse
            this.style.background = `
                radial-gradient(
                    circle at ${x * 100}% ${y * 100}%,
                    rgba(${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--product-color').trim())}, 0.3) 0%,
                    transparent 70%
                )
            `;
        });
        
        productImage.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = '';
            this.style.background = '';
        });
    }
    
    // Add 3D effect to gallery
    const gallery = document.querySelector('.product-gallery');
    
    if (gallery) {
        document.addEventListener('mousemove', function(e) {
            const { innerWidth, innerHeight } = window;
            const x = e.clientX / innerWidth - 0.5;
            const y = e.clientY / innerHeight - 0.5;
            
            gallery.style.transform = `
                rotateY(${x * 5}deg)
                rotateX(${y * -5}deg)
                translateZ(10px)
            `;
        });
    }
}

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