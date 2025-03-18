import React from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

function NotFound() {
    return (
        <Page title="Unbekannte Seite" description="Diese Seite existiert nicht. Hast du dich vlt vertippt?" className="flex flex-row justify-end">
            <Button fill arrow linkTo="/">
                Zurück zur Startseite
            </Button>
        </Page>
    );
}

export default NotFound;
