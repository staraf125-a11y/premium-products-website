/* ============ PRODUCT DATA ============ */
const bottleIcon = `
<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="18" rx="20" ry="8" fill="#3A3F49"/>
  <rect x="44" y="24" width="12" height="10" rx="3" fill="#2A2E36"/>
  <rect x="32" y="30" width="36" height="108" rx="14" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.5"/>
  <rect x="36" y="70" width="28" height="64" rx="8" fill="var(--accent)" opacity="0.8"/>
  <rect x="44" y="126" width="12" height="10" rx="3" fill="#2A2E36"/>
  <ellipse cx="50" cy="144" rx="20" ry="8" fill="#3A3F49"/>
</svg>`;

const shirtIcon = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M35 12 L20 24 L26 38 L34 33 L34 88 L66 88 L66 33 L74 38 L80 24 L65 12 Q50 22 35 12 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" opacity="0.55"/>
  <path d="M35 12 Q50 22 65 12" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
</svg>`;

const bottles = [
  { id:'b1', name:'Iron Grip Bottle', tag:'Bestseller', desc:'1L stainless dumbbell bottle with textured steel grip ends.', price: 2499 },
  { id:'b2', name:'Blackout Bottle', tag:'New', desc:'Matte black finish, insulated core, keeps water cold 12h.', price: 2799 },
  { id:'b3', name:'Chrome Series Bottle', tag:'Limited', desc:'Polished chrome plates, 750ml, fits every bag pocket.', price: 2299 },
];

const shirts = [
  { id:'s1', name:'Grind Tee', tag:'Bestseller', desc:'Breathable dry-fit tee, tagless collar, true to size.', price: 1799, colors:['#1B1E24','#F2A93B','#A7ACB6'] },
  { id:'s2', name:'Iron Sleeve Tee', tag:'New', desc:'Compression sleeves, moisture-wicking, built for heavy sets.', price: 1999, colors:['#1B1E24','#565C67'] },
  { id:'s3', name:'Chalk Line Tank', tag:'Summer', desc:'Racerback tank, ultra-light mesh panels for airflow.', price: 1599, colors:['#F2A93B','#1B1E24','#F3F1EB'] },
];

let cartCount = 0;

function money(n){ return 'Rs ' + n.toLocaleString('en-PK'); }

function renderProducts(){
  const bottleGrid = document.getElementById('bottleGrid');
  const shirtGrid = document.getElementById('shirtGrid');
  const productSelect = document.getElementById('productSelect');

  bottles.forEach(p=>{
    bottleGrid.insertAdjacentHTML('beforeend', `
      <article class="product-card">
        <div class="card-visual">
          <span class="card-tag">${p.tag}</span>
          ${bottleIcon}
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>
        <div class="card-footer">
          <span class="card-price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}" data-name="${p.name}">Add to Cart</button>
        </div>
      </article>`);
    productSelect.insertAdjacentHTML('beforeend', `<option value="${p.name}">${p.name} — ${money(p.price)}</option>`);
  });

  shirts.forEach(p=>{
    shirtGrid.insertAdjacentHTML('beforeend', `
      <article class="product-card">
        <div class="card-visual">
          <span class="card-tag">${p.tag}</span>
          ${shirtIcon}
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="swatches" style="margin-top:12px;">
            ${p.colors.map((c,i)=>`<span class="swatch ${i===0?'active':''}" style="background:${c}" data-color="${c}"></span>`).join('')}
          </div>
        </div>
        <div class="card-footer">
          <span class="card-price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}" data-name="${p.name}">Add to Cart</button>
        </div>
      </article>`);
    productSelect.insertAdjacentHTML('beforeend', `<option value="${p.name}">${p.name} — ${money(p.price)}</option>`);
  });
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

/* ============ CART ============ */
function initCart(){
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-btn');
    if(!btn) return;
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    showToast(`${btn.dataset.name} added to cart`);
    setTimeout(()=>{
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1400);
  });

  document.body.addEventListener('click', (e)=>{
    const sw = e.target.closest('.swatch');
    if(!sw) return;
    sw.parentElement.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));
    sw.classList.add('active');
  });
}

/* ============ HEADER + MOBILE NAV ============ */
function initHeader(){
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', ()=>{
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> nav.classList.remove('open'));
  });
}

/* ============ SCROLL REVEAL ============ */
function initReveal(){
  const targets = document.querySelectorAll('.reveal, .product-card, .why-card');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t=> observer.observe(t));
}

/* ============ ORDER FORM ============ */
function initOrderForm(){
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // NOTE: currently this just confirms on-screen.
    // Connect this to your dashboard/backend later to receive real orders.
    console.log('New order:', data);
    showToast(`Thanks ${data.name.split(' ')[0]}! Order received — we'll call to confirm.`);
    form.reset();
  });
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  initCart();
  initHeader();
  initReveal();
  initOrderForm();
});
