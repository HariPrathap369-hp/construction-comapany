/* ===================================================================
   MCB BROTHERS CONSTRUCTION — basic chatbot widget
   Rule-based, dependency-free, no backend. Answers common questions
   from the real business details and hands off to WhatsApp / phone /
   the quote form. Pairs with the Vapi voice orb for people who'd
   rather type than talk.
   =================================================================== */
(function () {
  'use strict';

  var fab      = document.getElementById('chatFab');
  var box      = document.getElementById('chatbox');
  var log      = document.getElementById('chatLog');
  var quickWrap= document.getElementById('chatQuick');
  var form     = document.getElementById('chatForm');
  var input    = document.getElementById('chatInput');
  var closeBtn = document.getElementById('chatClose');
  if (!fab || !box || !log || !form || !input) return;

  /* Real business details */
  var PHONE      = '+91 98430 70880';
  var TEL        = 'tel:+919843070880';
  var WA         = 'https://wa.me/919843070880';
  var DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=11.3349567,76.7463351';
  var REVIEWS    = 'https://www.google.com/maps/search/?api=1&query=MCB+BROTHERS+CONSTRUCTION+Coonoor';

  var DEFAULT_QUICK = ['Our services', 'Get a quote', 'Where are you?', 'Call / WhatsApp'];
  var greeted = false;

  /* ----------  Open / close  ---------- */
  function openBox() {
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add('is-open'); });
    fab.classList.add('is-active');
    fab.setAttribute('aria-expanded', 'true');
    if (!greeted) { greeted = true; greet(); }
    setTimeout(function () { input.focus(); }, 280);
  }
  function closeBox() {
    box.classList.remove('is-open');
    fab.classList.remove('is-active');
    fab.setAttribute('aria-expanded', 'false');
    setTimeout(function () { box.hidden = true; }, 240);
  }
  fab.addEventListener('click', function () { box.hidden ? openBox() : closeBox(); });
  if (closeBtn) closeBtn.addEventListener('click', closeBox);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) closeBox(); });

  /* ----------  Rendering helpers  ---------- */
  function scrollDown() { log.scrollTop = log.scrollHeight; }

  function bubble(who, html) {
    var el = document.createElement('div');
    el.className = 'msg msg--' + who;
    el.innerHTML = html;
    log.appendChild(el);
    scrollDown();
    return el;
  }

  function typing() {
    var el = document.createElement('div');
    el.className = 'msg msg--bot msg--typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(el);
    scrollDown();
    return el;
  }

  function renderQuick(list) {
    quickWrap.innerHTML = '';
    if (!list) return;
    list.forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-quick';
      b.textContent = q;
      b.addEventListener('click', function () { handleUser(q); });
      quickWrap.appendChild(b);
    });
  }

  function botSay(html, quicks) {
    var t = typing();
    setTimeout(function () {
      t.remove();
      bubble('bot', html);
      renderQuick(quicks);
    }, 480 + Math.random() * 320);
  }

  function greet() {
    botSay("Hi! 👋 I'm the MCB Brothers assistant. We build custom homes, villas and renovations across Ooty, Coonoor &amp; the Nilgiris. How can I help you today?", DEFAULT_QUICK);
  }

  /* ----------  Action buttons inside a bubble  ---------- */
  function actionsHtml(actions) {
    if (!actions || !actions.length) return '';
    var html = actions.map(function (a) {
      var ext = a.ext ? ' target="_blank" rel="noopener"' : '';
      var cls = a.wa ? ' msg__btn--wa' : '';
      return '<a class="msg__btn' + cls + '" href="' + a.h + '"' + ext + '>' + a.l + '</a>';
    }).join('');
    return '<div class="msg__actions">' + html + '</div>';
  }

  /* ----------  Intent matching  ---------- */
  function reply(text) {
    var t = (' ' + text + ' ').toLowerCase();
    function has() { for (var i = 0; i < arguments.length; i++) { if (t.indexOf(arguments[i]) > -1) return true; } return false; }

    if (has('hello', 'hi ', 'hii', 'hey', 'vanakkam', 'good morning', 'good evening'))
      return { html: "Hello! 😊 Are you planning a new home, a renovation, or something else?", quick: DEFAULT_QUICK };

    if (has('service', 'build', 'what do you', 'offer', 'construct', 'interior', 'turnkey', 'villa', 'bungalow', 'renovat', 'remodel', 'plot'))
      return { html: "Here's what we do:<br>• Custom luxury homes<br>• Villas &amp; bungalows<br>• Turnkey construction (plot → keys)<br>• Renovation &amp; remodeling<br>• Real estate &amp; development<br>• Interiors &amp; finishing<br><br>Shall I help you get a free quote?",
               quick: ['Get a quote', 'Where are you?', 'Call / WhatsApp'] };

    if (has('quote', 'price', 'cost', 'estimate', 'budget', 'how much', 'rate', 'charge'))
      return { html: "Every build is custom, so we give a <strong>free, no-obligation estimate</strong>. Share your plot location &amp; rough size and our team will prepare one for you.",
               actions: [ { l: 'Fill the quote form', h: '#contact' }, { l: 'WhatsApp us', h: WA, wa: true, ext: true } ],
               quick: ['Our services', 'Where are you?'] };

    if (has('where', 'location', 'address', 'area', 'ooty', 'coonoor', 'nilgiri', 'visit', 'direction', 'office', 'map', 'reach you'))
      return { html: "We're based in <strong>Coonoor</strong> and serve all of Ooty &amp; the Nilgiris.<br>📍 2/112 F, Selas Kattary (P.O.), Coonoor Tk, Ooty, TN 643213.",
               actions: [ { l: 'Get directions', h: DIRECTIONS, ext: true } ],
               quick: ['Get a quote', 'Call / WhatsApp'] };

    if (has('call', 'phone', 'contact', 'number', 'whatsapp', 'reach', 'talk', 'speak', 'mobile'))
      return { html: "You can reach us <strong>24/7</strong> at <strong>" + PHONE + "</strong>.",
               actions: [ { l: 'Call now', h: TEL }, { l: 'WhatsApp', h: WA, wa: true, ext: true } ],
               quick: ['Get a quote', 'Our services'] };

    if (has('hour', 'open', 'timing', 'time', 'when ', 'available', '24'))
      return { html: "We're <strong>open 24 hours, 7 days a week</strong> — call or message us any time.",
               actions: [ { l: 'Call now', h: TEL }, { l: 'WhatsApp', h: WA, wa: true, ext: true } ],
               quick: ['Get a quote', 'Our services'] };

    if (has('review', 'rating', 'star', 'trust', 'testimon', 'reputation', 'experience', 'quality'))
      return { html: "We're rated <strong>4.9★ from 52 Google reviews</strong> — clients love our quality, on-time delivery and fair pricing. 🙏",
               actions: [ { l: 'Read reviews', h: REVIEWS, ext: true } ],
               quick: ['Get a quote', 'Our services'] };

    if (has('thank', 'great', 'nice', 'cool', 'awesome', 'super'))
      return { html: "You're welcome! 😊 Anything else I can help you with?", quick: DEFAULT_QUICK };

    if (has('bye', 'goodbye', 'see you'))
      return { html: "Thanks for stopping by! We're here 24/7 whenever you need us. 👋", quick: DEFAULT_QUICK };

    /* fallback */
    return { html: "I can help with our <strong>services, pricing, location and contact details</strong>. For anything specific, message our team directly — they reply fast!",
             actions: [ { l: 'WhatsApp us', h: WA, wa: true, ext: true }, { l: 'Call', h: TEL } ],
             quick: DEFAULT_QUICK };
  }

  /* ----------  User input  ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function handleUser(text) {
    text = (text || '').trim();
    if (!text) return;
    bubble('user', escapeHtml(text));
    quickWrap.innerHTML = '';
    var r = reply(text);
    botSay(r.html + actionsHtml(r.actions), r.quick);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    handleUser(v);
  });
})();
