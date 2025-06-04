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
import CourseDetail from './pages/course/CourseDetail';
import CourseRatings from './pages/CourseRatings';
import CourseComplaint from './pages/course/CourseComplaint.tsx';
import CourseList from './pages/course/CourseList';
import ManageCourses from './pages/admin/ManageCourses'; 
import AddCourse from './pages/admin/AddCourse.tsx';
import Forbidden from './pages/error/Forbidden.tsx';
import NotFound from './pages/error/NotFound.tsx';

import { AuthProvider } from './context/AuthContext'; 
import ProtectedRoute from './routes/ProtectedRoute'; 

function App() {
  return (
    <Router>
      {/* AuthProvider should wrap all components that need authentication context */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/my-courses" element={<RegisteredCourses />} />
          <Route path="/payment/:courseId" element={<PaymentMethod />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CheckEmail" element={<CheckEmail />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course-ratings" element={<CourseRatings />} />
          <Route path="/course-complaint/:courseId" element={<CourseComplaint />} />

          {/* Protected Route */}
          <Route
            path="/add-course"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'SELLER']}>
                <AddCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-courses"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'SELLER']}>
                <ManageCourses />
              </ProtectedRoute>
            }
          />

          {/* Error Pages */}
          <Route path="/403" element={<Forbidden />} />
          {/* Fallback route for any unmatched paths, redirects to NotFound page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
