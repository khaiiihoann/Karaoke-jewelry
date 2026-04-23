const SANITY_PROJECT_ID = 'idm6zp0i';
const SANITY_DATASET = 'production';
const SANITY_CDN = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}`;

async function sanityFetch(query) {
  const res = await fetch(`${SANITY_CDN}?query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.result;
}

function sanityImageUrl(imageField, {w, h, fit} = {}) {
  if (!imageField?.asset?._ref) return '';
  const ref = imageField.asset._ref;
  const parts = ref.split('-');
  const format = parts.pop();
  const dimensions = parts.pop();
  const id = parts.slice(1).join('-');
  const base = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
  const params = new URLSearchParams({auto: 'format', q: '85'});
  if (w) params.set('w', w);
  if (h) params.set('h', h);
  if (fit) params.set('fit', fit);
  return `${base}?${params}`;
}

function normalizeProduct(p) {
  return {
    id: p._id,
    name: p.name,
    cat: p.category,
    price: p.price.toLocaleString('vi-VN'),
    sizes: p.sizes || [],
    imgA: p.imageA ? sanityImageUrl(p.imageA, {w: '800'}) : (p.imgA || ''),
    imgB: p.imageB ? sanityImageUrl(p.imageB, {w: '800'}) : (p.imgB || ''),
    description: p.description || '',
    gallery: (p.gallery || []).map(img => sanityImageUrl(img, {w: '1200'})).filter(Boolean),
  };
}

function applySettings(settings) {
  if (!settings) return;

  // Notification bar
  const inner = document.querySelector('.notif-inner');
  if (inner && (settings.notifBarVi || settings.notifBarEn)) {
    const vi = settings.notifBarVi || '';
    const en = settings.notifBarEn || '';
    inner.innerHTML = `<span>${vi}</span><span>&mdash;</span><span>${en}</span><span>&mdash;</span><span>${vi}</span><span>&mdash;</span><span>${en}</span><span>&mdash;</span>`;
  }

  // Instagram URL
  if (settings.instagramUrl) {
    document.querySelectorAll('a[href*="instagram.com"]').forEach(a => { a.href = settings.instagramUrl; });
  }

  // Nav left
  if (settings.navLeft?.length) {
    const navL = document.querySelector('.nav-l');
    if (navL) {
      const current = window.location.pathname.split('/').pop() || 'index.html';
      navL.innerHTML = settings.navLeft.map(item =>
        `<a href="${item.href || '#'}"${item.href && item.href.includes(current) ? ' class="active"' : ''}>${item.label}</a>`
      ).join('');
    }
  }

  // Nav right (skip cart button)
  if (settings.navRight?.length) {
    const navR = document.querySelector('.nav-r');
    if (navR) {
      const cartBtn = navR.querySelector('.cart-btn');
      navR.innerHTML = settings.navRight.map(item =>
        `<a href="${item.href || '#'}"${item.external ? ' target="_blank"' : ''}>${item.label}</a>`
      ).join('') + (cartBtn ? '<span class="nav-sep">|</span>' : '');
      if (cartBtn) navR.appendChild(cartBtn);
    }
  }

  // Footer links
  if (settings.footerLinks?.length) {
    document.querySelectorAll('.footer-links').forEach(el => {
      el.innerHTML = settings.footerLinks.map(item =>
        `<a href="${item.href || '#'}">${item.label}</a>`
      ).join('');
    });
  }

  // Hero image (index.html only)
  if (settings.heroImage || settings.heroImageUrl) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const url = settings.heroImage ? sanityImageUrl(settings.heroImage) : settings.heroImageUrl;
      if (url) hero.style.backgroundImage = `url('${url}')`;
    }
  }
}
