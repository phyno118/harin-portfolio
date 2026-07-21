const products = [
  ['Misty Linen', '공기처럼 가볍게 스며드는 깨끗함', '₩32,000', 'misty-linen.webp', 32000],
  ['Pure Light', '매일의 공간을 맑게 정리하는 향', '₩32,000', 'pure-light.webp', 32000],
  ['Blossom Hug', '은은하게 감싸는 부드러운 플로럴', '₩32,000', 'blossom-hug.webp', 32000],
  ['Forest Dew', '차분한 숲의 공기를 닮은 향', '₩35,000', 'forest-dew.webp', 35000],
  ['Berry Warm', '달지 않게 남는 따뜻한 잔향', '₩35,000', 'berry-warm.webp', 35000],
  ['Calm Tear', '고요한 공기처럼 정돈된 향', '₩35,000', 'calm-tear.webp', 35000],
  ['Violet Dusk', '해 질 녘의 부드러운 잔향', '₩38,000', 'violet-dusk.webp', 38000],
  ['Brown Silence', '잔잔한 우디 향', '₩38,000', 'brown-silence.webp', 38000],
  ['Black Silence', '어두운 고요가 오래 머무는 향', '₩38,000', 'black-silence.webp', 38000]
];

function productCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.dataset.category = 'candle';
  card.innerHTML = `<div class="product-image"><img src="assets/${product[3]}" alt="${product[0]} 캔들"></div><div class="product-info"><div><h3>${product[0]}</h3><p>${product[1]}</p></div><button class="add-to-cart" data-product="${product[0]}" data-price="${product[4]}">${product[2]}</button></div>`;
  return card;
}

document.querySelector('#featured-product').append(productCard(products[0]));
const grid = document.querySelector('#product-grid');
products.slice(1).forEach(product => grid.append(productCard(product)));

const reveal = () => document.querySelectorAll('.reveal:not(.visible)').forEach(element => {
  if (element.getBoundingClientRect().top < innerHeight * .9) element.classList.add('visible');
});
addEventListener('scroll', reveal, { passive: true });
reveal();

document.querySelector('#more-button').addEventListener('click', () => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('[data-category]').forEach(item => item.classList.toggle('hidden', button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter));
  document.querySelector('#more-button').classList.toggle('hidden', button.dataset.filter !== 'all');
}));

const cart = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const items = document.querySelector('.cart-items');
let bag = [];
function openCart() { cart.classList.add('open'); overlay.classList.add('show'); cart.setAttribute('aria-hidden', 'false'); }
function closeCart() { cart.classList.remove('open'); overlay.classList.remove('show'); cart.setAttribute('aria-hidden', 'true'); }
function drawCart() {
  items.innerHTML = bag.length ? bag.map(item => `<div class="cart-line"><span>${item.name}</span><strong>₩${item.price.toLocaleString()}</strong></div>`).join('') : '<p class="cart-empty">아직 담긴 제품이 없습니다.</p>';
  document.querySelector('[data-cart-count]').textContent = bag.length;
  document.querySelector('[data-cart-total]').textContent = `₩${bag.reduce((sum, item) => sum + item.price, 0).toLocaleString()}`;
}
document.addEventListener('click', event => {
  const add = event.target.closest('.add-to-cart');
  if (add) { bag.push({ name: add.dataset.product, price: Number(add.dataset.price || 68000) }); drawCart(); openCart(); }
});
document.querySelector('.bag-button').addEventListener('click', openCart);
document.querySelector('.cart-close').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

const menu = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
menu.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => menu.classList.remove('open')));
