(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  // ---------- Theme toggle ----------
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---------- Mobile nav ----------
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Reveal on scroll ----------
  function observeReveals(scope) {
    var items = (scope || document).querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }
  observeReveals();

  // ---------- Testimonials (owner-managed JSON, loaded at runtime) ----------
  var section = document.getElementById('testimonials');
  var carousel = section && section.querySelector('.carousel');

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text; // textContent only: JSON content is never parsed as HTML
    return node;
  }

  function initials(name) {
    return name.split(/\s+/).map(function (p) { return p.charAt(0); }).join('').slice(0, 2).toUpperCase();
  }

  function renderTestimonials(list) {
    carousel.textContent = '';
    var visible = list.filter(function (t) { return t && t.quote && t.name && t.visible !== false; });
    if (!visible.length) {
      section.hidden = true;
      return;
    }
    visible.forEach(function (t) {
      var fig = el('figure', 'card testimonial reveal');
      fig.appendChild(el('blockquote', null, t.quote));
      var cap = el('figcaption');
      var avatar;
      if (t.photo && /^(https:\/\/|assets\/)/.test(t.photo)) {
        avatar = el('img', 'avatar');
        avatar.src = t.photo;
        avatar.alt = 'Photo of ' + t.name;
        avatar.loading = 'lazy';
        avatar.width = 48; avatar.height = 48;
      } else {
        avatar = el('span', 'avatar', initials(t.name));
        avatar.setAttribute('aria-hidden', 'true');
      }
      cap.appendChild(avatar);
      var who = el('span', 'who');
      who.appendChild(el('strong', null, t.name));
      if (t.role) who.appendChild(el('span', null, t.role));
      cap.appendChild(who);
      if (t.relationship) {
        var tag = el('span', 'tag tag-sec', t.relationship);
        tag.style.marginLeft = 'auto';
        cap.appendChild(tag);
      }
      fig.appendChild(cap);
      carousel.appendChild(fig);
    });
    observeReveals(carousel);
  }

  if (carousel) {
    var src = section.getAttribute('data-source');
    // cache: 'no-cache' revalidates each visit, so edits to the JSON show up without a redeploy of the page itself.
    fetch(src, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) { renderTestimonials(Array.isArray(data) ? data : data.testimonials || []); })
      .catch(function () { section.hidden = true; });

    section.querySelectorAll('.carousel-controls button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = carousel.querySelector('.testimonial');
        var step = card ? card.getBoundingClientRect().width + 20 : 360;
        carousel.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
      });
    });
  }

  // ---------- Contact form (Formspree, submitted via fetch) ----------
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        status.className = 'form-status err';
        status.textContent = 'Contact form is not configured yet. Please email me directly.';
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          status.className = 'form-status ok';
          status.textContent = 'Thanks! Your message was sent.';
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent = 'Something went wrong. Please email me directly.';
        })
        .then(function () { btn.disabled = false; });
    });
  }

  // ---------- Footer year ----------
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
