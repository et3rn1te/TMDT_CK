import React, { useEffect, useState } from 'react';
import { courseApi } from '../api/courses';
import { EnrolledCourse } from '../types/courseTypes';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Clock, AlertCircle, Play, BookOpen, BarChart2, Download, Award } from 'lucide-react';

// Define course status type
type CourseStatus = 'completed' | 'in-progress' | 'not-started';
type PaymentStatus = 'paid' | 'pending' | 'failed';

interface RegisteredCourse {
  id: number;
  title: string;
  instructor: string;
  image: string;
  progress: number; // 0-100
  lastAccessed: string;
  courseStatus: CourseStatus;
  expiresAt: string | null;
  paymentStatus: PaymentStatus;
  paymentDate: string | null;
  certificate: boolean;
  totalLessons: number;
  completedLessons: number;
}

const RegisteredCourses: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const courses = await courseApi.getEnrolledCourses();
        setEnrolledCourses(courses);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Khóa học của tôi</h1>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="text-blue-600 hover:text-blue-800">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500">Instructor: {course.instructorName}</span>
                      <span className="text-gray-500">
                        Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                        <span className="text-sm text-gray-600">{course.status}</span>
                      </div>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisteredCourses; 