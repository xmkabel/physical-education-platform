// import { useState } from 'react'
import Home from './components/Home'
import FirstQuiz from './components/quizes/first/page'
import image from './assets/icon.png'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
  

    <Routes>
      <Route path="/react-physical-education/" element={<Home />} />
      <Route path="/react-physical-education/quizes/first" element={<FirstQuiz />} />
    </Routes>
    </>
  )
}

export default App
