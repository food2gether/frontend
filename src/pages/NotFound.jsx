import React from "react";

// Components
import Button from "../components/Button";
import PageHeader from "../components/PageHeader.jsx";

function NotFound() {
    return (
        <>
            <PageHeader
                title="Unbekannte Seite"
                description="Diese Seite existiert nicht. Hast du dich vlt vertippt?"
            />
            <div className="flex flex-row justify-end">
                <Button type="primary" link="/" slide>
                    Zurück zur Startseite
                </Button>
            </div>
        </>
    );
}

export default NotFound;
