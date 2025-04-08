import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import ProfileView from "./pages/profile/ProfileView.jsx";
import SessionView from "./pages/session/SessionView.jsx";
import NotFound from "./pages/NotFound.jsx";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/Login.jsx";
import SessionNew from "./pages/session/SessionNew.jsx";
import SessionManage from "./pages/session/SessionManage.jsx";
import ProfileEdit from "./pages/profile/ProfileEdit.jsx";
import { APIProvider } from "./hooks/useAPI.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import RestaurantView from "./pages/restaurants/RestaurantView.jsx";
import RestaurantEdit from "./pages/restaurants/RestaurantEdit.jsx";
import RestaurantList from "./pages/restaurants/RestaurantList.jsx";
import Footer from "./components/Footer.jsx";
import SessionOverview from "./pages/session/SessionOverview.jsx";

const App = () => {
    return (
        <Router>
            <APIProvider>
                <UserProvider>
                    <ScrollToTop />
                    <Navbar />
                    <div className={"relative max-w-[1200px] print:max-w-full mx-auto pt-32 pb-5 w-[70%] print:w-full"}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/login" element={<Login />} />

                            <Route path="/profile/edit" element={<ProfileEdit />} />
                            <Route path="/profile/:id" element={<ProfileView />} />
                            <Route path="/profile/" element={<Navigate to={"/profile/me"} />} />

                            <Route path="/session/new" element={<SessionNew />} />
                            <Route path="/session/:sessionId" element={<SessionView />} />
                            <Route path="/session/:sessionId/manage" element={<SessionManage />} />
                            <Route path="/session/:sessionId/overview" element={<SessionOverview />} />

                            <Route path="/restaurants" element={<RestaurantList />} />
                            <Route path="/restaurants/edit" element={<RestaurantEdit />} />
                            <Route path="/restaurants/:id" element={<RestaurantView />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </UserProvider>
            </APIProvider>
        </Router>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
