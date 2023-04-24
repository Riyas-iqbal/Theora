import './App.css'
import Hero from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TutorRoutes from './routes/TutorRoutes'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" exact Component={Hero} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
      </Routes>
    </div>
  )
}

export default App
