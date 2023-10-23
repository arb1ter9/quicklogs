import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Logs from './components/Logs';
import NotFound from './components/NotFound';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
