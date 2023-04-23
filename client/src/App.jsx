import './App.css'
import Hero from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/user/SignIn'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact Component={Hero} />
        <Route path="/signin" exact Component={SignIn} />
      </Routes>
    </>
  )
}

export default App
