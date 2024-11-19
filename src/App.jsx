
import './App.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>} ></Route>
      <Route path='/home' element={<Home/>} ></Route>
      <Route path='/cart' element={<Cart/>} ></Route>
     </Routes>
    </>
  )
}

export default App
