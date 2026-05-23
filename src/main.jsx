import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function Root() {
  const [ready, setReady] = useState(false);
  return (
    <StrictMode>
      {!ready && <LoadingScreen onFinish={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s' }}>
        <App />
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
