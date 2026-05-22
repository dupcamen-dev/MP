import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';

export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <header
      style={{
        position: 'fixed', top: visible ? 0 : -100, left: 0, right: 0,
        zIndex: 70, mixBlendMode: 'difference',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 64px',
        transition: 'top 0.8s cubic-bezier(0.175,0.885,0.32,1.275)',
      }}
    >
      <a
        href="#"
        className="header-logo"
        style={{
          fontFamily: "'Anton', sans-serif", fontSize: '2rem',
          color: 'var(--primary)', textDecoration: 'none',
          textShadow: '2px 2px 0 var(--secondary)',
        }}
      >
        MILLIONPIXELS.DEV
      </a>
      <MenuOverlay />
    </header>
  );
}
