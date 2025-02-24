import React from "react";
import { Link } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Logout() {
    return (
        <div className="flex flex-col items-center mt-20">
            <div className="navMargin"></div>
            <Text type="h1">Du wurdest erfolgreich ausgeloggt.</Text>
        </div>
    );
}

export default Logout;
