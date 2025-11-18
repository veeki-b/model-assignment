// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cart functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');

// 3D Models Database
const models = [
    {
        id: 1,
        name: 'Vintage Bicycle',
        description: 'Detailed bicycle 3D model perfect for racing projects',
        price: 29.99,
        category: 'gadgets',
        modelUrl: 'assets/vintage_bicycle.glb',
    },
    {
        id: 2,
        name: 'Neil Armstrong',
        description: 'Historical figure 3D model with high detail',
        price: 39.99,
        category: 'gadgets',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    },
    {
        id: 3,
        name: 'Simple Classic Bicycle',
        description: 'Animated bicycle with expressive features',
        price: 34.99,
        category: 'electronics',
        modelUrl: 'assets/simple_low_poly_classic_bicycle.glb',

    },
    {
        id: 4,
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones 3D model',
        price: 24.99,
        category: 'electronics',
        modelUrl: 'assets/racing_bicycle.glb',
 
    },
    {
        id: 5,
        name: 'Smart Watch',
        description: 'Modern smartwatch 3D model with detailed features',
        price: 27.99,
        category: 'electronics',
        modelUrl: 'assets/vintage_bicycle.glb',
        thumbnail: '⌚'
    },
    {
        id: 6,
        name: 'Wireless Speaker',
        description: 'Portable Bluetooth speaker 3D model',
        price: 22.99,
        category: 'electronics',
        modelUrl: 'assets/bicycle.glb',
        thumbnail: '🔊'
    },
    {
        id: 7,
        name: 'Modern Chair',
        description: 'Ergonomic office chair 3D model',
        price: 32.99,
        category: 'furniture',
        modelUrl: 'assets/modern-sofa.glb',
        thumbnail: '🪑'
    },
    {
        id: 8,
        name: 'Desk Lamp',
        description: 'Modern desk lamp 3D model',
        price: 19.99,
        category: 'furniture',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
        thumbnail: '💡'
    },
    {
        id: 9,
        name: 'Laptop Stand',
        description: 'Ergonomic laptop stand 3D model',
        price: 18.99,
        category: 'accessories',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        thumbnail: '💻'
    },
    {
        id: 10,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse 3D model',
        price: 16.99,
        category: 'accessories',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        thumbnail: '🖱️'
    },
    {
        id: 11,
        name: 'USB-C Hub',
        description: 'Multi-port USB-C hub 3D model',
        price: 21.99,
        category: 'accessories',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
        thumbnail: '🔌'
    },
    {
        id: 12,
        name: 'VR Headset',
        description: 'Virtual reality headset 3D model',
        price: 44.99,
        category: 'gadgets',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        thumbnail: '🥽'
    }
];

// Categories
const categories = [
    { id: 'electronics', name: 'Bicycle', icon: '📱', count: 4 },
    { id: 'furniture', name: 'Furniture', icon: '🪑', count: 2 },
    { id: 'accessories', name: 'Accessories', icon: '⌚', count: 3 },
    { id: 'gadgets', name: 'Gadgets', icon: '🎮', count: 3 }
];

// Current filter
let currentFilter = 'all';

// Render Categories
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>${cat.count} models</p>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterModels(category);
            // Update filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });
        });
    });
}

