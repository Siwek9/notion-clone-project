import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './routes/LoginPage';
import { Panel } from './routes/Panel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/panel" element={<Panel />} />
    </Routes>
  )
}

export default App
