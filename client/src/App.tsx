import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Laptops } from './pages/Laptops'
import { Antivirus } from './pages/Antivirus'
import './index.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/laptops" element={<Laptops />} />
                <Route path="/antivirus" element={<Antivirus />} />
            </Routes>
        </Router>
    )
}

export default App
