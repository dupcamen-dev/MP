import { useState, useEffect } from 'react';
import { ArrowUp } from './Icons';
import { smoothScrollTo } from '../smoothScroll';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`to-top${visible ? ' is-visible' : ''}`}
      onClick={() => smoothScrollTo(0)}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp />
    </button>
  );
}
