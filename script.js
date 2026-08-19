// Product data is kept here so beginners can easily add or edit products.
const products = [
  { name: "Linen Ease Dress", category: "Dresses", price: 3299, tag: "Best seller", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80" },
  { name: "Soleil Woven Bag", category: "Accessories", price: 1899, tag: "New", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80" },
  { name: "Mira Cotton Shirt", category: "Tops", price: 2199, tag: "Limited", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=700&q=80" },
  { name: "Everyday Sandal", category: "Footwear", price: 2799, tag: "Best seller", image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80" },
  { name: "Isla Ribbed Set", category: "Sets", price: 3699, tag: "New", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80" },
  { name: "Cove Mini Bag", category: "Accessories", price: 2499, tag: "New", image: "https://images.unsplash.com/photo-1585488434455-1a0c5dcf3a0a?auto=format&fit=crop&w=700&q=80" },
  { name: "Sunday Wide Leg", category: "Trousers", price: 2999, tag: "New", image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=700&q=80" },
  { name: "Rosie Slide", category: "Footwear", price: 2299, tag: "New", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" }
];

let cartTotal = 0;
let wishlistTotal = 0;
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function makeProductCard(product) {
  return `<article class="product-card">
    <div class="product-image" style="background-image:url('${product.image}')">
      <span class="product-tag">${product.tag}</span>
      <button class="wishlist-button" aria-label="Add ${product.name} to wishlist">♡</button>
      <button class="quick-add" data-product="${product.name}">Add to bag — ${money.format(product.price)}</button>
    </div>
    <div class="product-info"><div><p class="product-name">${product.name}</p><p class="product-category">${product.category}</p></div><p class="product-price">${money.format(product.price)}</p></div>
  </article>`;
}

document.querySelector("#featured-products").innerHTML = products.slice(0, 4).map(makeProductCard).join("");
document.querySelector("#new-products").innerHTML = products.slice(4).map(makeProductCard).join("");

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".quick-add");
  const heartButton = event.target.closest(".wishlist-button");
  if (addButton) {
    cartTotal++;
    document.querySelector(".cart-count").textContent = cartTotal;
    showToast(`${addButton.dataset.product} added to your bag`);
  }
  if (heartButton) {
    const isActive = heartButton.classList.toggle("active");
    heartButton.textContent = isActive ? "♥" : "♡";
    wishlistTotal += isActive ? 1 : -1;
    document.querySelector(".wish-count").textContent = wishlistTotal;
    showToast(isActive ? "Saved to your wishlist" : "Removed from wishlist");
  }
});

const searchPanel = document.querySelector("#search-panel");
document.querySelector(".search-toggle").addEventListener("click", () => searchPanel.classList.toggle("open"));
document.querySelector("#search-button").addEventListener("click", () => {
  const query = document.querySelector("#site-search").value.trim().toLowerCase();
  const results = products.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(query));
  document.querySelector("#search-message").textContent = query ? `${results.length} matching item${results.length === 1 ? "" : "s"} found.` : "Type something to search.";
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-message").textContent = "Thank you — you're on the list!";
  event.target.reset();
});

document.querySelector(".menu-button").addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("mobile-open");
  event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("mobile-open"));
  showToast("Mobile navigation is ready to customise.");
});
