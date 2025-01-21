// State Management
const AppState = {
    products: [
        {
            id: 1,
            title: "Premium Phone Case",
            price: 29.99,
            originalPrice: 39.99,
            description: "Military-grade protection with sleek design",
            colors: ['space-gray', 'midnight-blue', 'rose-gold'],
            stock: 15,
            rating: 4.8,
            reviews: 124,
            image: `<svg viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8"/>
                        <stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.8"/>
                    </linearGradient>
                </defs>
                <rect x="40" y="20" width="120" height="160" rx="15" fill="url(#caseGradient)"/>
                <rect x="45" y="25" width="110" height="150" rx="12" fill="#ffffff" opacity="0.1"/>
                <circle cx="100" cy="100" r="20" fill="white" opacity="0.2"/>
            </svg>`
        },
        {
            id: 2,
            title: "Qi Wireless Charger",
            price: 49.99,
            originalPrice: 59.99,
            description: "15W fast charging with smart LED",
            colors: ['black', 'white'],
            stock: 8,
            rating: 4.9,
            reviews: 89,
            image: `<svg viewBox="0 0 200 200">
                <defs>
                    <radialGradient id="chargerGradient">
                        <stop offset="0%" style="stop-color:#8B5CF6"/>
                        <stop offset="100%" style="stop-color:#6366F1"/>
                    </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="60" fill="url(#chargerGradient)" opacity="0.8"/>
                <circle cx="100" cy="100" r="40" fill="white" opacity="0.1"/>
                <circle cx="100" cy="100" r="20" fill="white" opacity="0.2"/>
            </svg>`
        },
        {
            id: 3,
            title: "Tempered Glass Guard",
            price: 19.99,
            originalPrice: 24.99,
            description: "9H hardness with oleophobic coating",
            colors: ['clear'],
            stock: 22,
            rating: 4.7,
            reviews: 156,
            image: `<svg viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#EC4899;stop-opacity:0.6"/>
                        <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.6"/>
                    </linearGradient>
                </defs>
                <rect x="50" y="40" width="100" height="120" rx="5" fill="url(#glassGradient)"/>
                <rect x="55" y="45" width="90" height="110" rx="3" fill="white" opacity="0.1"/>
            </svg>`
        }
    ],
    cart: [],
    ui: {
        isCartOpen: false,
        isPaymentModalOpen: false,
        activeToasts: []
    }
};

// UI Controller
const UIController = {
    init() {
        this.renderProducts();
        this.setupEventListeners();
        this.initializeAnimations();
    },

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = AppState.products.map(product => this.generateProductCard(product)).join('');
    },

    generateProductCard(product) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    ${product.image}
                    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                    ${product.stock < 10 ? `<span class="stock-badge">Only ${product.stock} left</span>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-text">${product.rating} (${product.reviews})</span>
                        </div>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-colors">
                        ${product.colors.map(color => `
                            <button class="color-option" data-color="${color}" 
                                    style="background: var(--color-${color})">
                            </button>
                        `).join('')}
                    </div>
                    <div class="product-price-container">
                        <span class="product-price">$${product.price}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">$${product.originalPrice}</span>
                        ` : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="CartController.addItem(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    },

    setupEventListeners() {
        // Cart Toggle
        document.getElementById('cart-button')?.addEventListener('click', () => {
            CartController.toggleCart();
        });

        // Mobile Menu
        document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Payment Form
        document.getElementById('payment-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            PaymentController.processPayment();
        });

        // Scroll Animation
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    },

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${type === 'success' ? '✓' : '!'}</div>
            <div class="toast-message">${message}</div>
        `;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => container.removeChild(toast), 300);
        }, 3000);
    },

    toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('show');
    },

    handleScroll() {
        const scrollBtn = document.getElementById('scroll-to-top');
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
};

// Cart Controller
const CartController = {
    addItem(productId) {
        const product = AppState.products.find(p => p.id === productId);
        const existingItem = AppState.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            AppState.cart.push({ ...product, quantity: 1 });
        }

        this.updateCart();
        UIController.showToast('Item added to cart');
    },

    removeItem(productId) {
        AppState.cart = AppState.cart.filter(item => item.id !== productId);
        this.updateCart();
        UIController.showToast('Item removed from cart');
    },

    updateQuantity(productId, delta) {
        const item = AppState.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            this.updateCart();
        }
    },

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');

        // Update cart items
        cartItems.innerHTML = AppState.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button onclick="CartController.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="CartController.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="CartController.removeItem(${item.id})">×</button>
            </div>
        `).join('');

        // Update total
        const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Update count
        const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    },

    toggleCart() {
        const cart = document.getElementById('cart-sidebar');
        AppState.ui.isCartOpen = !AppState.ui.isCartOpen;
        cart.classList.toggle('open', AppState.ui.isCartOpen);
    }
};

// Payment Controller
const PaymentController = {
    processPayment() {
        const form = document.getElementById('payment-form');
        form.classList.add('loading');

        // Simulate payment processing
        setTimeout(() => {
            form.classList.remove('loading');
            UIController.showToast('Payment successful! Order confirmed.');
            AppState.cart = [];
            CartController.updateCart();
            CartController.toggleCart();
        }, 2000);
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    UIController.init();
});