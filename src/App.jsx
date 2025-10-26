import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import ParentsDashboard from './pages/ParentsDashboard';
import KidsMode from './pages/KidsMode';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Project Swifters</h1>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ParentsDashboard />} />
            <Route path="/kids" element={<KidsMode />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
