import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'

function App() {

  return (
    <>
      <div className=' bg-gradient-to-tr from-green-100 to-sky-100'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
