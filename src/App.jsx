import Home from './components/Home'
import image from './assets/icon.png'
import {Routes, Route} from 'react-router-dom'
import Quiz from './components/quizes/Quiz'
import quizData from './data/quizData.json'

function App() {
  return (
    <>


    <Routes>
    <Route path="/ss" element={<Quiz quizData={quizData} name={"الباب الأول / نظريات التعلم ونظريات التدريس"} 

    />}/>
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default App
