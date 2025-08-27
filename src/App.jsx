import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ExamCards from './components/ExamCards/ExamCards';
import Intro from './components/Intro';
import Video from './components/Video';
import FirstChapterRoutes from './components/routes/FirstChapterRoutes';
import SecondChapterRoutes from './components/routes/SecondChapterRoutes';
import ThirdChapterRoutes from './components/routes/ThirdChapterRoutes';
import FourthChapterRoutes from './components/routes/FourthChapterRoutes';
import FifthChapterRoutes from './components/routes/FifthChapterRoutes';
import SixthChapterRoutes from './components/routes/SixthChapterRoutes';
import FinalChapterRoutes from './components/routes/FinalChapterRouters';
import StartChapterRoutes from './components/routes/FinalChapterRouters';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/exams" element={<ExamCards />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
        
        {/* Chapter Routes */}
        
        {StartChapterRoutes}
        {SecondChapterRoutes}
        {ThirdChapterRoutes}
        {FourthChapterRoutes}
        {FifthChapterRoutes}
        {SixthChapterRoutes}
        {FinalChapterRoutes}

      </Routes>
    </>
  );
}

export default App;
