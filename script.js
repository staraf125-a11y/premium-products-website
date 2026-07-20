// Updated product data with image URLs
const bottles = [
  { 
    id:'b1', 
    name:'Iron Grip Bottle', 
    tag:'Bestseller', 
    desc:'1L stainless steel dumbbell bottle with textured grip ends. Keeps drinks cold 24h.', 
    price: 2499,
    img: 'https://picsum.photos/id/1015/400/300'  // Replace with real product photo URL
  },
  // ... similar for others with different picsum IDs or real URLs
];

 // In renderProducts for bottles:
bottleGrid.insertAdjacentHTML('beforeend', `
  <article class="product-card">
    <div class="card-visual">
      <span class="card-tag">${p.tag}</span>
      <img src="${p.img}" alt="${p.name}">
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <ul class="spec-list">
        <li><span>Capacity</span><span>1L</span></li>
        <li><span>Material</span><span>Stainless Steel</span></li>
        <li><span>Insulation</span><span>24h Cold</span></li>
      </ul>
    </div>
    <div class="card-footer">
      <span class="card-price">${money(p.price)}</span>
      <button class="add-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
    </div>
  </article>`);
