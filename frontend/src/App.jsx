import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudySession from "./pages/StudySession";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import TestAPI from "./pages/TestAPI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study-session" element={<StudySession />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/test" element={<TestAPI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;