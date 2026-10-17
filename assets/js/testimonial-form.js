(function () {
  'use strict';
  var form = document.querySelector('.testimonial-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var quote = form.elements.quote;
  var counter = form.querySelector('.char-count');

  quote.addEventListener('input', function () {
    counter.textContent = quote.value.length + ' / ' + quote.maxLength;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;

    // Ready-to-paste entry for data/testimonials.json, included in the notification email.
    f.json_entry.value = JSON.stringify({
      quote: f.quote.value.trim(),
      name: f.name.value.trim(),
      role: f.role.value.trim() + ', ' + f.organization.value.trim(),
      relationship: f.relationship.value,
      photo: '',
      visible: true
    }, null, 2);
    f._subject.value = 'New testimonial from ' + f.name.value.trim() + ' (' + f.relationship.value + ')';

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending…';

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        counter.textContent = '0 / ' + quote.maxLength;
        status.className = 'form-status ok';
        status.textContent = 'Thank you! Your testimonial was sent to Ahmed.';
      })
      .catch(function () {
        status.className = 'form-status err';
        status.textContent = 'Something went wrong. Please email your testimonial to itsme_ahmed@outlook.com instead.';
      })
      .then(function () { btn.disabled = false; });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
