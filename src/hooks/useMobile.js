import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

export function useTablet() {
  const [isTablet, setIsTablet] = useState(
    () => window.matchMedia('(min-width: 601px) and (max-width: 900px)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 601px) and (max-width: 900px)');
    const handler = (e) => setIsTablet(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isTablet;
}