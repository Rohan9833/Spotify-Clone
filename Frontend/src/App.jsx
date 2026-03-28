import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx'
import Register from './pages/register.jsx'
import Home  from './pages/Home.jsx'
import Upload from './pages/upload.jsx'
import Navbar from './pages/navbar.jsx';
import './Styles/app.css'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>

      
    </>
  )
}

export default App;
