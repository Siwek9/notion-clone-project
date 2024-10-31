import './App.css'
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './routes/LoginPage';
import { Panel } from './routes/Panel';
import { Profile } from './routes/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/panel" element={<Panel />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
