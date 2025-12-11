import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import ErrorPage404 from './pages/ErrorPage404';
import ScrollToTop from './components/common/scroll top/scroll-top';
// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Lazy load components that are heavy
const Login = lazy(() => import('./components/Sign-in/Login'));
const Signup = lazy(() => import('./components/Sign-in/Signin'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));

const Settings = lazy(() => import('./components/notification & settings/settings/settings'))
const Notifications = lazy(() => import('./components/notification & settings/notifiaction/notification'))
// Lazy load main dashboard components
const Students = lazy(() => import('./components/Dashboard/Students/Students'));
const Teach = lazy(() => import('./components/Dashboard/Teach/Teach'));
const AdminDashboard = lazy(() => import('./components/Dashboard/Admin/Admindash'));
const SuperAdmin = lazy(() => import('./components/Dashboard/Admin/adminPages/SuperAdmin/SuperAdmin'));

// Group student pages into chunks
const MyCourses = lazy(() => import('./components/Dashboard/Students/Studentpages/myCourses/myCourses'));
const VideoMain = lazy(() => import('./components/Dashboard/Students/Studentpages/myCourses/videoplayer/videoMain'));
const Webinars = lazy(() => import('./components/Dashboard/Students/Studentpages/webinars/webinars'));
const WebVideoMain = lazy(() => import('./components/Dashboard/Students/Studentpages/webinars/webvideoplayer/webvideoMain'));

// Group assessment-related components
const Assessments = lazy(() => import('./components/Dashboard/Students/Studentpages/assessments/assessments'));
const Quiz = lazy(() => import('./components/Dashboard/Students/Studentpages/assessments/quiz/quiz'));

// Group other student components
const SkillsAnalysis = lazy(() => import('./components/Dashboard/Students/Studentpages/skillRate/skillsAnalysis'));
const Progress = lazy(() => import('./components/Dashboard/Students/Studentpages/progress/progress'));
const Achievements = lazy(() => import('./components/Dashboard/Students/Studentpages/achievements/achievements'));
const Certification = lazy(() => import('./components/Dashboard/Students/Studentpages/certificate/certificate'));
const Support = lazy(() => import('./components/Dashboard/Students/Studentpages/support/support'));
const LivePlayer = lazy(() => import('./components/Dashboard/Students/Studentpages/webinars/LivePlayer'));
const WatchRecordedVideo = lazy(() => import('./components/Dashboard/Students/Studentpages/webinars/webvideoplayer/WatchRecordedVideo'));
const OneCourseDetails = lazy(() => import('./components/Dashboard/Students/Studentpages/myCourses/OneCourseDetails'));
const BrowseCourses = lazy(() => import('./components/Dashboard/Students/Studentpages/myCourses/browseCourse/browseCourse'));
// Group teacher components
const MyCourse = lazy(() => import('./components/Dashboard/Teach/teachPages/myCourses/myCourses'));
const CreateCourse = lazy(() => import('./components/Dashboard/Teach/teachPages/createcourse/createCourse'));
const LiveWebinar = lazy(() => import('./components/Dashboard/Teach/teachPages/liveWebinars/liveWebinars'));
const ScheduleWebinar = lazy(() => import('./components/Dashboard/Teach/teachPages/liveWebinars/scheduleWebinar/scheduleWebinar'));
const Analytics = lazy(() => import('./components/Dashboard/Teach/teachPages/analytics/analytics'));
const TeachAssessments = lazy(() => import('./components/Dashboard/Teach/teachPages/assessments/assessments'));

