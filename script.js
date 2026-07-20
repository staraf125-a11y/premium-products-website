const bottles = [
  {
    id: 'b1',
    name: 'Iron Grip Dumbbell Bottle',
    tag: 'Bestseller',
    desc: '1.5L capacity • Leak-proof • Textured grip • BPA-free',
    price: 2499,
    img: 'assets/Gym Dumbbell Waterbottle.jfif'
  },
  {
    id: 'b2',
    name: 'Hex Series Bottle',
    tag: 'Premium',
    desc: 'Exploded design • 24hr insulation • Heavy-duty build',
    price: 2899,
    img: 'assets/Dumbbell Water Bottle.jfif'
  },
  {
    id: 'b3',
    name: 'Pro Trainer Bottle',
    tag: 'New',
    desc: '1.5L • Multiple angles • Perfect for heavy sessions',
    price: 2599,
    img: 'assets/1pc 1500ml Hohe Kapazität Kunststoff Hantel Geformt Tragbare Wasser Flasche Kreative Fitness Hanteln.jfif'
  }
];

let cart = [];

function money(n) { return 'Rs ' + n.toLocaleString('en-PK'); }

function renderProducts() {
  const bottleGrid = document.getElementById('bottleGrid');
  bottles.forEach(p => {
    bottleGrid.insertAdjacentHTML('beforeend', `
      <article class="product-card">
        <div class="card-visual">
          <span class="card-tag">${p.tag}</span>
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>
        <div class="card-footer">
          <span class="card-price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
        </div>
      </article>
    `);
  });
  // shirts similar...
}

function initCart() {
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const item = {
      name: btn.dataset.name,
      price: parseInt(btn.dataset.price)
    };
    cart.push(item);
    document.getElementById('cartCount').textContent = cart.length;
    showToast(`${item.name} added to cart`);
  });
}

function showCart() {
  // populate modal...
  document.getElementById('cartModal').style.display = 'flex';
}

document.getElementById('cartBtn').addEventListener('click', showCart);

// ... rest of your original init functions (header, reveal, form) remain

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initCart();
  // other inits...
});
