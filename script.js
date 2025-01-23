// Add these functions at the end of your existing script.js file

// Scroll Reveal Animation
function initScrollReveal() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Newsletter Subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Show loading state
    const button = event.target.querySelector('button');
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

    // Simulate API call
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        button.style.backgroundColor = '#16a34a';
        event.target.reset();

        // Reset button after 2 seconds
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }, 1500);
}

// Featured Product Modal
function showFeaturedProduct(productId) {
    // Create and show modal with product details
    const modal = document.createElement('div');
    modal.className = 'modal featured-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="featured-product-details">
                <img src="/api/placeholder/400/400" alt="Featured Product">
                <div class="product-info">
                    <h2>Featured Product Name</h2>
                    <p class="description">Detailed product description goes here...</p>
                    <div class="specs">
                        <div class="spec-item">
                            <i class="fas fa-check"></i>
                            <span>Premium Quality</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>1 Year Warranty</span>
                        </div>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${productId})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add animation class after a small delay
    setTimeout(() => modal.classList.add('active'), 10);
}

// Category Filter Animation
function animateCategoryChange(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'scale(0.8)';
    });

    setTimeout(() => {
        filterProducts(category);
        products.forEach(product => {
            product.style.opacity = '1';
            product.style.transform = 'scale(1)';
        });
    }, 300);
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    let isAnimating = false;

    menuButton?.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        menuButton.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animate menu items
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
        });

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    });
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMobileMenu();

    // Add click handlers for featured products
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            showFeaturedProduct(1); // Pass actual product ID
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Initialize any floating images
    document.querySelectorAll('.floating-image').forEach(image => {
        image.style.animationDelay = `${Math.random() * 2}s`;
    });
});