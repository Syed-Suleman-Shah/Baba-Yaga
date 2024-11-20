import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Navbar from '../components/Common/Navbar'
import CategoryBar from '../components/Common/CategoryBar'
import Home from './MainPage/Home'
// import Cart from './MainPage/Cart'
import Footer from '../components/Common/Footer'


function HomePage() {
  return (
    <div>
    
    <Navbar />
    <CategoryBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path='/cart' element={<Cart />}></Route> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default HomePage;
