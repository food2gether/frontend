import React from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const { loggedIn, setLoggedIn } = useUser();
    const location = useLocation();

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };
    //
    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // };
    //
    // const handleLogin = () => {
    //     setLoggedIn(true);
    // };

    return (
        <div className="flex flex-col items-center mt-20 h-full">
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
            <Link reloadDocument to={"/oauth2/start" + location.search} className="mt-5">
                <Button type="primary" childrenClassess={"text-center px-5 py-1"} arrow={false}>
                    Login with SSO
                </Button>
            </Link>
        </div>
    );
}

export default Login;