import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/static/About';
import Contact from './pages/static/Contact';
import SearchResults from './pages/SearchResults';
import RegisteredCourses from './pages/RegisteredCourses';
import PaymentMethod from './pages/PaymentMethod';
import PaymentSuccess from './pages/PaymentSuccess';
import CourseDetail from './pages/CourseDetail';
import CourseRatings from './pages/CourseRatings';
import CourseComplaint from './pages/CourseComplaint';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-courses" element={<RegisteredCourses />} />
        <Route path="/payment/:courseId" element={<PaymentMethod />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/course-ratings" element={<CourseRatings />} />
        <Route path="/course-complaint/:courseId" element={<CourseComplaint />} />
      </Routes>
    </Router>
  );
}

export default App;