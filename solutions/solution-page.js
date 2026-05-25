(function () {
  var slug = window.SOLUTION_SLUG;
  var content = document.getElementById('page-content');

  var s = (window.SOLUTIONS || []).find(function (x) { return x.slug === slug; });

  if (!s) {
    content.innerHTML = '<div class="py-40 text-center text-muted">Solution not found.</div>';
    return;
  }

  document.title = s.metaTitle;
  var descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', s.metaDescription);

  content.innerHTML = hero(s) + useCases(s) + exampleTasks(s) + whyItWorks(s) + campaignExamples(s) + cta();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  function hero(s) {
    var heroImages = {
      'music-entertainment': 'hero-bee-music.png',
      'ecommerce-retail': 'hero-bee-ecommerce.png',
      'gaming-esports': 'hero-bee-gaming.png',
      'events-festivals': 'hero-bee-events.png',
      'creators-influencers': 'hero-bee-creators.png',
      'tech-apps': 'hero-bee-tech.png',
      'sports-fitness': 'hero-bee-sports.png'
    };
    var img = heroImages[s.slug] || 'hero-bee-megaphone.png';
    return '<section class="relative overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-28 min-h-[660px] sm:min-h-[820px]">'
      + '<img src="/assets/' + img + '" class="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none" style="opacity:0.13;" alt="" aria-hidden="true">'
      + '<div class="absolute inset-0 grid-bg opacity-50 pointer-events-none"></div>'
      + '<div class="absolute inset-0 hero-glow pointer-events-none"></div>'
      + '<div class="relative max-w-6xl mx-auto px-4 sm:px-6">'
      + '<div class="reveal max-w-3xl">'
      + '<p class="text-xs uppercase tracking-[0.25em] text-primary mb-4">' + s.eyebrow + '</p>'
      + '<h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]">'
      + '<span class="text-glow">' + s.headline + '</span>'
      + '</h1>'
      + '<p class="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">' + s.subheadline + '</p>'
      + '<div class="mt-10 flex flex-wrap gap-3">'
      + '<a href="https://lets.swrmit.com/signup" class="btn-primary bg-primary text-bg px-6 py-3.5 rounded-lg font-semibold hover:bg-primary-hover transition-all">Run a campaign →</a>'
      + '<a href="/solutions/brands" class="btn-ghost border border-border text-gray-200 px-6 py-3.5 rounded-lg font-medium hover:bg-white/[0.03] transition-all">All solutions</a>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</section>';
  }

  function useCases(s) {
    var cards = s.useCases.map(function (uc) {
      return '<div class="reveal card bg-bg-card border border-border rounded-2xl p-7 transition-all">'
        + '<h3 class="text-lg font-semibold">' + uc.title + '</h3>'
        + '<p class="mt-3 text-muted text-sm leading-relaxed">' + uc.description + '</p>'
        + '</div>';
    }).join('');
    return '<section class="py-20 sm:py-28">'
      + '<div class="max-w-6xl mx-auto px-4 sm:px-6">'
      + '<div class="reveal mb-12">'
      + '<p class="text-xs uppercase tracking-[0.25em] text-primary mb-4">Use cases</p>'
      + '<h2 class="text-3xl sm:text-4xl font-bold tracking-tight">What You Can Do With SWRM</h2>'
      + '</div>'
      + '<div class="grid md:grid-cols-3 gap-4">' + cards + '</div>'
      + '</div>'
      + '</section>';
  }

  function exampleTasks(s) {
    var cards = s.exampleTasks.map(function (t) {
      return '<div class="reveal card bg-bg-card border border-border rounded-2xl p-6 transition-all">'
        + '<div class="text-xs uppercase tracking-widest text-muted mb-3">' + t.platform + '</div>'
        + '<div class="font-medium text-base leading-snug">' + t.action + '</div>'
        + '<div class="mt-5 flex items-center justify-between border-t border-border pt-4">'
        + '<span class="text-xs text-muted">Per completion</span>'
        + '<span class="text-primary font-semibold text-base">' + t.rate + '</span>'
        + '</div>'
        + '</div>';
    }).join('');
    return '<section class="py-20 sm:py-28 bg-bg-card/30">'
      + '<div class="max-w-6xl mx-auto px-4 sm:px-6">'
      + '<div class="reveal mb-12">'
      + '<p class="text-xs uppercase tracking-[0.25em] text-primary mb-4">How it runs</p>'
      + '<h2 class="text-3xl sm:text-4xl font-bold tracking-tight">What Tasks Look Like</h2>'
      + '</div>'
      + '<div class="grid md:grid-cols-3 gap-4">' + cards + '</div>'
      + '</div>'
      + '</section>';
  }

  function whyItWorks(s) {
    return '<section class="py-20 sm:py-28">'
      + '<div class="max-w-4xl mx-auto px-4 sm:px-6">'
      + '<div class="reveal">'
      + '<p class="text-xs uppercase tracking-[0.25em] text-primary mb-6">Why it works</p>'
      + '<p class="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-100">' + s.whyItWorks + '</p>'
      + '</div>'
      + '</div>'
      + '</section>';
  }

  function campaignExamples(s) {
    var cards = s.campaignExamples.map(function (c) {
      return '<div class="reveal card bg-bg-card border border-border rounded-2xl p-7 transition-all">'
        + '<div class="text-primary text-xs uppercase tracking-widest font-medium mb-4">' + c.title + '</div>'
        + '<p class="text-gray-200 leading-relaxed">' + c.result + '</p>'
        + '</div>';
    }).join('');
    return '<section class="py-20 sm:py-28 bg-bg-card/30">'
      + '<div class="max-w-6xl mx-auto px-4 sm:px-6">'
      + '<div class="reveal mb-12">'
      + '<p class="text-xs uppercase tracking-[0.25em] text-primary mb-4">Results</p>'
      + '<h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Campaign Examples</h2>'
      + '</div>'
      + '<div class="grid md:grid-cols-2 gap-4">' + cards + '</div>'
      + '</div>'
      + '</section>';
  }

  function cta() {
    return '<section class="py-24 sm:py-32 relative overflow-hidden">'
      + '<div class="absolute inset-0 hero-glow opacity-70 pointer-events-none"></div>'
      + '<div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">'
      + '<h2 class="text-4xl sm:text-6xl font-bold tracking-tight reveal">Ready to <span class="text-primary">Launch?</span></h2>'
      + '<p class="mt-5 text-muted text-lg max-w-xl mx-auto reveal">Set up your first SWRM campaign in minutes. No commitment, no minimums.</p>'
      + '<div class="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center reveal">'
      + '<a href="https://lets.swrmit.com/signup" class="btn-primary bg-primary text-bg px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-all text-lg">Get started — it\'s free</a>'
      + '<a href="/solutions/brands" class="btn-ghost border border-border text-gray-200 px-8 py-4 rounded-lg font-medium hover:bg-white/[0.03] transition-all text-lg">Explore all solutions</a>'
      + '</div>'
      + '</div>'
      + '</section>';
  }
})();
