import './App.css'
import 'flowbite'
import Hero from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TutorRoutes from './routes/TutorRoutes'
import NotFound from './pages/NotFound'
import AdminRoutes from './routes/AdminRoutes'

function App() {

  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
