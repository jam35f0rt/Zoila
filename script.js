// Product Data
const products = [
    {
        id: 1,
        name: 'Premium Phone Case',
        description: 'Durable protection with style',
        price: 29.99,
        image: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="10" width="50" height="80" rx="5" 
                    style="fill:#8B5CF6; opacity:0.3"/>
            </svg>
        `
    },
    {
        id: 2,
        name: 'Wireless Charger',
        description: 'Fast charging technology',
        price: 39.99,
        image: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" 
                    style="fill:#8B5CF6; opacity:0.3"/>
            </svg>
        `
    },
    {
        id: 3,
        name: 'Screen Protector',
        description: 'Crystal clear protection',
        price: 19.99,
        image: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="20" width="50" height="60" 
                    style="fill:#8B5CF6; opacity:0.3"/>
            </svg>
        `
    }
];

// App State
let cart = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    setupEventListeners();
});

// Initialize product displays
function initializeProducts() {
    const productContainer = document.querySelector('.products-grid');
    if (productContainer) {
        productContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    ${product.image}
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `).join('');
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Close Button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', handleClose);
    }

    // Add to Cart Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Handle Close Button Click
function handleClose() {
    window.history.back();
}

// Handle Add to Cart
function handleAddToCart(e) {
    const button = e.currentTarget;
    
    // Add loading state
    button.textContent = 'Adding...';
    button.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        const productId = button.dataset.productId;
        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            cart.push(product);
            button.textContent = 'Added to Cart';
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
            }, 1000);
        }
    }, 500);
}

// Handle Newsletter Submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');
    
    if (emailInput && submitButton) {
        // Add loading state
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        emailInput.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            emailInput.value = '';
            submitButton.textContent = 'Subscribed!';
            
            // Reset form after delay
            setTimeout(() => {
                submitButton.textContent = 'Subscribe';
                submitButton.disabled = false;
                emailInput.disabled = false;
            }, 1000);
        }, 500);
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});