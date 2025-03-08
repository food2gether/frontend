import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./style.scss";

// Components
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages
import Home, { PATH as HOME_PATH } from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import SessionView from "./pages/SessionView.jsx";
import NotFound from "./pages/NotFound.jsx";
import Payment from "./pages/Payment.jsx";

// Providers
import Login from "./pages/Login.jsx";
import { APIProvider } from "./hooks/useAPI.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import SessionCreate from "./pages/SessionCreate.jsx";
import SessionManage from "./pages/SessionManage.jsx";
import ProfileEdit from "./pages/ProfileEdit.jsx";

const App = () => {
    return (
        <Router>
            <APIProvider>
                <UserProvider>
                    <ScrollToTop />
                    <Navbar />
                    <div className={"container mt-[80px]"}>
                        <Routes>
                            <Route path={HOME_PATH} element={<Home />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/profile/edit" element={<ProfileEdit />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/profile/" element={<Navigate to={"/profile/me"} />} />
                            <Route path="/session/new" element={<SessionCreate />} />
                            <Route path="/session/:sessionId" element={<SessionView />} />
                            <Route path="/session/:sessionId/manage" element={<SessionManage />} />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Navigate to={"/404"} />} />
                        </Routes>
                    </div>
                </UserProvider>
            </APIProvider>
        </Router>
    );
};

// Hier wird UserProvider um App gesetzt
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
