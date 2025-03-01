// import { useState } from 'react'
import Home from './components/Home'
import FirstQuiz from './components/quizes/first/page'
import image from './assets/icon.png'
import {Routes, Route} from 'react-router-dom'
import SecondExam from './components/quizes/second/page'
function App() {

  return (
    <>
  

    <Routes>
{/* <<<<<<< HEAD
      <Route path="/" element={<Home />} />
      <Route path="/quizes/first" element={<FirstQuiz />} />
      <Route path="/quizes/second" element={<SecondExam />} /> */}
=======
      <Route path="/" element={<Home />} />
      <Route path="/quizes/first" element={<FirstQuiz />} />
      <Route path="/quizes/second" element={<SecondExam />} />
    </Routes>
    </>
  )
}

export default App
