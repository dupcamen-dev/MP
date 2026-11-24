import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Inertial "buttery" scrolling for mouse wheels and trackpads.
// Touch devices keep native scrolling (Lenis default), and it is skipped for prefers-reduced-motion.

let lenis = null;
let locks = 0;

const HEADER_OFFSET = 88;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return () => {};
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });

  let raf = requestAnimationFrame(function loop(time) {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  });

  // Hold still while the splash screen is up.
  if (!('ready' in document.documentElement.dataset)) {
    lenis.stop();
    window.addEventListener('mp:ready', () => { if (!locks) lenis?.start(); }, { once: true });
  }

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function smoothScrollTo(target, { offset = -HEADER_OFFSET, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : offset, duration: 1.4, immediate });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  }
}

// Ref-counted scroll lock for modals and the mobile menu.
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
  }
  return () => {
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      document.body.style.overflow = '';
      lenis?.start();
    }
  };
}
