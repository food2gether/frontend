import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loggedIn } from "../hooks/useUser.jsx";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

function Login() {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    const redirectPath = searchParams.get("rd") || "/";

    useEffect(() => {
        if (loggedIn()) {
            navigate(redirectPath);
        }
    }, []);

    return (
        <Page title="Login" description="Bitte logge dich ein, um fortzufahren." className="flex flex-col items-center mt-20 h-full">
            <Button fill onClick={() => (window.location.href = `/oauth2/start?rd=${encodeURIComponent(redirectPath)}`)} className={"mt-5"}>
                Mit SSO anmelden
            </Button>
        </Page>
    );
}

export default Login;
