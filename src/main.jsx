import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.scss";

// Components
import App from "./App.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    </StrictMode>,
);
