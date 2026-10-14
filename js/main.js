(function () {
  'use strict';

  var C = window.KFS_CONTACT;
  var fleet = window.KFS_FLEET.map(function (c) {
    return Object.assign({}, c, {
      day: Math.ceil(c.week / 7),
      month: Math.round(c.week * 52 / 12)
    });
  });

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var eur = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); };
  var wa = function (text) { return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); };

  /* Contacts & computed numbers */
  $$('.js-tel').forEach(function (a) { a.href = 'tel:' + C.phone; });
  $$('.js-wa').forEach(function (a) { a.href = wa('Bonjour KFS, je souhaite louer une voiture.'); });
  $$('.js-min-week').forEach(function (el) { el.textContent = eur(Math.min.apply(null, fleet.map(function (c) { return c.week; }))); });
  $$('.js-fleet-count').forEach(function (el) { el.textContent = fleet.length; });
  $('#year').textContent = new Date().getFullYear();

  /* Filters */
  var types = ['Tous'];
  fleet.forEach(function (c) { if (types.indexOf(c.type) < 0) types.push(c.type); });
  var filter = 'Tous';
  var list = fleet;
  var tagClass = function (t) { return t === 'Électrique' ? 'tag-yellow' : 'tag-cream'; };

  function renderChips() {
    $('#chips').innerHTML = types.map(function (t) {
      var n = t === 'Tous' ? fleet.length : fleet.filter(function (c) { return c.type === t; }).length;
      return '<button type="button" class="chip" data-type="' + esc(t) + '" aria-pressed="' + (t === filter) + '">' + esc(t) + '<span class="m chip-count">' + n + '</span></button>';
    }).join('');
  }

  function renderCards() {
    list = filter === 'Tous' ? fleet : fleet.filter(function (c) { return c.type === filter; });
    $('#cards').innerHTML = list.map(function (c, i) {
      return '<button type="button" class="card" data-i="' + i + '" aria-label="Voir la fiche ' + esc(c.model) + '">' +
        '<span class="card-photo"><img src="' + esc(c.photo) + '" alt="" loading="lazy" width="1024" height="1024">' +
        '<span class="tag m ' + tagClass(c.type) + '">' + esc(c.type) + '</span></span>' +
        '<span class="card-body">' +
          '<span class="d card-title">' + esc(c.model) + '</span>' +
          '<span class="card-row"><span class="card-prices">' +
            '<span class="card-week"><span class="d">' + eur(c.week) + '</span><span class="muted"> / semaine</span></span>' +
            '<span class="m card-sub">' + eur(c.day) + ' / jour · ' + eur(c.month) + ' / mois</span>' +
          '</span><span class="go" aria-hidden="true"><svg class="ic"><use href="#i-arrow"/></svg></span></span>' +
        '</span></button>';
    }).join('');
  }

  $('#chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    filter = b.getAttribute('data-type');
    renderChips(); renderCards();
  });
  $('#cards').addEventListener('click', function (e) {
    var b = e.target.closest('.card'); if (!b) return;
    openCar(+b.getAttribute('data-i'), b);
  });

  /* Modals */
  var openModal = null, lastFocus = null;
  function showModal(el, opener) {
    lastFocus = opener || document.activeElement;
    el.hidden = false; openModal = el;
    document.body.classList.add('no-scroll');
    el.scrollTop = 0;
    $('.dialog', el).focus({ preventScroll: true });
  }
  function hideModal() {
    if (!openModal) return;
    openModal.hidden = true; openModal = null;
    document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('.overlay').forEach(function (o) {
    o.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) hideModal(); });
  });

  /* Car modal */
  var cur = 0;
  var carModal = $('#car-modal');
  function fillCar() {
    var c = list[cur], n = list.length;
    $('#car-img').src = c.photo; $('#car-img').alt = c.model;
    var tag = $('#car-tag'); tag.textContent = c.type; tag.className = 'tag m ' + tagClass(c.type);
    $('#car-title').textContent = c.model;
    $('#car-week').textContent = eur(c.week);
    $('#car-day').textContent = eur(c.day);
    $('#car-month').textContent = eur(c.month);
    $('#car-conso').textContent = c.conso;
    $('#car-range').textContent = c.range;
    $('#car-energy').textContent = c.energy;
    $('#car-wa').href = wa('Bonjour KFS, je souhaite réserver la ' + c.model + '.');
    $('#car-pos').textContent = (cur + 1) + ' / ' + n;
    $('#car-prev').setAttribute('aria-label', 'Modèle précédent : ' + list[(cur - 1 + n) % n].model);
    $('#car-next').setAttribute('aria-label', 'Modèle suivant : ' + list[(cur + 1) % n].model);
  }
  function openCar(i, opener) { cur = i; fillCar(); showModal(carModal, opener); }
  function go(d) { var n = list.length; cur = ((cur + d) % n + n) % n; fillCar(); }
  $('#car-prev').addEventListener('click', function () { go(-1); });
  $('#car-next').addEventListener('click', function () { go(1); });

  var tx = null;
  var photo = $('#car-photo');
  photo.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  photo.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (dx < -40) go(1); else if (dx > 40) go(-1);
  });

  document.addEventListener('keydown', function (e) {
    if (!openModal) return;
    if (e.key === 'Escape') { hideModal(); return; }
    if (openModal === carModal) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    }
  });

  /* Legal */
  $('#open-legal').addEventListener('click', function (e) { showModal($('#legal-modal'), e.currentTarget); });

  renderChips();
  renderCards();
})();
