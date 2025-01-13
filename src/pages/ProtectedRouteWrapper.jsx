import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouteWrapper = ({ allowedState, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!allowedState) {
            navigate("/notfound");
        }
    }, [allowedState, navigate]);

    if (allowedState) {
        return children;
    }

    return null; // Fallback-Render
};

export default ProtectedRouteWrapper;
