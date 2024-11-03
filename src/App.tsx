import './App.css'
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './routes/LoginPage';
import { Panel } from './routes/Panel';
import { Profile } from './routes/Profile';
import { RegisterPage } from './routes/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/panel" element={<Panel />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
