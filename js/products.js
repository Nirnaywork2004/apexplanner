/**
 * APEXPLANET WEB DEVELOPMENT INTERNSHIP - TASK 4
 * Requirement 3: Dynamic Product Listing, Multi-Faceted Filtering & Sorting
 * Developer: Priyotosh Mandal
 */

// Dataset: 12 Realistic High-Quality Products
const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'ApexBook Pro 16" Laptop',
    category: 'Electronics',
    price: 89999,
    rating: 4.9,
    ratingCount: 142,
    image: 'assets/images/laptop.svg',
    description: 'High-performance laptop with 12-core processor, 32GB RAM, 1TB NVMe SSD, and vivid Retina display for developers & creators.',
    badge: 'Best Seller',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'SonicShield Wireless Headphones',
    category: 'Audio & Accessories',
    price: 6499,
    rating: 4.8,
    ratingCount: 310,
    image: 'assets/images/headphones.svg',
    description: 'Active noise-canceling over-ear headphones with 40h battery life, spatial audio, and ultra-soft memory foam cushions.',
    badge: 'Popular',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'PulseTrack AMOLED Smartwatch',
    category: 'Wearables',
    price: 4999,
    rating: 4.7,
    ratingCount: 220,
    image: 'assets/images/smartwatch.svg',
    description: 'Advanced fitness smartwatch featuring continuous heart rate, SpO2 monitoring, GPS tracking, and IP68 water resistance.',
    badge: 'New',
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'LumixPro 4K Mirrorless Camera',
    category: 'Electronics',
    price: 54999,
    rating: 4.9,
    ratingCount: 88,
    image: 'assets/images/camera.svg',
    description: 'Compact 4K UHD mirrorless camera with fast autofocus, high dynamic range sensor, and interchangeable lens mount.',
    badge: 'Pro Choice',
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Vortex RGB Mechanical Keyboard',
    category: 'Audio & Accessories',
    price: 3499,
    rating: 4.6,
    ratingCount: 175,
    image: 'assets/images/keyboard.svg',
    description: 'Customizable mechanical gaming keyboard with hot-swappable tactile switches, per-key RGB backlighting, and braided cable.',
    badge: 'Hot Deal',
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'UrbanAero Commuter Backpack',
    category: 'Fashion',
    price: 1899,
    rating: 4.5,
    ratingCount: 94,
    image: 'assets/images/backpack.svg',
    description: 'Weather-resistant 25L modular commuter backpack with padded 16" laptop sleeve, anti-theft pockets, and ergonomic straps.',
    badge: null,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Velocity Ultra Running Sneakers',
    category: 'Fashion',
    price: 3299,
    rating: 4.7,
    ratingCount: 160,
    image: 'assets/images/sneakers.svg',
    description: 'Ultra-lightweight breathable running shoes engineered with responsive foam cushioning and reinforced carbon rubber outsole.',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Lumina Touch Smart Desk Lamp',
    category: 'Home Living',
    price: 1499,
    rating: 4.4,
    ratingCount: 68,
    image: 'assets/images/lamp.svg',
    description: 'Minimalist LED desk lamp with touch-sensitive dimming, 5 color temperatures, wireless phone charging base, and auto-timer.',
    badge: null,
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'BoomWave Waterproof Speaker',
    category: 'Audio & Accessories',
    price: 2499,
    rating: 4.6,
    ratingCount: 190,
    image: 'assets/images/speaker.svg',
    description: 'Rugged IPX7 waterproof portable Bluetooth speaker with deep bass radiators, 18-hour playtime, and dual pairing mode.',
    badge: 'Outdoor',
    inStock: true
  },
  {
    id: 'prod-10',
    name: 'ErgoFlex High-Back Office Chair',
    category: 'Home Living',
    price: 12999,
    rating: 4.8,
    ratingCount: 115,
    image: 'assets/images/chair.svg',
    description: 'Ergonomic breathable mesh chair with adjustable lumbar support, 3D armrests, smooth-rolling casters, and reclining lock.',
    badge: 'Top Rated',
    inStock: true
  },
  {
    id: 'prod-11',
    name: 'ViewMax 27" 4K IPS Monitor',
    category: 'Electronics',
    price: 26999,
    rating: 4.9,
    ratingCount: 130,
    image: 'assets/images/monitor.svg',
    description: 'Frameless 27-inch 4K UHD IPS display with 99% sRGB color gamut, USB-C 65W power delivery, and height-adjustable stand.',
    badge: 'Developer Pick',
    inStock: true
  },
  {
    id: 'prod-12',
    name: 'Aviator Titanium Sunglasses',
    category: 'Fashion',
    price: 1999,
    rating: 4.5,
    ratingCount: 82,
    image: 'assets/images/sunglasses.svg',
    description: 'Classic polarized titanium-frame aviator sunglasses offering 100% UV400 protection and scratch-resistant HD lenses.',
    badge: null,
    inStock: true
  }
];

