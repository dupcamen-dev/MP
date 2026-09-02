// Signature buttons — rectangular, zero-radius, hard offset that COLLAPSES on hover.
// A physical, mechanical press. Not a glow.
import { useState } from 'react';

export function PrimaryButton({ children, onClick, href, as, style = {}, ...props }) {
  const [pressed, setPressed] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "'Anton', Impact, sans-serif",
    fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    color: 'var(--cream)', background: 'var(--ink)',
    border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
    padding: '16px 32px', textDecoration: 'none',
    boxShadow: pressed ? '0 0 0 var(--deep)' : '5px 5px 0 var(--deep)',
    transform: pressed ? 'translate(5px, 5px)' : 'translate(0, 0)',
    transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1), box-shadow 0.15s cubic-bezier(0.16,1,0.3,1)',
    ...style,
  };
  const handlers = {
    onMouseEnter: () => setPressed(true),
    onMouseLeave: () => setPressed(false),
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };
  if (href) {
    return <a href={href} onClick={onClick} style={base} {...handlers} {...props}>{children}</a>;
  }
  return <button onClick={onClick} style={base} {...handlers} {...props}>{children}</button>;
}

export function GhostButton({ children, onClick, href, style = {}, ...props }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "'Anton', Impact, sans-serif",
    fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    color: hover ? '#fff' : 'var(--ink)',
    background: hover ? '#f97316' : 'transparent',
    border: hover ? '2px solid #f97316' : '2px solid var(--ink)', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
    padding: '14px 30px', textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
    ...style,
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  if (href) {
    return <a href={href} onClick={onClick} style={base} {...handlers} {...props}>{children}</a>;
  }
  return <button onClick={onClick} style={base} {...handlers} {...props}>{children}</button>;
}
