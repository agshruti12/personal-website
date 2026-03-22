import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PortfolioPage from './pages/PortfolioPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import './App.css'

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    document.getElementById('root')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
