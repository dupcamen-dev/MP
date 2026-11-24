import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoadingScreen, { splashAlreadySeen } from './components/LoadingScreen';
import './App.css';

function Root() {
  // The splash plays once per browser session; the site renders underneath it right away.
  const [showSplash, setShowSplash] = useState(() => {
    const seen = splashAlreadySeen();
    if (seen) document.documentElement.dataset.ready = '';
    return !seen;
  });

  return (
    <StrictMode>
      <App />
      {showSplash && <LoadingScreen onFinish={() => setShowSplash(false)} />}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