// Group admin components
const UserManagement = lazy(() => import('./components/Dashboard/Admin/adminPages/UserManagement/userManagement'));
const AdminCourse = lazy(() => import('./components/Dashboard/Admin/adminPages/Courses/adminCourses'));
const CertificateGeneration = lazy(() => import('./components/Dashboard/Admin/adminPages/Certificate/Certificate'));
const Payment = lazy(() => import('./components/Dashboard/Admin/adminPages/Payments/Payment'));
const Reports = lazy(() => import('./components/Dashboard/Admin/adminPages/Reports/Reports'));
const WhiteLabelSettings = lazy(() => import('./components/Dashboard/Admin/adminPages/White-Label/Whitelabels'));
const Approval = lazy(() => import('./components/Dashboard/Admin/adminPages/approval/approval'));
// Create route wrapper for lazy components
const LazyRoute = ({ element }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {element}
  </Suspense>
);

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop/>
      <Routes>
        {/* Common paths - eagerly loaded since they're entry points */}
        <Route path="/" element={<Header />} />
        <Route path="*" element={<ErrorPage404 />} />

        {/* Lazy loaded auth pages */}
        <Route 
          path="login" 
          element={<LazyRoute element={<Login />} />} 
        />
        <Route 
          path="signup" 
          element={<LazyRoute element={<Signup />} />} 
        />
        <Route 
          path="/super-admin" 
          element={<LazyRoute element={<AdminLogin />} />} 
        />
         <Route 
          path="/settings" 
          element={<LazyRoute element={<Settings/>} />} 
        />
         <Route 
          path="/notification" 
          element={<LazyRoute element={<Notifications/>} />} 
        />
        

        {/* Student Routes */}
        <Route 
          path='/student' 
          element={<LazyRoute element={<Students />} />} 
        />
        <Route 
          path='/student/mycourses' 
          element={<LazyRoute element={<MyCourses />} />} 
        />
         <Route 
          path='/student/mycourses/browsecourses' 
          element={<LazyRoute element={<BrowseCourses/>} />} 
        />
        <Route 
          path='/student/mycourses/videoplayer/:courseId' 
          element={<LazyRoute element={<VideoMain />} />} 
        />
        <Route 
          path='/student/webinar/webvideoplayer/:webinarId' 
          element={<LazyRoute element={<WebVideoMain />} />} 
        />
        <Route 
          path='/student/webinar' 
          element={<LazyRoute element={<Webinars />} />} 
        />
        <Route 
          path='/student/certificates' 
          element={<LazyRoute element={<Certification />} />} 
        />
        <Route 
          path='/student/support' 
          element={<LazyRoute element={<Support />} />} 
        />
        <Route 
          path='/student/assessment/quiz/:id' 
          element={<LazyRoute element={<Quiz />} />} 
        />
        <Route 
          path='/student/assessment' 
          element={<LazyRoute element={<Assessments />} />} 
        />
        <Route 
          path='/student/skillrating' 
          element={<LazyRoute element={<SkillsAnalysis />} />} 
        />
        <Route 
          path='/student/progress' 
          element={<LazyRoute element={<Progress />} />} 
        />
        <Route 
          path='/student/achievements' 
          element={<LazyRoute element={<Achievements />} />} 
        />
        <Route 
          path='/student/live' 
          element={<LazyRoute element={<LivePlayer />} />} 
        />
        <Route 
          path='/student/webinar/recordedVideo' 
          element={<LazyRoute element={<WatchRecordedVideo />} />} 
        />        

        {/* Teacher Routes */}
        <Route 
          path='/teacher' 
          element={<LazyRoute element={<Teach />} />} 
        />
        <Route 
          path='/teacher/mycourse' 
          element={<LazyRoute element={<MyCourse />} />} 
        />
        <Route 
          path='/teacher/createCourse' 
          element={<LazyRoute element={<CreateCourse />} />} 
        />
        <Route 
          path="/teacher/editcourse/:courseId" 
          element={<LazyRoute element={<CreateCourse />} />} 
        />
        <Route 
          path="/teacher/mycourses/:courseId" 
          element={<LazyRoute element={<OneCourseDetails />} />} 
        />
        <Route 
          path='/teacher/livewebinar' 
          element={<LazyRoute element={<LiveWebinar />} />} 
        />
        <Route 
          path='/teacher/scheduleWebinar' 
          element={<LazyRoute element={<ScheduleWebinar />} />} 
        />
        <Route 
          path='/teacher/scheduleWebinar/:id' 
          element={<LazyRoute element={<ScheduleWebinar />} />} 
        />
        <Route 
          path='/teacher/analytics' 
          element={<LazyRoute element={<Analytics />} />} 
        />
        <Route 
          path='/teacher/assessments' 
          element={<LazyRoute element={<TeachAssessments />} />} 
        />

        {/* Admin Routes */}
        <Route 
          path='/admin' 
          element={<LazyRoute element={<AdminDashboard />} />} 
        />
        <Route 
          path='/superadmin' 
          element={<LazyRoute element={<SuperAdmin />} />} 
        />
         <Route 
          path='/admin/approval' 
          element={<LazyRoute element={<Approval/>} />} 
        />
        <Route 
          path='/admin/UserManagement' 
          element={<LazyRoute element={<UserManagement />} />} 
        />
        <Route 
          path='/admin/adminCourse' 
          element={<LazyRoute element={<AdminCourse />} />} 
        />
        <Route 
          path='/admin/certificate' 
          element={<LazyRoute element={<CertificateGeneration />} />} 
        />
        <Route 
          path='/admin/payment' 
          element={<LazyRoute element={<Payment />} />} 
        />
        <Route 
          path='/admin/reports' 
          element={<LazyRoute element={<Reports />} />} 
        />
        <Route 
          path='/admin/whiteLabel' 
          element={<LazyRoute element={<WhiteLabelSettings />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;