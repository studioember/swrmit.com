(function () {
  'use strict';

  var BRAND_SOLUTIONS = [
    { slug: 'music-entertainment',  label: 'Music & Entertainment' },
    { slug: 'ecommerce-retail',     label: 'Ecommerce & Retail' },
    { slug: 'gaming-esports',       label: 'Gaming & Esports' },
    { slug: 'events-festivals',     label: 'Events & Festivals' },
    { slug: 'creators-influencers', label: 'Creators & Influencers' },
    { slug: 'tech-apps',            label: 'Tech & Apps' },
    { slug: 'sports-fitness',       label: 'Sports & Fitness' },
  ];

  var SWRMERS_LINKS = [
    { href: '/solutions/swrmers',              label: 'Overview',     desc: 'Get paid to create buzz' },
    { href: '/solutions/swrmers/how-it-works', label: 'How It Works', desc: 'Your 7-step earning flow' },
    { href: '/solutions/swrmers/ways-to-earn', label: 'Ways to Earn', desc: 'Follow, like, share & more' },
    { href: '/solutions/swrmers/task-types',   label: 'Task Types',   desc: 'Social, video, local & more' },
    { href: '/solutions/swrmers/campaigns',    label: 'Campaigns',    desc: 'Live campaign examples' },
    { href: '/solutions/swrmers/payouts',      label: 'Payouts',      desc: 'Rates, timing & trust' },
  ];

  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var isHome = path === '/' || path === '/index.html';
  var isProduct = path === '/product';
  var isSolBrandsActive = path.startsWith('/solutions/brands');
  var isSolSwrmersActive = path.startsWith('/solutions/swrmers');
  var isSolActive = path.startsWith('/solutions');

  function matches(href, exact) {
    var h = href.replace(/\/$/, '') || '/';
    if (exact) return path === h;
    return path === h || (h !== '/' && path.startsWith(h + '/'));
  }

  var CSS = [
    /* ── Desktop nav items ── */
    '.mn-lnk{font-size:14px;color:#737373;text-decoration:none;transition:color .15s}',
    '.mn-lnk:hover,.mn-lnk--active{color:#f5f5f5}',
    /* stretch trigger to full header height → eliminates the gap between button and panel */
    '.mn-trig{display:flex;align-items:center;align-self:stretch;cursor:default}',
    '.mn-btn{display:flex;align-items:center;gap:5px;font-size:14px;font-family:inherit;color:#737373;background:none;border:none;cursor:pointer;padding:0;transition:color .15s}',
    '.mn-btn:hover,.mn-btn--active{color:#f5f5f5}',
    '.mn-chev{flex-shrink:0;transition:transform .2s ease}',
    '.mn-btn[aria-expanded="true"] .mn-chev{transform:rotate(180deg)}',
    '.mn-btn[aria-expanded="true"]{color:#f5f5f5}',

    /* ── Desktop mega panel ── */
    /* top:55px = 1px overlap with header border, zero pixel gap */
    '#mn-panel{position:fixed;top:55px;left:0;right:0;z-index:45;transition:opacity .2s ease,transform .2s ease,visibility .2s}',
    '#mn-panel[hidden]{opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-5px);display:block!important}',
    '#mn-panel:not([hidden]){opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}',
    '.mnp-wrap{max-width:760px;margin:0 auto;padding:0 20px}',
    '.mnp-box{background:#0f0f0f;border:1px solid #222;border-top:none;border-radius:0 0 16px 16px;box-shadow:0 24px 48px rgba(0,0,0,.75),0 0 0 1px rgba(197,227,9,.04);overflow:hidden}',
    '.mnp-accent{height:1px;background:linear-gradient(90deg,transparent,rgba(197,227,9,.4),transparent)}',
    '.mnp-grid{display:grid;grid-template-columns:1fr 200px;padding:22px 24px 24px;gap:0}',

    /* ── Panel: section headings (shared) ── */
    '.mnp-col-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.16em;color:#f5f5f5;display:block;margin-bottom:3px}',
    '.mnp-col-desc{font-size:12px;color:#4a4a4a;line-height:1.4;margin-bottom:14px}',

    /* ── Panel: unified item style (both columns) ── */
    '.mnp-item{display:block;padding:7px 9px;border-radius:8px;font-size:13px;color:#888;text-decoration:none;transition:background .1s,color .1s;white-space:nowrap;line-height:1.3}',
    '.mnp-item:hover{background:rgba(255,255,255,.05);color:#d5d5d5}',
    '.mnp-item--on{color:#C5E309}',

    /* ── Panel: For Brands column extras ── */
    '.mnp-sol-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px}',
    '.mnp-all{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:500;color:#C5E309;text-decoration:none;margin-top:12px;padding:0 9px;transition:opacity .12s}',
    '.mnp-all:hover{opacity:.75;text-decoration:underline}',

    /* ── Panel: For Swrmers column extras ── */
    '.mnp-swrm-col{padding-left:22px;border-left:1px solid #2a2a2a}',

    /* ── Mobile hamburger ── */
    '.mn-ham{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:none;border:none;cursor:pointer;color:#888;transition:color .15s,background .15s;flex-shrink:0}',
    '.mn-ham:hover{color:#f5f5f5;background:rgba(255,255,255,.06)}',
    '@media(min-width:768px){.mn-ham{display:none}}',

    /* ── Mobile drawer ── */
    '#mn-drawer{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;background:#090909;transition:opacity .22s ease,transform .22s ease,visibility .22s}',
    '#mn-drawer[hidden]{opacity:0;visibility:hidden;pointer-events:none;transform:translateX(6%);display:flex!important}',
    '#mn-drawer:not([hidden]){opacity:1;visibility:visible;pointer-events:auto;transform:translateX(0)}',
    '.mnd-head{display:flex;align-items:center;justify-content:space-between;height:56px;padding:0 20px;border-bottom:1px solid #181818;flex-shrink:0}',
    '.mnd-close{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:none;border:1px solid #252525;cursor:pointer;color:#666;transition:all .15s}',
    '.mnd-close:hover{color:#f5f5f5;border-color:#383838}',
    '.mnd-body{flex:1;overflow-y:auto;padding:8px 0 24px}',
    '.mnd-item{display:flex;align-items:center;justify-content:space-between;width:100%;padding:13px 20px;font-size:15px;font-weight:500;color:#bbb;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit;text-decoration:none;transition:color .15s}',
    '.mnd-item:hover,.mnd-item--on{color:#f5f5f5}',
    '.mnd-chev{flex-shrink:0;transition:transform .2s ease}',
    '.mnd-item[aria-expanded="true"] .mnd-chev{transform:rotate(180deg)}',
    '.mnd-sub{overflow:hidden;height:0;transition:height .25s ease}',
    '.mnd-sub-label{padding:10px 20px 4px 28px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.16em;color:#333}',
    '.mnd-link{display:block;padding:10px 20px 10px 32px;font-size:14px;color:#666;text-decoration:none;transition:color .15s}',
    '.mnd-link:hover{color:#ddd}',
    '.mnd-link--on{color:#C5E309}',
    '.mnd-link--overview{color:#999;font-weight:500}',
    '.mnd-foot{padding:16px 20px 24px;border-top:1px solid #181818;display:flex;flex-direction:column;gap:8px;flex-shrink:0}',
    '.mnd-cta-sec{display:block;text-align:center;padding:13px;border:1px solid #252525;border-radius:10px;font-size:14px;font-weight:500;color:#888;text-decoration:none;transition:all .15s}',
    '.mnd-cta-sec:hover{border-color:#383838;color:#f5f5f5}',
    '.mnd-cta-pri{display:block;text-align:center;padding:13px;background:#C5E309;border-radius:10px;font-size:14px;font-weight:600;color:#090909;text-decoration:none;transition:opacity .15s}',
    '.mnd-cta-pri:hover{opacity:.88}',
  ].join('');

  var chevD = '<svg class="mn-chev" width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var mobChevD = '<svg class="mnd-chev" width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ── Build desktop brand items ── */
  var col1 = '', col2 = '';
  BRAND_SOLUTIONS.forEach(function (s, i) {
    var href = '/solutions/brands/' + s.slug;
    var cls = 'mnp-item' + (matches(href) ? ' mnp-item--on' : '');
    var a = '<a href="' + href + '" class="' + cls + '">' + s.label + '</a>';
    if (i < 4) { col1 += a; } else { col2 += a; }
  });

  /* ── Build desktop swrmers items ── */
  var swrmDesktop = SWRMERS_LINKS.map(function (p) {
    var cls = 'mnp-item' + (matches(p.href, true) ? ' mnp-item--on' : '');
    return '<a href="' + p.href + '" class="' + cls + '">' + p.label + '</a>';
  }).join('');

  /* ── Build mobile items ── */
  var mobBrandLinks = '<a href="/solutions/brands" class="mnd-link mnd-link--overview'
    + (path === '/solutions/brands' ? ' mnd-link--on' : '') + '">All Brand Solutions</a>'
    + BRAND_SOLUTIONS.map(function (s) {
      var href = '/solutions/brands/' + s.slug;
      return '<a href="' + href + '" class="mnd-link' + (matches(href) ? ' mnd-link--on' : '') + '">' + s.label + '</a>';
    }).join('');

  var mobSwrmLinks = SWRMERS_LINKS.map(function (p) {
    return '<a href="' + p.href + '" class="mnd-link' + (matches(p.href, true) ? ' mnd-link--on' : '') + '">' + p.label + '</a>';
  }).join('');

  /* ── Mega panel HTML ── */
  var panelHTML = '<div id="mn-panel" hidden>'
    + '<div class="mnp-wrap"><div class="mnp-box">'
    + '<div class="mnp-accent"></div>'
    + '<div class="mnp-grid">'
    + '<div>'
    + '<span class="mnp-col-label">For Brands</span>'
    + '<span class="mnp-col-desc">Launch campaigns that drive social buzz and real engagement.</span>'
    + '<div class="mnp-sol-grid"><div>' + col1 + '</div><div>' + col2 + '</div></div>'
    + '<a href="/solutions/brands" class="mnp-all">All Brand Solutions →</a>'
    + '</div>'
    + '<div class="mnp-swrm-col">'
    + '<span class="mnp-col-label">For Swrmers</span>'
    + '<span class="mnp-col-desc">Earn money completing social tasks.</span>'
    + swrmDesktop
    + '</div>'
    + '</div></div></div></div>';

  /* ── Mobile drawer HTML ── */
  var drawerHTML = '<div id="mn-drawer" hidden>'
    + '<div class="mnd-head">'
    + '<a href="/" aria-label="Swrm home"><img src="/assets/logo-full.svg" alt="Swrm" width="72" height="23"></a>'
    + '<button class="mnd-close" id="mn-close" aria-label="Close menu"><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 2.5l10 10M12.5 2.5l-10 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>'
    + '</div>'
    + '<div class="mnd-body">'
    + '<button class="mnd-item' + (isSolActive ? ' mnd-item--on' : '') + '" id="mn-m-sol" aria-expanded="false">'
    + 'Solutions' + mobChevD + '</button>'
    + '<div class="mnd-sub" id="mn-m-sol-sub">'
    + '<button class="mnd-item' + (isSolBrandsActive ? ' mnd-item--on' : '') + '" id="mn-m-brands" aria-expanded="false" style="padding-left:28px;font-size:14px">'
    + 'For Brands' + mobChevD + '</button>'
    + '<div class="mnd-sub" id="mn-m-brands-sub">' + mobBrandLinks + '</div>'
    + '<button class="mnd-item' + (isSolSwrmersActive ? ' mnd-item--on' : '') + '" id="mn-m-swrm" aria-expanded="false" style="padding-left:28px;font-size:14px">'
    + 'For Swrmers' + mobChevD + '</button>'
    + '<div class="mnd-sub" id="mn-m-swrm-sub">' + mobSwrmLinks + '</div>'
    + '</div>'
    + '<a href="/product" class="mnd-item' + (isProduct ? ' mnd-item--on' : '') + '" style="text-decoration:none">Product</a>'
    + '<a href="/pricing" class="mnd-item" style="text-decoration:none">Pricing</a>'
    + '</div>'
    + '<div class="mnd-foot">'
    + '<a href="https://lets.swrmit.com/login" class="mnd-cta-sec">Log in</a>'
    + '<a href="https://lets.swrmit.com/signup" class="mnd-cta-pri">Get started — it\'s free</a>'
    + '</div>'
    + '</div>';

  /* ── Desktop nav HTML ── */
  var navHTML = '<div class="mn-trig">'
    + '<button class="mn-btn' + (isSolActive ? ' mn-btn--active' : '') + '" id="mn-btn" aria-expanded="false" aria-haspopup="true">'
    + 'Solutions ' + chevD
    + '</button>'
    + '</div>'
    + '<a href="/product" class="mn-lnk' + (isProduct ? ' mn-lnk--active' : '') + '">Product</a>'
    + '<a href="/pricing" class="mn-lnk">Pricing</a>';

  function accordion(btnId, subId) {
    var b = document.getElementById(btnId);
    var s = document.getElementById(subId);
    if (!b || !s) return;
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      if (open) {
        s.style.height = s.scrollHeight + 'px';
        requestAnimationFrame(function () { requestAnimationFrame(function () { s.style.height = '0'; }); });
        b.setAttribute('aria-expanded', 'false');
      } else {
        s.style.height = s.scrollHeight + 'px';
        s.addEventListener('transitionend', function fn() { s.style.height = 'auto'; s.removeEventListener('transitionend', fn); });
        b.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function autoExpand(btnId, subId) {
    var b = document.getElementById(btnId);
    var s = document.getElementById(subId);
    if (b && s) { s.style.height = 'auto'; b.setAttribute('aria-expanded', 'true'); }
  }

  function init() {
    var styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    var nav = document.querySelector('header nav');
    if (nav) nav.innerHTML = navHTML;

    var actions = document.querySelector('header .flex.items-center.gap-2');
    if (actions) {
      var ham = document.createElement('button');
      ham.className = 'mn-ham';
      ham.id = 'mn-ham';
      ham.setAttribute('aria-label', 'Open menu');
      ham.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
      actions.appendChild(ham);
    }

    var tmp = document.createElement('div');
    tmp.innerHTML = panelHTML + drawerHTML;
    while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

    var panel = document.getElementById('mn-panel');
    var btn   = document.getElementById('mn-btn');
    var trig  = document.querySelector('.mn-trig');
    var drawer = document.getElementById('mn-drawer');
    var hamBtn = document.getElementById('mn-ham');
    var closeBtn = document.getElementById('mn-close');
    var t;

    function openPanel()  { clearTimeout(t); panel.removeAttribute('hidden'); btn.setAttribute('aria-expanded', 'true'); }
    function closePanel() { panel.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', 'false'); }
    function sched()      { t = setTimeout(closePanel, 250); }
    function unsched()    { clearTimeout(t); }

    if (trig && panel && btn) {
      trig.addEventListener('mouseenter', openPanel);
      trig.addEventListener('mouseleave', sched);
      panel.addEventListener('mouseenter', unsched);
      panel.addEventListener('mouseleave', sched);
      btn.addEventListener('click', function () { panel.hasAttribute('hidden') ? openPanel() : closePanel(); });
    }

    function openDrawer()  { drawer.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; }
    function closeDrawer() { drawer.setAttribute('hidden', ''); document.body.style.overflow = ''; }

    if (hamBtn)  hamBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    accordion('mn-m-sol',    'mn-m-sol-sub');
    accordion('mn-m-brands', 'mn-m-brands-sub');
    accordion('mn-m-swrm',   'mn-m-swrm-sub');

    if (isSolActive)         autoExpand('mn-m-sol',    'mn-m-sol-sub');
    if (isSolBrandsActive)   autoExpand('mn-m-brands', 'mn-m-brands-sub');
    if (isSolSwrmersActive)  autoExpand('mn-m-swrm',   'mn-m-swrm-sub');

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closePanel(); closeDrawer(); } });
    document.addEventListener('click', function (e) {
      if (panel && !panel.hasAttribute('hidden') && !panel.contains(e.target) && trig && !trig.contains(e.target)) closePanel();
    });
  }

  init();
})();
