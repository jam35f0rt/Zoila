// Product SVG Images
const productImages = {
    phoneCase: `
        <svg viewBox="0 0 200 200">
            <defs>
                <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8"/>
                    <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.8"/>
                </linearGradient>
            </defs>
            <rect x="40" y="20" width="120" height="160" rx="15" fill="url(#caseGradient)"/>
            <rect x="45" y="25" width="110" height="150" rx="12" fill="#FFFFFF" opacity="0.1"/>
        </svg>
    `,
    wirelessCharger: `
        <svg viewBox="0 0 200 200">
            <defs>
                <radialGradient id="chargerGradient">
                    <stop offset="0%" style="stop-color:#8B5CF6"/>
                    <stop offset="100%" style="stop-color:#6366F1"/>
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#chargerGradient)"/>
            <circle cx="100" cy="100" r="40" fill="#FFFFFF" opacity="0.1"/>
        </svg>
    `,
    screenProtector: `
        <svg viewBox="0 0 200 200">
            <defs>
                <linearGradient id="protectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.6"/>
                    <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.6"/>
                </linearGradient>
            </defs>
            <rect x="50" y="40" width="100" height="120" rx="5" fill="url(#protectorGradient)"/>
            <rect x="55" y="45" width="90" height="110" rx="3" fill="#FFFFFF" opacity="0.1"/>
        </svg>
    `
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeProductImages();
    setupEventListeners();
});

// Add SVG images to product cards
function initializeProductImages() {
    const productImages = document.querySelectorAll('.product-image');
    productImages[0].innerHTML = productImages.phoneCase;
    productImages[1].innerHTML = productImages.wirelessCharger;
    productImages[2].innerHTML = productImages.screenProtector;
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    // Close button
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        window.history.back();
    });
}

// Handle add to cart
function handleAddToCart(e) {
    const button = e.currentTarget;
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Adding...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = '✓ Added';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }, 1000);
}

// Handle newsletter submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Subscribing...';
    button.disabled = true;
    input.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = '✓ Subscribed';
        input.value = '';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            input.disabled = false;
        }, 2000);
    }, 1000);
}

// Helper function to show loading state
function showLoading(element) {
    element.classList.add('loading');
}