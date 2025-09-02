import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ExamCards from './components/ExamCards/ExamCards';
import Intro from './components/Intro';
import Video from './components/Video';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes';
import FirstChapterRoutes from './components/routes/FirstChapterRoutes';
import SecondChapterRoutes from './components/routes/SecondChapterRoutes';
import ThirdChapterRoutes from './components/routes/ThirdChapterRoutes';
import FourthChapterRoutes from './components/routes/FourthChapterRoutes';
import FifthChapterRoutes from './components/routes/FifthChapterRoutes';
import SixthChapterRoutes from './components/routes/SixthChapterRoutes';
import FinalChapterRoutes from './components/routes/FinalChapterRouters';
import StartChapterRoutes from './components/routes/StartChapterRoutes';
import Register from './components/register/register';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Intro />} />
        
        {/* Protected Routes */}
        <Route path="/exams" element={<ProtectedRoute><ExamCards /></ProtectedRoute>} />
        <Route path="/video/:id" element={<ProtectedRoute><Video /></ProtectedRoute>} />
        
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
