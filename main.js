/* ═══════════════════════════════════════════════════════════
   Aryan Shah — portfolio
   No dependencies. Three behaviours: the rotator, scroll
   reveals, and the stage rail. All degrade to static.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ── 1. scroll reveals ───────────────────────────────────
     Runs FIRST and in its own try/catch. Everything below the
     fold is opacity:0 until this fires, so a failure anywhere
     else must not be able to take the page down with it.     */
  try {
    var revealables = document.querySelectorAll('[data-reveal]');
    var remaining = revealables.length;

    if (reduced || !hasIO) {
      Array.prototype.forEach.call(revealables, function (el) {
        el.classList.add('is-in');
      });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
          if (--remaining === 0) revealObserver.disconnect();
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      Array.prototype.forEach.call(revealables, function (el) {
        revealObserver.observe(el);
      });
    }
  } catch (err) {
    // Last resort: never leave the page invisible.
    document.documentElement.classList.remove('js');
  }

  /* ── 2. the rotator ──────────────────────────────────────
     Decorative. The accessible name is a single static string
     in the markup, so this never reaches assistive tech.
     Pausable, and idle whenever it is off-screen or hidden.  */
  try {
    var PHRASES = [
      'a software engineer',
      'a problem solver',
      'a systems thinker',
      'a relentless debugger',
      'a builder of things'
    ];

    var elWord  = document.getElementById('rot-word');
    var elIdx   = document.getElementById('rot-idx');
    var elTotal = document.getElementById('rot-total');
    var elPause = document.getElementById('rot-pause');
    var elRot   = document.querySelector('.rotator');

    if (elWord && elIdx && elTotal) {
      var i = 0;
      var timer = null;
      var paused = false;
      var onScreen = true;

      var pad = function (v) { return v < 10 ? '0' + v : String(v); };

      elTotal.textContent = pad(PHRASES.length);
      elWord.textContent = PHRASES[0];
      elIdx.textContent = pad(1);

      var tick = function () {
        i = (i + 1) % PHRASES.length;
        elWord.classList.remove('is-swapping');
        void elWord.offsetWidth;          // restart the animation
        elWord.textContent = PHRASES[i];
        elIdx.textContent = pad(i + 1);
        elWord.classList.add('is-swapping');
      };

      var stop = function () {
        if (timer) { clearInterval(timer); timer = null; }
      };
      var start = function () {
        if (timer || reduced || paused || !onScreen || document.hidden) return;
        timer = setInterval(tick, 2600);
      };

      if (elPause) {
        elPause.addEventListener('click', function () {
          paused = !paused;
          if (paused) stop(); else start();
          elPause.setAttribute('aria-pressed', String(paused));
          elPause.textContent = paused ? 'Play' : 'Pause';
          if (elRot) elRot.classList.toggle('is-paused', paused);
        });
      }

      // don't burn reflows in a background tab
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });

      // ...or while the hero is scrolled out of view
      if (hasIO && elRot) {
        new IntersectionObserver(function (entries) {
          onScreen = entries[0].isIntersecting;
          if (onScreen) start(); else stop();
        }, { threshold: 0 }).observe(elRot);
      }

      // honour the OS preference if it changes mid-session
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', function (e) {
          reduced = e.matches;
          if (reduced) stop(); else start();
        });
      }

      start();
    }
  } catch (err) { /* the rotator is decorative — never fatal */ }

  /* ── 3. the stage rail ───────────────────────────────────
     Draws once, when it comes into view.                     */
  try {
    var rail = document.querySelector('.rail');

    if (rail) {
      if (reduced || !hasIO) {
        rail.classList.add('is-live');
      } else {
        var railObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-live');
            railObserver.disconnect();
          });
        }, { threshold: 0.35 });
        railObserver.observe(rail);
      }
    }
  } catch (err) { /* no-op */ }

  /* ── 4. topbar hairline on scroll ────────────────────────
     A sentinel beats a scroll listener — no main-thread work
     while scrolling.                                         */
  try {
    var topbar = document.querySelector('.topbar');

    if (topbar && hasIO) {
      var sentinel = document.createElement('div');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
      document.body.prepend(sentinel);

      new IntersectionObserver(function (entries) {
        topbar.classList.toggle('is-stuck', !entries[0].isIntersecting);
      }).observe(sentinel);
    }
  } catch (err) { /* no-op */ }

})();
