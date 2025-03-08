import React from "react";

// Components
import Button from "../components/Button";
import PageHeader from "../components/PageHeader.jsx";
import Page from "../components/Page.jsx";

function NotFound() {
    return (
        <Page
            title="Unbekannte Seite"
            description="Diese Seite existiert nicht. Hast du dich vlt vertippt?"
            className="flex flex-row justify-end"
        >
            <Button type="primary" link="/" slide>
                Zurück zur Startseite
            </Button>
        </Page>
    );
}

export default NotFound;
