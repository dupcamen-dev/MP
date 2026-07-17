import { useState } from 'react';
import { useMobile } from '../hooks/useMobile';

export default function FloatingCTA({ onOpen }) {
  const mobile = useMobile();
  const [hidden, setHidden] = useState(false);

  if (!mobile) return null;

  return (
    <button
      onClick={() => { onOpen(); setHidden(true); }}
      style={{
        position: 'fixed', 
        bottom: 'max(32px, calc(32px + env(safe-area-inset-bottom)))', 
        right: 'max(24px, calc(24px + env(safe-area-inset-right)))', 
        zIndex: 50,
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'var(--primary)', border: 'none',
        boxShadow: '0 8px 24px rgba(201, 123, 92, 0.3)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.75rem', transition: 'all 0.3s',
        opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto',
      }}
      aria-label="Start your MVP"
    >
      ⚡
    </button>
  );
}