// Render Models
function renderModels(filter = 'all') {
    const modelsGrid = document.getElementById('modelsGrid');
    const filteredModels = filter === 'all' 
        ? models 
        : models.filter(model => model.category === filter);

    modelsGrid.innerHTML = filteredModels.map(model => `
        <div class="model-card" data-model-id="${model.id}">
            <div class="model-preview">
                <model-viewer 
                    src="${model.modelUrl}"
                    alt="${model.name}"
                    auto-rotate
                    interaction-policy="none"
                    camera-controls="false"
                    shadow-intensity="1"
                    exposure="1.0"
                    environment-image="neutral"
                    class="model-preview-viewer"
                    id="preview-${model.id}">
                    <div slot="poster" class="model-thumbnail">
                        <div class="thumbnail-icon">${model.thumbnail}</div>
                    </div>
                </model-viewer>
                <div class="model-overlay">
                    <button class="view-model-btn" onclick="openModelViewer(${model.id})">
                        View in 3D
                    </button>
                </div>
            </div>
            <div class="model-info">
                <h3 class="model-name">${model.name}</h3>
                <p class="model-description">${model.description}</p>
                <div class="model-footer">
                    <span class="model-price">$${model.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${model.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Models
function filterModels(category) {
    currentFilter = category;
    renderModels(category);
    // Scroll to models section
    document.getElementById('models').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Open Model Viewer Modal
function openModelViewer(modelId) {
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    const modal = document.getElementById('modelViewerModal');
    const modalViewer = document.getElementById('modalModelViewer');
    const modalName = document.getElementById('modalModelName');
    const modalDescription = document.getElementById('modalModelDescription');
    const modalPrice = document.getElementById('modalModelPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');
    const modalARBtn = document.getElementById('modalARBtn');
    const modalFullscreenBtn = document.getElementById('modalFullscreenBtn');

    // Set model info
    modalName.textContent = model.name;
    modalDescription.textContent = model.description;
    modalPrice.textContent = model.price.toFixed(2);

    // Set 3D model
    modalViewer.setAttribute('src', model.modelUrl);
    modalViewer.setAttribute('alt', model.name);

    // Update buttons
    modalAddToCart.onclick = () => {
        addToCart(modelId);
        closeModelViewer();
    };

    modalARBtn.onclick = () => {
        activateARWithFallback(modalViewer);
    };

    modalFullscreenBtn.onclick = () => {
        if (modalViewer.requestFullscreen) {
            modalViewer.requestFullscreen();
        } else if (modalViewer.webkitRequestFullscreen) {
            modalViewer.webkitRequestFullscreen();
        } else if (modalViewer.mozRequestFullScreen) {
            modalViewer.mozRequestFullScreen();
        }
    };

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus model viewer
    setTimeout(() => {
        modalViewer.focus();
    }, 100);
}

// Close Model Viewer Modal
function closeModelViewer() {
    const modal = document.getElementById('modelViewerModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add to Cart
function addToCart(modelId) {
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Animation
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
    
    showNotification(`${model.name} added to cart!`);
    updateCartCount();
}

// Update Cart Count in localStorage
function updateCartCount() {
    localStorage.setItem('cartCount', cartCount.toString());
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// AR Helpers
function activateARWithFallback(modelViewer) {
    if (!modelViewer) return;

    const activate = () => {
        if (modelViewer.canActivateAR === false) {
            showNotification('AR is not available on this device/browser.');
            return;
        }

        if (typeof modelViewer.activateAR === 'function') {
            modelViewer.activateAR();
        } else {
            showNotification('AR component is still loading. Please try again.');
        }
    };

    if (customElements.get('model-viewer')) {
        activate();
    } else {
        customElements.whenDefined('model-viewer').then(activate);
    }
}

// Initialize Hero Model Controls
function initializeHeroModelControls() {
    const heroModel = document.getElementById('heroModelViewer');
    if (!heroModel) return;

    const initialCameraOrbit = heroModel.getAttribute('camera-orbit') || '0deg 75deg 3m';
    const initialFov = heroModel.getAttribute('field-of-view') || '45deg';

    // Controls Panel Toggle
    const controlsToggle = document.getElementById('controlsToggle');
    const controlsContent = document.getElementById('controlsContent');
    let isCollapsed = false;

    if (controlsToggle && controlsContent) {
        controlsToggle.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            controlsContent.classList.toggle('collapsed', isCollapsed);
            controlsToggle.textContent = isCollapsed ? '+' : '−';
        });
    }

    // Auto Rotate Toggle
    const autoRotateToggle = document.getElementById('autoRotateToggle');
    if (autoRotateToggle) {
        autoRotateToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                heroModel.setAttribute('auto-rotate', '');
            } else {
                heroModel.removeAttribute('auto-rotate');
            }
        });
    }

    // Exposure Slider
    const exposureSlider = document.getElementById('exposureSlider');
    const exposureValue = document.getElementById('exposureValue');
    if (exposureSlider && exposureValue) {
        exposureSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            exposureValue.textContent = value;
            heroModel.setAttribute('exposure', value);
        });
    }

    // Shadow Slider
    const shadowSlider = document.getElementById('shadowSlider');
    const shadowValue = document.getElementById('shadowValue');
    if (shadowSlider && shadowValue) {
        shadowSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            shadowValue.textContent = value;
            heroModel.setAttribute('shadow-intensity', value);
        });
    }

    // FOV Slider
    const fovSlider = document.getElementById('fovSlider');
    const fovValue = document.getElementById('fovValue');
    if (fovSlider && fovValue) {
        fovSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            fovValue.textContent = value;
            heroModel.setAttribute('field-of-view', `${value}deg`);
        });
    }

    // Reset Camera
    const resetViewBtn = document.getElementById('resetViewBtn');
    const resetCameraBtn = document.getElementById('resetCameraBtn');
    
    const resetCamera = () => {
        heroModel.setAttribute('camera-orbit', initialCameraOrbit);
        heroModel.setAttribute('field-of-view', initialFov);
        if (fovSlider && fovValue) {
            fovSlider.value = initialFov.replace('deg', '');
            fovValue.textContent = initialFov.replace('deg', '');
        }
    };

    if (resetViewBtn) resetViewBtn.addEventListener('click', resetCamera);
    if (resetCameraBtn) resetCameraBtn.addEventListener('click', resetCamera);

    // Fit Model
    const fitModelBtn = document.getElementById('fitModelBtn');
    if (fitModelBtn) {
        fitModelBtn.addEventListener('click', () => {
            heroModel.cameraTarget = 'auto';
            heroModel.updateFraming();
        });
    }

    // AR Button
    const arButton = document.getElementById('arButton');
    if (arButton) {
        arButton.addEventListener('click', () => {
            activateARWithFallback(heroModel);
        });
    }

    // Enable interaction
    heroModel.setAttribute('interaction-policy', 'allow-when-focused');
    heroModel.addEventListener('load', () => {
        heroModel.setAttribute('camera-controls', '');
    });

    // Make container clickable
    const heroContainer = document.querySelector('.hero-3d-container');
    if (heroContainer) {
        heroContainer.addEventListener('click', () => {
            heroModel.focus();
        });
    }
}

// Filter Buttons
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    renderCategories();
    renderModels();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterModels(btn.dataset.category);
        });
    });

    // Modal close handlers
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) modalClose.addEventListener('click', closeModelViewer);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModelViewer);
    
    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModelViewer();
        }
    });

    // Cart button
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            if (cartCount > 0) {
                showNotification(`You have ${cartCount} item(s) in your cart!`);
            } else {
                showNotification('Your cart is empty. Browse our 3D models!');
            }
        });
    }

    // Initialize hero controls
    setTimeout(() => {
        initializeHeroModelControls();
    }, 100);

    // Load cart count
    if (localStorage.getItem('cartCount')) {
        cartCount = parseInt(localStorage.getItem('cartCount'));
        cartCountElement.textContent = cartCount;
    }
});

// Make functions global for onclick handlers
window.openModelViewer = openModelViewer;
window.addToCart = addToCart;
window.filterModels = filterModels;
