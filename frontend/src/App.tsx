import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/static/About';
import Contact from './pages/static/Contact';
import SearchResults from './pages/SearchResults';
import RegisteredCourses from './pages/RegisteredCourses';
import PaymentMethod from './pages/PaymentMethod';
import PaymentSuccess from './pages/PaymentSuccess';
import Register from './pages/Register';
import Login from './pages/Login.tsx';
import CheckEmail from './pages/CheckEmail';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CourseDetail from './pages/CourseDetail';
import CourseRatings from './pages/CourseRatings';


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
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/course-ratings" element={<CourseRatings />} />
        <Route path="/course-complaint/:courseId" element={<CourseComplaint />} />
      </Routes>
    </Router>
  );
}

export default App;