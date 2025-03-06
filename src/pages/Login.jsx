import React from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import Button from "../components/Button";
import PageHeader from "../components/PageHeader.jsx";

function Login() {
    const location = useLocation();

    return (
        <>
            <PageHeader title="Login" description="Bitte logge dich ein, um fortzufahren." />
            <div className="flex flex-col items-center mt-20 h-full">
                <Link reloadDocument to={"/oauth2/start" + location.search} className="mt-5">
                    <Button type="primary" childrenClassess={"text-center px-5 py-1"} arrow={false}>
                        Login with SSO
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Login;
