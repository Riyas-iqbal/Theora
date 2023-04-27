import './App.css'
import 'flowbite'
import Hero from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TutorRoutes from './routes/TutorRoutes'
import NotFound from './pages/NotFound'

function App() {

  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path="/" exact Component={Hero} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
