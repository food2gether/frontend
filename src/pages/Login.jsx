import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Button from "../components/Button";
import { loggedIn } from "../hooks/useUser.jsx";
import Page from "../components/Page.jsx";

function Login() {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    const redirectPath = searchParams.get("rd") || "/";

    if (loggedIn()) {
        navigate(redirectPath);
    }

    return (
        <Page title="Login" description="Bitte logge dich ein, um fortzufahren.">
            <Link
                reloadDocument
                to={`/oauth2/start?rd=${encodeURIComponent(redirectPath)}`}
                className="mt-5"
            >
                <Button type="primary" childrenClassess={"text-center px-5 py-1"} arrow={false}>
                    Mit SSO anmelden
                </Button>
            </Link>
        </Page>
    );
}

export default Login;