// State
let filterState = {
  search: '',
  category: 'All',
  priceBracket: 'all', // 'all' | 'under2k' | '2k-5k' | '5k-15k' | 'above15k'
  maxPrice: 100000,
  minRating: 0,
  sortBy: 'default' // 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'
};

let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  initProductsCatalog();
});

/**
 * Initialize Product Catalog Application
 */
function initProductsCatalog() {
  updateCategoryBadges();
  bindProductEvents();
  applyFiltersAndRender();
}

/**
 * Bind Filter, Search & Sort Event Listeners
 */
function bindProductEvents() {
  const searchInput = document.getElementById('productSearch');
  const sortSelect = document.getElementById('productSort');
  const priceSlider = document.getElementById('priceRangeSlider');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const resetEmptyBtn = document.getElementById('resetEmptyBtn');
  const categoryButtons = document.querySelectorAll('.category-filter-btn');
  const priceRadios = document.querySelectorAll('input[name="priceBracket"]');
  const ratingCheckboxes = document.querySelectorAll('input[name="ratingFilter"]');

  // Search input listener (live debounce)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.search = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  // Sort dropdown listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Price range slider listener
  if (priceSlider) {
    const priceDisplay = document.getElementById('maxPriceVal');
    priceSlider.addEventListener('input', (e) => {
      filterState.maxPrice = parseInt(e.target.value, 10);
      if (priceDisplay) {
        priceDisplay.textContent = `₹${filterState.maxPrice.toLocaleString('en-IN')}`;
      }
      // Uncheck price brackets if slider is manipulated directly
      priceRadios.forEach((r) => (r.checked = false));
      filterState.priceBracket = 'all';
      applyFiltersAndRender();
    });
  }

  // Price Bracket Radio buttons
  priceRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      filterState.priceBracket = e.target.value;
      applyFiltersAndRender();
    });
  });

  // Category filter button listeners
  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.category = btn.dataset.category || 'All';
      applyFiltersAndRender();
    });
  });

  // Rating Filter Checkbox listeners
  ratingCheckboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const checkedVals = Array.from(ratingCheckboxes)
        .filter((c) => c.checked)
        .map((c) => parseFloat(c.value));
      filterState.minRating = checkedVals.length > 0 ? Math.min(...checkedVals) : 0;
      applyFiltersAndRender();
    });
  });

  // Clear Filters action
  const resetAll = () => {
    filterState = {
      search: '',
      category: 'All',
      priceBracket: 'all',
      maxPrice: 100000,
      minRating: 0,
      sortBy: 'default'
    };

    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    if (priceSlider) {
      priceSlider.value = '100000';
      const priceDisplay = document.getElementById('maxPriceVal');
      if (priceDisplay) priceDisplay.textContent = '₹1,00,000';
    }

    categoryButtons.forEach((b) => {
      if (b.dataset.category === 'All') b.classList.add('active');
      else b.classList.remove('active');
    });

    priceRadios.forEach((r) => {
      r.checked = r.value === 'all';
    });

    ratingCheckboxes.forEach((c) => (c.checked = false));

    applyFiltersAndRender();
    if (typeof showToast === 'function') {
      showToast('All filters have been reset.', 'success');
    }
  };

  if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAll);
  if (resetEmptyBtn) resetEmptyBtn.addEventListener('click', resetAll);

  // Quick View Modal Close
  const quickViewModal = document.getElementById('quickViewModal');
  if (quickViewModal) {
    document.querySelectorAll('.modal-close-btn').forEach((b) => {
      b.addEventListener('click', () => quickViewModal.classList.remove('active'));
    });
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) quickViewModal.classList.remove('active');
    });
  }
}

