import { useInView } from '../hooks/useInView';

export default function Reveal({ children, delay = 0, as: Tag = 'div', threshold, rootMargin, className = '', style }) {
  const [ref, inView] = useInView({ threshold, rootMargin });
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' active' : ''} ${className}`}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : {}), ...style }}
    >
      {children}
    </Tag>
  );
}
