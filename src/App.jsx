// import { useState } from 'react'
import Home from './components/Home'
import image from './assets/icon.png'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
  

    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default App
