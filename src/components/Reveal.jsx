import { useInView } from '../hooks/useInView';

// Fades + lifts its children into view once. `delay` is in ms.
export default function Reveal({ children, delay = 0, as: Tag = 'div', threshold = 0.15, rootMargin = '0px 0px -8% 0px', className, style, ...rest }) {
  const [ref, inView] = useInView({ threshold, rootMargin });
  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-in={inView ? '' : undefined}
      style={{ ...(delay ? { '--d': `${delay}ms` } : null), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
