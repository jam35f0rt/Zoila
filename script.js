// Product Data
const products = [
    {
        id: 1,
        name: 'Premium Phone Case',
        description: 'Durable protection with style',
        price: 29.99,
        image: `
            <div class="product-placeholder"></div>
        `
    },
    {
        id: 2,
        name: 'Wireless Charger',
        description: 'Fast charging technology',
        price: 39.99,
        image: `
            <div class="product-placeholder"></div>
        `
    },
    {
        id: 3,
        name: 'Screen Protector',
        description: 'Crystal clear protection',
        price: 19.99,
        image: `
            <div class="product-placeholder"></div>
        `
    }
];

// State Management
let state = {
    cart: [],
    cartVisible: false,
    loadingStates: new Set()
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Close Application
function closeApp() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "about:blank";
        window.close();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Close Button
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', closeApp);
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Explore Collection Button
    const exploreButton = document.querySelector('.primary-btn');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Render Products
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.image}
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button 
                class="add-to-cart-btn"
                onclick="handleAddToCart(${product.id})"
                data-product-id="${product.id}"
            >
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Handle Add to Cart
function handleAddToCart(productId) {
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    if (!button || state.loadingStates.has(productId)) return;

    // Add loading state
    state.loadingStates.add(productId);
    button.textContent = 'Adding...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Update button state
        button.textContent = '✓ Added';
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
            state.loadingStates.delete(productId);
        }, 2000);
    }, 500);
}

// Handle Newsletter Submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');
    
    if (!emailInput || !submitButton || submitButton.disabled) return;

    // Add loading state
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    emailInput.disabled = true;

    // Simulate API call
    setTimeout(() => {
        emailInput.value = '';
        submitButton.textContent = 'Subscribed!';
        
        // Reset form after delay
        setTimeout(() => {
            submitButton.textContent = 'Subscribe';
            submitButton.disabled = false;
            emailInput.disabled = false;
        }, 2000);
    }, 500);
}