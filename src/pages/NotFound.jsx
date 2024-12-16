import React from "react";
import { Link } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function NotFound() {
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="navMargin"></div>
            <Text type="h1">Dieser Raum existiert nicht.</Text>
            <Link to="/" className="mt-5">
                <Button type="primary">Zurück zur Startseite</Button>
            </Link>
        </div>
    );
}

export default NotFound;
