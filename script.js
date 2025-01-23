// Product Data
const products = [
    {
        id: 1,
        name: "Premium Phone Case",
        price: 29.99,
        category: "Protection",
        description: "Durable and stylish protection for your device",
        rating: 4.5,
        stock: 50
    },
    {
        id: 2,
        name: "Wireless Charger",
        price: 39.99,
        category: "Charging",
        description: "Fast 15W wireless charging pad",
        rating: 4.8,
        stock: 30
    },
    {
        id: 3,
        name: "Screen Protector",
        price: 19.99,
        category: "Protection",
        description: "9H tempered glass screen protection",
        rating: 4.3,
        stock: 100
    },
    {
        id: 4,
        name: "Power Bank",
        price: 49.99,
        category: "Charging",
        description: "20000mAh high-capacity power bank",
        rating: 4.7,
        stock: 25
    },
    {
        id: 5,
        name: "Phone Stand",
        price: 24.99,
        category: "Accessories",
        description: "Adjustable aluminum phone stand",
        rating: 4.4,
        stock: 40
    },
    {
        id: 6,
        name: "USB-C Cable",
        price: 14.99,
        category: "Charging",
        description: "Durable braided USB-C cable",
        rating: 4.6,
        stock: 75
    }
];

// State Management
let cart = [];
let currentFilter = 'all';
let currentSort = 'default';
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeStore();
    setupEventListeners();
    initScrollReveal();
    initBackToTop();
});

// Store Initialization
function initializeStore() {
    loadCart();
    renderProducts();
    updateCartCount();
    setupMobileMenu();
}

// Event Listeners Setup
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Filters
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => filterProducts(e.target.value));
    }

    // Sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => sortProducts(e.target.value));
    }

    // Scroll Events
    window.addEventListener('scroll', handleScroll);

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) {
            toggleCart();
        }
    });

    // Escape Key to Close Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('cartModal');
            if (modal && modal.style.display === 'block') {
                toggleCart();
            }
        }
    });
}

// Products Rendering
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    let displayProducts = [...products];

    // Apply filter
    if (currentFilter !== 'all') {
        displayProducts = displayProducts.filter(product => 
            product.category.toLowerCase() === currentFilter.toLowerCase()
        );
    }

    // Apply search filter if exists
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        displayProducts = displayProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply sorting
    switch (currentSort) {
        case 'price-low':
            displayProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            displayProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            displayProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            displayProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    // Render products with animation
    productsGrid.innerHTML = '';
    displayProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-icon">
                ${getProductIcon(product.category)}
            </svg>
            ${product.stock < 10 ? '<span class="low-stock">Low Stock</span>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                ${createRatingStars(product.rating)}
            </div>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Create Rating Stars
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
        <span class="rating-number">(${rating})</span>
    `;
}

// Product Category Icons
function getProductIcon(category) {
    switch (category.toLowerCase()) {
        case 'protection':
            return `
                <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <rect x="8" y="5" width="8" height="10" rx="1" stroke="currentColor" stroke-width="2"/>
            `;
        case 'charging':
            return `
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        case 'accessories':
            return `
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            `;
        default:
            return `
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            `;
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Product added to cart', 'success');
    addToCartAnimation(event.target);
}

function addToCartAnimation(button) {
    const cart = document.querySelector('.cart-icon');
    if (!cart || !button) return;

    // Create flying element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'flying-item';
    flyingElement.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    `;

    // Get positions
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    // Set initial position
    flyingElement.style.top = `${buttonRect.top}px`;
    flyingElement.style.left = `${buttonRect.left}px`;

    document.body.appendChild(flyingElement);

    // Animate
    requestAnimationFrame(() => {
        flyingElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        flyingElement.style.top = `${cartRect.top}px`;
        flyingElement.style.left = `${cartRect.left}px`;
        flyingElement.style.opacity = '0';
        flyingElement.style.transform = 'scale(0.1)';
    });

    // Cleanup
    setTimeout(() => flyingElement.remove(), 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Product removed from cart', 'info');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Animate count change
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="cart-item-icon">
                    ${getProductIcon(item.category)}
                </svg>
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Cart Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Cart Modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    if (modal.style.display === 'block') {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
    } else {
        modal.style.display = 'block';
        setTimeout(() => modal.style.opacity = '1', 10);
        renderCart();
    }
}

// Checkout Process
async function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    showLoading(true);
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        showPaymentForm();
    } catch (error) {
        showNotification('Checkout error. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

function showPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    if (!paymentForm) return;

    paymentForm.style.display = 'block';
    updateCheckoutSteps(2);
}

function updateCheckoutSteps(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

// Payment Processing
async function processPayment() {
    const cardName = document.getElementById('cardName')?.value;
    const cardNumber = document.getElementById('cardNumber')?.value;
    const expiry = document.getElementById('expiry')?.value;
    const cvv = document.getElementById('cvv')?.value;

    if (!validatePaymentForm(cardName, cardNumber, expiry, cvv)) {
        return;
    }

    showLoading(true);
    try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        showNotification('Payment successful!', 'success');
        cart = [];
        saveCart();
        updateCartCount();
        toggleCart();updateCheckoutSteps(1);
    } catch (error) {
        showNotification('Payment failed. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

function validatePaymentForm(cardName, cardNumber, expiry, cvv) {
    if (!cardName || !cardNumber || !expiry || !cvv) {
        showNotification('Please fill in all payment details', 'error');
        return false;
    }

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        showNotification('Invalid card number', 'error');
        return false;
    }

    // Expiry date validation (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
        showNotification('Invalid expiry date (MM/YY)', 'error');
        return false;
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
        showNotification('Invalid CVV', 'error');
        return false;
    }

    return true;
}

// Search and Filter Functions
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    currentFilter = 'all'; // Reset category filter
    document.getElementById('categoryFilter').value = 'all';
    
    if (searchTerm.length > 0) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderFilteredProducts(filteredProducts);
    } else {
        renderProducts();
    }
}

function renderFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="no-results-icon">
                    <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 21L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>No products found</p>
            </div>
        `;
        return;
    }

    renderProductsToGrid(filteredProducts);
}

function filterProducts(category) {
    currentFilter = category;
    renderProducts();
    updateActiveFilter(category);
}

function updateActiveFilter(category) {
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.classList.toggle('active', filter.dataset.category === category);
    });
}

function sortProducts(method) {
    currentSort = method;
    renderProducts();
}

// Utilities
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

function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    if (!toast) return;

    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;

    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// Mobile Menu
function setupMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
            navLinks.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
}

// Scroll Related Functions
function initScrollReveal() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Newsletter Subscription
async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showNotification('Successfully subscribed to newsletter!', 'success');
        form.reset();
    } catch (error) {
        showNotification('Failed to subscribe. Please try again.', 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle Page Visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh cart and products when page becomes visible
        loadCart();
        renderProducts();
    }
});

// Handle Window Resize
window.addEventListener('resize', debounce(() => {
    // Adjust layout if needed
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links')?.classList.remove('active');
        document.querySelector('.menu-button')?.classList.remove('active');
    }
}, 250));

// Export functions for external use if needed
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.handleCheckout = handleCheckout;
window.processPayment = processPayment;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.handleNewsletterSubmit = handleNewsletterSubmit;;
        
        // Reset forms
        document.getElementById('paymentForm').style.display = 'none';
