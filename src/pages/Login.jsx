import React, { useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useUser } from "../hooks/useUser";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Icons
import { FaGithub } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loggedIn, setLoggedIn } = useUser();

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
        <div className="flex flex-col items-center mt-20">
            <div className="navMargin"></div>
            <Text type="h1">Login Page</Text>
            {/* <input
                type="text"
                placeholder="Email"
                className="border border-gray-300 px-5 py-[10px] rounded-xl text-black w-[20%] text-lg mt-8"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 px-5 py-[10px] rounded-xl mt-1 text-black w-[20%] text-lg"
                value={password}
                onChange={handlePasswordChange}
            /> */}
            <Link to="/profile" className="mt-10" onClick={handleLogin}>
                <Button type="primary" childrenClassess={"text-center px-5 py-1 flex items-center"} arrow={false}>Login mit GitHub <FaGithub className="ml-2" /></Button>
            </Link>
        </div>
    );
}

export default Login;
