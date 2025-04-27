import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/static/About';
import Contact from './pages/static/Contact';
import SearchResults from './pages/SearchResults';
import RegisteredCourses from './pages/RegisteredCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-courses" element={<RegisteredCourses />} />
      </Routes>
    </Router>
  );
}

export default App;