import React from 'react';
import CPU from './components/CPU';
import Background from './components/Background';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="bar">
          <Background />
          <div className="bar-overlay">
            <CPU />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;