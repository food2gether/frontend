import React from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Login() {
  const location = useLocation();

  return (
      <div className="flex flex-col items-center mt-20 h-full">
        <div className="navMargin"></div>
        <Text type="h1">Login Page</Text>
        <Link reloadDocument to={"/oauth2/start" + location.search} className="mt-5">
          <Button type="primary" childrenClassess={"text-center px-5 py-1"} arrow={false}>
            Login with SSO
          </Button>
        </Link>
      </div>
  );
}

export default Login;
