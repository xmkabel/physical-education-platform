import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ExamCards from './components/ExamCards/ExamCards';
import Intro from './components/Intro';
import Video from './components/Video';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminProtectedRoute from './components/AdminProtectedRoutes';
import FirstChapterRoutes from './components/routes/FirstChapterRoutes';
import SecondChapterRoutes from './components/routes/SecondChapterRoutes';
import ThirdChapterRoutes from './components/routes/ThirdChapterRoutes';
import FourthChapterRoutes from './components/routes/FourthChapterRoutes';
import FifthChapterRoutes from './components/routes/FifthChapterRoutes';
import SixthChapterRoutes from './components/routes/SixthChapterRoutes';
import FinalChapterRoutes from './components/routes/FinalChapterRouters';
import StartChapterRoutes from './components/routes/StartChapterRoutes';
import Register from './components/register/register';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Unauthorized from '../src/components/Unauthorized/Unauthorized';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized title={"غير مصرح بالوصول"} code={403}/>} />
        <Route path="/*" element={<Unauthorized title={"الرابط غير صحيح"} code={404} />} />
        {/* Protected Routes */}
        <Route path="/exams" element={<ProtectedRoute><ExamCards /></ProtectedRoute>} />
        <Route path="/video/:id" element={<ProtectedRoute><Video /></ProtectedRoute>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

        {/* <Route path="/unauthorized" element={<Unauthorized title={"غير مصرح بالوصول"} code={403}/>} /> */}
        {/* Protected Chapter Routes */}




        {StartChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {FirstChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {SecondChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {ThirdChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {FourthChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {FifthChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {SixthChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}
        {FinalChapterRoutes.map(route => (
          <Route
            key={route.key}
            path={route.props.path}
            element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
          />
        ))}

      </Routes>
    </>
  );
}

export default App;
