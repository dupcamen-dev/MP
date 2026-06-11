import { useScrambleText } from '../hooks/useScrambleText';

export default function ScrambleText({ text, delay = 0, cascade = 50, speed = 50, ...props }) {
  const display = useScrambleText(text, { delay, cascade, speed });
  return <span {...props}>{display}</span>;
}
