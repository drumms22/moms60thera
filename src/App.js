import logo from './logo.svg';
import './App.css';
import './app.mobile.css';
import './app.transitions.css';
import Home from './pages/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
