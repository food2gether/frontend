import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Hooks
import { useUser } from "../hooks/useUser";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loggedIn, setLoggedIn } = useUser();
    const [ location, setLocation ] = useLocation();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        setLoggedIn(true);
    }

    return (
        <div className="flex flex-col items-center mt-20 h-full">
            <div className="navMargin"></div>
            <Text type="h1">Login Page</Text>
            <Link to={"/oauth2/start" + location.search} className="mt-5" onClick={handleLogin}>
                <Button type="primary" childrenClassess={"text-center px-5 py-1"} arrow={false}>Login with SSO</Button>
            </Link>
        </div>
    );
}

export default Login;