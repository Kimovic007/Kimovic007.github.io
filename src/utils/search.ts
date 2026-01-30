// Types for search data
export interface Article {
  title: string;
  description: string;
  slug: string;
  collection: string;
  heroImage: string;
}

export interface Product {
  name: string;
  description: string;
  features: string[];
  category: string;
  categoryId: string;
  link: string;
  image: string;
  price: string;
}

export interface SearchData {
  articles: Article[];
  products: Product[];
}

// Extend Window interface
declare global {
  interface Window {
    __searchData: SearchData;
    __openSearchModal?: () => void;
  }
}

// Utility functions
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = escapeRegex(query);
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark style="background-color: rgba(212, 175, 55, 0.3); border-radius: 2px; padding: 0 2px;">$1</mark>');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Search result rendering
function renderArticleResult(article: Article, query: string, index: number): string {
  return `
    <a 
      href="/blog/${article.slug}" 
      class="search-result flex items-start gap-3 p-3 rounded-xl transition-colors group"
      style="color: var(--color-slate-grey);"
      data-index="${index}"
    >
      <img 
        src="${article.heroImage}" 
        alt="" 
        class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <h4 class="font-medium transition-colors" style="color: var(--color-forest-green);">
          ${highlightMatch(article.title, query)}
        </h4>
        <p class="text-sm mt-0.5 line-clamp-1" style="color: var(--color-slate-grey);">
          ${highlightMatch(truncate(article.description, 80), query)}
        </p>
        <span class="text-xs mt-1 inline-block capitalize" style="color: var(--color-warm-taupe);">${article.collection.replace('-', ' ')}</span>
      </div>
      <svg class="w-5 h-5 flex-shrink-0 mt-1" style="color: var(--color-warm-taupe);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </a>
  `;
}

function renderProductResult(product: Product, query: string, index: number): string {
  return `
    <a 
      href="${product.link}" 
      target="_blank"
      rel="noopener noreferrer"
      class="search-result flex items-start gap-3 p-3 rounded-xl transition-colors group"
      style="color: var(--color-slate-grey);"
      data-index="${index}"
    >
      <img 
        src="${product.image}" 
        alt="" 
        class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        style="background-color: var(--color-alabaster);"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <h4 class="font-medium transition-colors" style="color: var(--color-forest-green);">
          ${highlightMatch(product.name, query)}
        </h4>
        <p class="text-sm mt-0.5 line-clamp-1" style="color: var(--color-slate-grey);">
          ${highlightMatch(truncate(product.description, 80), query)}
        </p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-sm font-semibold" style="color: var(--color-champagne);">${product.price}</span>
          <span class="text-xs" style="color: var(--color-warm-taupe);">${product.category}</span>
        </div>
      </div>
      <svg class="w-5 h-5 flex-shrink-0 mt-1" style="color: var(--color-warm-taupe);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
    </a>
  `;
}

// DOM element references
interface SearchElements {
  overlay: HTMLElement;
  modal: HTMLElement;
  input: HTMLInputElement;
  closeBtn: HTMLElement;
  initialState: HTMLElement | null;
  emptyState: HTMLElement | null;
  queryDisplay: HTMLElement | null;
  articlesSection: HTMLElement | null;
  articlesList: HTMLElement | null;
  productsSection: HTMLElement | null;
  productsList: HTMLElement | null;
}

function getSearchElements(): SearchElements | null {
  const overlay = document.getElementById('search-overlay');
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  const closeBtn = document.getElementById('search-close');

  if (!overlay || !modal || !input || !closeBtn) return null;

  return {
    overlay,
    modal,
    input,
    closeBtn,
    initialState: document.getElementById('search-initial'),
    emptyState: document.getElementById('search-empty'),
    queryDisplay: document.getElementById('search-query-display'),
    articlesSection: document.getElementById('search-articles'),
    articlesList: document.getElementById('search-articles-list'),
    productsSection: document.getElementById('search-products'),
    productsList: document.getElementById('search-products-list'),
  };
}

// Main search setup function
export function setupSearch(): void {
  const elements = getSearchElements();
  if (!elements) return;

  const { 
    overlay, modal, input, closeBtn,
    initialState, emptyState, queryDisplay,
    articlesSection, articlesList, productsSection, productsList 
  } = elements;

  const { articles, products } = window.__searchData;
  let debounceTimer: ReturnType<typeof setTimeout>;
  let selectedIndex = -1;

  function openModal(): void {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    input.value = '';
    input.focus();
    resetResults();
  }

  function closeModal(): void {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    selectedIndex = -1;
  }

  function resetResults(): void {
    initialState?.classList.remove('hidden');
    emptyState?.classList.add('hidden');
    articlesSection?.classList.add('hidden');
    productsSection?.classList.add('hidden');
    if (articlesList) articlesList.innerHTML = '';
    if (productsList) productsList.innerHTML = '';
    selectedIndex = -1;
  }

  function search(query: string): void {
    const q = query.toLowerCase().trim();

    if (!q) {
      resetResults();
      return;
    }

    initialState?.classList.add('hidden');

    // Search articles
    const matchedArticles = articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q)
      );
    }).slice(0, 5);

    // Search products
    const matchedProducts = products.filter((product) => {
      const featuresText = product.features.join(' ').toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        featuresText.includes(q)
      );
    }).slice(0, 5);

    const hasResults = matchedArticles.length > 0 || matchedProducts.length > 0;

    if (!hasResults) {
      emptyState?.classList.remove('hidden');
      articlesSection?.classList.add('hidden');
      productsSection?.classList.add('hidden');
      if (queryDisplay) queryDisplay.textContent = query;
      return;
    }

    emptyState?.classList.add('hidden');

    // Render articles
    if (matchedArticles.length > 0 && articlesList && articlesSection) {
      articlesSection.classList.remove('hidden');
      articlesList.innerHTML = matchedArticles
        .map((article, index) => renderArticleResult(article, query, index))
        .join('');
    } else {
      articlesSection?.classList.add('hidden');
    }

    // Render products
    if (matchedProducts.length > 0 && productsList && productsSection) {
      productsSection.classList.remove('hidden');
      productsList.innerHTML = matchedProducts
        .map((product, index) => renderProductResult(product, query, matchedArticles.length + index))
        .join('');
    } else {
      productsSection?.classList.add('hidden');
    }

    selectedIndex = -1;
  }

  function updateSelection(results: NodeListOf<Element>): void {
    results.forEach((el, i) => {
      if (i === selectedIndex) {
        el.classList.add('bg-gray-100');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('bg-gray-100');
      }
    });
  }

  // Input handler with debounce
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      search(input.value);
    }, 150);
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Keyboard navigation
  function handleKeydown(e: KeyboardEvent): void {
    // Cmd/Ctrl + K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('hidden')) {
        openModal();
      } else {
        closeModal();
      }
      return;
    }

    // Only handle these when modal is open
    if (modal.classList.contains('hidden')) return;

    // Escape to close
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    // Arrow navigation
    const results = document.querySelectorAll('.search-result');
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(results);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex] as HTMLAnchorElement;
      if (selected) {
        closeModal();
        selected.click();
      }
    }
  }

  document.addEventListener('keydown', handleKeydown);

  // Expose openModal for search buttons
  window.__openSearchModal = openModal;
}

// Initialize search
export function initSearch(): void {
  setupSearch();
  document.addEventListener('astro:page-load', setupSearch);
}
