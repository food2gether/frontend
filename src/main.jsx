import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./style.scss";

// Components
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import Room from "./pages/Room.jsx";
import NotFound from "./pages/NotFound.jsx";
import Payment from "./pages/Payment.jsx";

// Providers
import Login from "./pages/Login.jsx";
import { APIProvider } from "./hooks/useAPI.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import RoomNew from "./pages/RoomNew.jsx";
import RoomManage from "./pages/RoomManage.jsx";
import ProfileSetup from "./pages/ProfileSetup.jsx";

const App = () => {
    return (
        <Router>
            <APIProvider>
                <ScrollToTop />
                <Navbar />
                <div className="navMargin"></div>
                <div className={"container"}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/payment" element={<Payment />} />
                        {/*<Route path="/profile/setup" element={<ProfileSetup />} />*/}
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/profile/" element={<Navigate to={"/profile/me"} />} />
                        <Route path="/room/new" element={<RoomNew />} />
                        <Route path="/room/:roomId" element={<Room />} />
                        <Route path="/room/:roomId/manage" element={<RoomManage />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to={"/404"} />} />
                    </Routes>
                </div>
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
