import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.scss";

// Components
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";

// Pages
import Orders from "./pages/Orders.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Room from "./pages/Room.jsx";
import NotFound from "./pages/NotFound.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </StrictMode>,
);
