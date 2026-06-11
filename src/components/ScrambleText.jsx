import { useScrambleText } from '../hooks/useScrambleText';

export default function ScrambleText({ text, delay, cascade, speed, ...props }) {
  const display = useScrambleText(text, { delay, cascade, speed });
  return <span {...props} style={{ whiteSpace: 'pre', ...(props.style || {}) }}>{display}</span>;
}
