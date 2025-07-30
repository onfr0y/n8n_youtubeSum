import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import './App.css'
import VoiceAiPage from './Pages/VoiceAiPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Add more <Route> elements here for other pages */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
