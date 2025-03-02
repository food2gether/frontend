import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRouteWrapper from "./pages/ProtectedRouteWrapper.jsx";

// Providers
import { FoodProvider } from "./hooks/useFood.jsx";
import useUser, { UserProvider } from "./hooks/useUser.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";

const App = () => {
    const { state } = useUser();

    return (
        <Router>
            <FoodProvider>
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/room/:roomId" element={<Room />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </FoodProvider>
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
