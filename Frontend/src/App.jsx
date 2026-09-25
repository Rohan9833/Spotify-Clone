import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import Upload from "./pages/upload.jsx";
import Navbar from "./pages/navbar.jsx";
import "./Styles/App.css";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-shell">
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? "page-content auth-page-content" : "page-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
