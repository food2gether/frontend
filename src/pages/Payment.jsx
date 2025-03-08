import React from "react";

// Components
import Text from "../components/Text";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import Button from "../components/Button.jsx";
import Page from "../components/Page.jsx";

function Payment() {
    const location = useLocation();
    const { moneyToPay, payee } = location.state;

    const paypalLink = `https://www.paypal.com/paypalme/${payee}/${moneyToPay}EUR`;

    return (
        <Page
            title="Bestellung abgeschlossen"
            className="w-full h-full flex flex-col items-center justify-center gap-10 mt-10"
        >
            <Text type="h1">Das macht dann {parseFloat(moneyToPay).toFixed(2)}€</Text>
            <a href={paypalLink} target="_blank" rel="noreferrer">
                <QRCode value={paypalLink} level={"M"} />
            </a>
            <Text type="p" className="max-w-[400px]" center>
                Klicke oder Scanne den QR-Code, um zu bezahlen.
            </Text>

            <Button slide link="/">
                Zurück zur Startseite
            </Button>
        </Page>
    );
}

export default Payment;