/**
 * Calculate & Update category counts in sidebar
 */
function updateCategoryBadges() {
  const counts = { All: PRODUCTS_DATA.length };
  PRODUCTS_DATA.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  document.querySelectorAll('.category-filter-btn').forEach((btn) => {
    const cat = btn.dataset.category;
    const countEl = btn.querySelector('.category-count');
    if (countEl && counts[cat] !== undefined) {
      countEl.textContent = counts[cat];
    }
  });
}

/**
 * Filter and Sort Algorithm (Combined Filters)
 */
function applyFiltersAndRender() {
  let filtered = [...PRODUCTS_DATA];

  // 1. Search Filter (matches name, category, or description)
  if (filterState.search) {
    const q = filterState.search;
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // 2. Category Filter
  if (filterState.category !== 'All') {
    filtered = filtered.filter((p) => p.category === filterState.category);
  }

  // 3. Price Bracket Filter
  if (filterState.priceBracket !== 'all') {
    switch (filterState.priceBracket) {
      case 'under2k':
        filtered = filtered.filter((p) => p.price < 2000);
        break;
      case '2k-5k':
        filtered = filtered.filter((p) => p.price >= 2000 && p.price <= 5000);
        break;
      case '5k-15k':
        filtered = filtered.filter((p) => p.price > 5000 && p.price <= 15000);
        break;
      case 'above15k':
        filtered = filtered.filter((p) => p.price > 15000);
        break;
    }
  } else if (filterState.maxPrice < 100000) {
    // Max price slider constraint
    filtered = filtered.filter((p) => p.price <= filterState.maxPrice);
  }

  // 4. Rating Filter
  if (filterState.minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= filterState.minRating);
  }

  // 5. Sorting Algorithm
  switch (filterState.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'default':
    default:
      // Preserve default order
      break;
  }

  renderProductGrid(filtered);
  renderActiveFilterBadges();
}

/**
 * Render Product Grid
 */
function renderProductGrid(products) {
  const gridContainer = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsResultCount');
  const emptyState = document.getElementById('productsEmptyState');

  if (countLabel) {
    countLabel.textContent = `Showing ${products.length} of ${PRODUCTS_DATA.length} products`;
  }

  if (!gridContainer) return;

  if (products.length === 0) {
    gridContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  gridContainer.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  gridContainer.innerHTML = '';

  products.forEach((prod) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.id = `prod-card-${prod.id}`;

    const formattedPrice = `₹${prod.price.toLocaleString('en-IN')}`;
    const starsHtml = '★'.repeat(Math.floor(prod.rating)) + '☆'.repeat(5 - Math.floor(prod.rating));

    card.innerHTML = `
      <div class="product-thumb-wrap">
        <img src="${prod.image}" alt="${escapeHtml(prod.name)}" loading="lazy">
        <span class="product-cat-tag">${prod.category}</span>
      </div>
      <div class="product-card-body">
        <div class="product-rating" title="${prod.rating} out of 5 stars">
          <span>${starsHtml}</span>
          <span class="product-rating-count">(${prod.rating.toFixed(1)}) • ${prod.ratingCount} reviews</span>
        </div>
        <h3 class="product-title">${escapeHtml(prod.name)}</h3>
        <p class="product-desc">${escapeHtml(prod.description)}</p>
        <div class="product-card-footer">
          <span class="product-price">${formattedPrice}</span>
          <div style="display: flex; gap: 0.4rem;">
            <button type="button" class="btn btn-secondary btn-sm btn-quickview" aria-label="Quick view for ${escapeHtml(prod.name)}">
              View
            </button>
            <button type="button" class="btn btn-primary btn-sm btn-add-cart" aria-label="Add ${escapeHtml(prod.name)} to cart">
              + Cart
            </button>
          </div>
        </div>
      </div>
    `;

    // Button event listeners
    const viewBtn = card.querySelector('.btn-quickview');
    viewBtn.addEventListener('click', () => openQuickView(prod));

    const cartBtn = card.querySelector('.btn-add-cart');
    cartBtn.addEventListener('click', () => addToCart(prod));

    gridContainer.appendChild(card);
  });
}

