// Products data
const products = [
    {
        id: 1,
        title: "Premium Phone Case",
        price: 29.99,
        image: "/api/placeholder/300/200",
        description: "Durable protection with style"
    },
    {
        id: 2,
        title: "Wireless Charger",
        price: 39.99,
        image: "/api/placeholder/300/200",
        description: "Fast charging technology"
    },
    {
        id: 3,
        title: "Screen Protector",
        price: 19.99,
        image: "/api/placeholder/300/200",
        description: "Crystal clear protection"
    }
];

// Features data
const features = [
    {
        icon: "🌟",
        title: "Premium Quality",
        description: "We source only the highest quality materials for our products"
    },
    {
        icon: "🚚",
        title: "Fast Shipping",
        description: "Free express shipping on all orders over $50"
    },
    {
        icon: "💬",
        title: "24/7 Support",
        description: "Our customer support team is always here to help"
    }
];

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        
        // Update button icon
        const svg = mobileMenuButton.querySelector('svg');
        if (isOpen) {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"/>';
        }
    });

    // Render products
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-4">
                <div class="overflow-hidden rounded">
                    <img src="${product.image}" alt="${product.title}" class="product-image w-full h-48 object-cover">
                </div>
                <h3 class="text-xl font-semibold mt-4">${product.title}</h3>
                <p class="text-gray-600 mt-2">${product.description}</p>
                <p class="text-purple-600 font-bold mt-2">$${product.price}</p>
                <button class="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-all">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Render features
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = features.map(feature => `
        <div class="feature-card text-center p-6 bg-white rounded-lg shadow-lg">
            <div class="text-4xl mb-4">${feature.icon}</div>
            <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
            <p class="text-gray-600">${feature.description}</p>
        </div>
    `).join('');

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');

        // Disable form during submission
        emailInput.disabled = true;
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            newsletterStatus.textContent = 'Thanks for subscribing!';
            newsletterStatus.classList.remove('hidden');
            emailInput.value = '';
            
            // Re-enable form
            emailInput.disabled = false;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');

            // Hide status message after 3 seconds
            setTimeout(() => {
                newsletterStatus.classList.add('hidden');
            }, 3000);
        }, 1000);
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

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
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
