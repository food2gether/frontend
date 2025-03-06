import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.scss";

// Components
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import Order from "./pages/Order.jsx";
import Requests from "./pages/Requests.jsx";
import Profile from "./pages/Profile.jsx";
import Room from "./pages/Room.jsx";
import NotFound from "./pages/NotFound.jsx";
import Payment from "./pages/Payment.jsx";

// Providers
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import { APIProvider } from "./hooks/useAPI.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import RoomNew from "./pages/RoomNew.jsx";

const App = () => {
    return (
        <Router>
            <APIProvider>
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/room/new" element={<RoomNew />} />
                    <Route path="/room/:roomId" element={<Room />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </APIProvider>
        </Router>
    );
};

// Hier wird UserProvider um App gesetzt
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </StrictMode>,
);