/**
 * Render active filter indicator tags
 */
function renderActiveFilterBadges() {
  const bar = document.getElementById('activeFiltersBar');
  if (!bar) return;

  const tags = [];

  if (filterState.search) {
    tags.push({ label: `Search: "${filterState.search}"`, clear: () => { filterState.search = ''; document.getElementById('productSearch').value = ''; } });
  }
  if (filterState.category !== 'All') {
    tags.push({ label: `Category: ${filterState.category}`, clear: () => { 
      filterState.category = 'All'; 
      document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.category === 'All'));
    } });
  }
  if (filterState.priceBracket !== 'all') {
    const bracketLabels = {
      under2k: 'Under ₹2,000',
      '2k-5k': '₹2,000 - ₹5,000',
      '5k-15k': '₹5,000 - ₹15,000',
      above15k: 'Above ₹15,000'
    };
    tags.push({ label: `Price: ${bracketLabels[filterState.priceBracket]}`, clear: () => {
      filterState.priceBracket = 'all';
      document.querySelectorAll('input[name="priceBracket"]').forEach(r => r.checked = r.value === 'all');
    } });
  } else if (filterState.maxPrice < 100000) {
    tags.push({ label: `Max Price: ₹${filterState.maxPrice.toLocaleString('en-IN')}`, clear: () => {
      filterState.maxPrice = 100000;
      document.getElementById('priceRangeSlider').value = 100000;
      document.getElementById('maxPriceVal').textContent = '₹1,00,000';
    } });
  }
  if (filterState.minRating > 0) {
    tags.push({ label: `Rating: ${filterState.minRating}+ Stars`, clear: () => {
      filterState.minRating = 0;
      document.querySelectorAll('input[name="ratingFilter"]').forEach(c => c.checked = false);
    } });
  }

  if (tags.length === 0) {
    bar.innerHTML = '';
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';
  bar.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8125rem;">Active Filters:</span>';

  tags.forEach((t) => {
    const pill = document.createElement('span');
    pill.className = 'active-filter-tag';
    pill.innerHTML = `${t.label} <span class="active-filter-remove" role="button" aria-label="Remove filter">&times;</span>`;
    pill.querySelector('.active-filter-remove').addEventListener('click', () => {
      t.clear();
      applyFiltersAndRender();
    });
    bar.appendChild(pill);
  });
}

/**
 * Open Quick View Modal for a product
 */
function openQuickView(prod) {
  const modal = document.getElementById('quickViewModal');
  const title = document.getElementById('qvTitle');
  const cat = document.getElementById('qvCategory');
  const price = document.getElementById('qvPrice');
  const rating = document.getElementById('qvRating');
  const desc = document.getElementById('qvDesc');
  const img = document.getElementById('qvImage');
  const addToCartBtn = document.getElementById('qvAddToCartBtn');

  if (!modal) return;

  if (title) title.textContent = prod.name;
  if (cat) cat.textContent = prod.category;
  if (price) price.textContent = `₹${prod.price.toLocaleString('en-IN')}`;
  if (rating) rating.innerHTML = `★ ${prod.rating.toFixed(1)} (${prod.ratingCount} Customer Reviews)`;
  if (desc) desc.textContent = prod.description;
  if (img) {
    img.src = prod.image;
    img.alt = prod.name;
  }

  if (addToCartBtn) {
    // Clone to remove old listeners
    const newBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
    newBtn.addEventListener('click', () => {
      addToCart(prod);
      modal.classList.remove('active');
    });
  }

  modal.classList.add('active');
}

/**
 * Simulated Add To Cart
 */
function addToCart(prod) {
  cartCount++;
  const badge = document.getElementById('navCartCount');
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = 'inline-block';
  }
  if (typeof showToast === 'function') {
    showToast(`"${prod.name}" added to cart! 🛒`, 'success');
  }
}

/**
 * Utility: HTML Escape
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
