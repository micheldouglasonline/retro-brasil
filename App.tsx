
import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {booting ? <BootScreen /> : <Desktop />}
    </div>
  );
};

export default App;
