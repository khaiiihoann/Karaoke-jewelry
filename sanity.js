const SANITY_PROJECT_ID = 'idm6zp0i';
const SANITY_DATASET = 'production';
const SANITY_CDN = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}`;
const USD_RATE = 27000;

// ── Language ──────────────────────────────────────────────────────────────────
let _lang = localStorage.getItem('kj_lang') || 'vi';
let _notifVi = '', _notifEn = '';
let _footerLinks = null;
let _navLeftItems = null;

function getLang() { return _lang; }

function setLang(l) {
  _lang = l;
  localStorage.setItem('kj_lang', l);
  document.documentElement.dataset.lang = l;
  document.querySelectorAll('[data-vi][data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + l);
  });
  updateNotifBar();
  if (_navLeftItems) _applyNavLeft(_navLeftItems);
  if (_footerLinks) _applyFooterLinks(_footerLinks);
  window.dispatchEvent(new CustomEvent('langchange', {detail: l}));
}

function toggleLang() { setLang(_lang === 'vi' ? 'en' : 'vi'); }

function initLang() {
  document.documentElement.dataset.lang = _lang;
  document.querySelectorAll('[data-vi][data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + _lang);
  });
}

// ── Price ─────────────────────────────────────────────────────────────────────
function formatPrice(priceVND) {
  if (!priceVND && priceVND !== 0) return '';
  if (_lang === 'en') return '$' + Math.round(priceVND / USD_RATE);
  return priceVND.toLocaleString('vi-VN') + ' ₫';
}

// ── Sanity fetch ──────────────────────────────────────────────────────────────
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

const _CAT_EN = {'Nhẫn':'Ring','Bông tai':'Earrings','Dây Chuyền':'Necklace','Vòng Tay':'Bracelet','Charm':'Charm'};
function _autoNameEn(name, cat) {
  const en = _CAT_EN[cat];
  if (!en) return name;
  if (name.startsWith(cat + ' ')) return name.slice(cat.length + 1) + ' ' + en;
  if (name.endsWith(' ' + cat)) return name.slice(0, -(cat.length + 1)) + ' ' + en;
  return name + ' ' + en;
}

function normalizeProduct(p) {
  const name = (_lang === 'en' && p.name_en) ? p.name_en :
               (_lang === 'en') ? _autoNameEn(p.name, p.category) : p.name;
  const description = (_lang === 'en' && p.description_en) ? p.description_en : (p.description || '');
  return {
    id: p._id,
    name,
    cat: p.category,
    price: formatPrice(p.price),
    priceRaw: p.price,
    sizes: p.sizes || [],
    imgA: p.imageA ? sanityImageUrl(p.imageA, {w: '800'}) : (p.imgA || ''),
    imgB: p.imageB ? sanityImageUrl(p.imageB, {w: '800'}) : (p.imgB || ''),
    description,
    gallery: (p.gallery || []).map(img => sanityImageUrl(img, {w: '1200'})).filter(Boolean),
  };
}

// ── Notif bar ─────────────────────────────────────────────────────────────────
function updateNotifBar() {
  const inner = document.querySelector('.notif-inner');
  if (!inner) return;
  const text = (_lang === 'en' ? _notifEn : _notifVi) || _notifVi || _notifEn;
  if (text) inner.innerHTML = `<span>${text}</span><span>&mdash;</span><span>${text}</span><span>&mdash;</span><span>${text}</span><span>&mdash;</span>`;
}

// ── Nav left ──────────────────────────────────────────────────────────────────
function _applyNavLeft(items) {
  _navLeftItems = items;
  const navL = document.querySelector('.nav-l');
  if (!navL) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navL.innerHTML = items.map(item => {
    const label = (_lang === 'en' && item.label_en) ? item.label_en : item.label;
    const isActive = item.href && item.href.includes(current);
    return `<a href="${item.href || '#'}"${isActive ? ' class="active"' : ''}>${label}</a>`;
  }).join('');
}

// ── Footer links ──────────────────────────────────────────────────────────────
function _applyFooterLinks(links) {
  document.querySelectorAll('.footer-links').forEach(el => {
    el.innerHTML = links.map(item => {
      const label = (_lang === 'en' && item.label_en) ? item.label_en : item.label;
      return `<a href="${item.href || '#'}">${label}</a>`;
    }).join('');
  });
}

// ── Settings ──────────────────────────────────────────────────────────────────
function applySettings(settings) {
  if (!settings) return;

  if (settings.notifBarVi || settings.notifBarEn) {
    _notifVi = settings.notifBarVi || '';
    _notifEn = settings.notifBarEn || '';
    updateNotifBar();
  }

  if (settings.instagramUrl) {
    document.querySelectorAll('a[href*="instagram.com"]').forEach(a => { a.href = settings.instagramUrl; });
  }

  if (settings.navLeft?.length) {
    _applyNavLeft(settings.navLeft);
  }

  if (settings.navRight?.length) {
    const navR = document.querySelector('.nav-r');
    if (navR) {
      const cartBtn = navR.querySelector('.cart-btn');
      navR.innerHTML = '';

      const lb = document.createElement('button');
      lb.className = 'lang-btn';
      lb.onclick = toggleLang;
      lb.innerHTML = '<span class="lang-vi">VI</span>·<span class="lang-en">EN</span>';
      navR.appendChild(lb);

      const lsep = document.createElement('span');
      lsep.className = 'nav-sep';
      lsep.textContent = '|';
      navR.appendChild(lsep);

      settings.navRight.forEach(item => {
        const a = document.createElement('a');
        a.href = item.href || '#';
        if (item.external) a.target = '_blank';
        a.textContent = item.label;
        navR.appendChild(a);
      });

      if (cartBtn) {
        const sep = document.createElement('span');
        sep.className = 'nav-sep';
        sep.textContent = '|';
        navR.appendChild(sep);
        navR.appendChild(cartBtn);
      }
    }
  }

  if (settings.footerLinks?.length) {
    _footerLinks = settings.footerLinks;
    _applyFooterLinks(settings.footerLinks);
  }

  if (settings.heroImage || settings.heroImageUrl) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const url = settings.heroImage ? sanityImageUrl(settings.heroImage) : settings.heroImageUrl;
      if (url) hero.style.backgroundImage = `url('${url}')`;
    }
  }
}
