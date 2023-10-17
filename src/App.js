import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import CrimePDF from './components/CrimePDF'


import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crime-pdf" element={<CrimePDF />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;
