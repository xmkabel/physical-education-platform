import Home from './components/Home'
import ExamCards from './components/ExamCards/ExamCards'
import { Routes, Route } from 'react-router-dom'
import Quiz from './components/quizes/Quiz'
import quizData11 from './data/first/1.json'
import quizData12 from './data/first/2.json'
import quizData13 from './data/first/3.json'
import quizData14 from './data/first/4.json'
import quizData15 from './data/first/5.json'
import quizData16 from './data/first/6.json'
import quizData17 from './data/first/7.json'
import quizData18 from './data/first/8.json'
import Intro from './components/Intro'
import Video from './components/Video'
import FirstCards from './components/ExamCards/FirstCards'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route 
          path="/exams/first/1" 
          element={<Quiz quizData={quizData11} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/2" 
          element={<Quiz quizData={quizData12} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/3" 
          element={<Quiz quizData={quizData13} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/4" 
          element={<Quiz quizData={quizData14} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/5" 
          element={<Quiz quizData={quizData15} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/6" 
          element={<Quiz quizData={quizData16} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/7" 
          element={<Quiz quizData={quizData17} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route 
          path="/exams/first/8" 
          element={<Quiz quizData={quizData18} name={"نظريات التعلم ونظريات التدريس"} />}
        />
        <Route path="/exams" element={<ExamCards />} />
        <Route path="/exams/first" element={<FirstCards />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
      </Routes>
    </>
  )
}

export default App
