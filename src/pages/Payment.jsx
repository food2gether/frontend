import React from "react";

// Components
import Text from "../components/Text";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import PageHeader from "../components/PageHeader.jsx";

function Payment() {
    const location = useLocation();
    const order = location.state?.robin;

    const moneyToPay =
        order && Object.keys(order).length > 0
            ? `${Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0)}`
            : 0.0;

    return (
        <>
            <PageHeader title="Bestellung abgeschlossen" />
            <div className="w-full h-full flex flex-col items-center justify-center mt-10">
                <Text type="h1" clazzName="mb-10">
                    Das macht dann {parseFloat(moneyToPay)?.toFixed(2)}€
                </Text>
                <a
                    href={`https://www.paypal.com/paypalme/robinahnn/${moneyToPay}EUR`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <QRCode
                        value={`https://www.paypal.com/paypalme/robinahnn/${moneyToPay}EUR`}
                        level={"M"}
                    />
                </a>
                <Text type="p" clazzName="mt-10 max-w-[400px]" center>
                    Klicke oder Scanne den QR-Code, um zu bezahlen.
                </Text>
            </div>
        </>
    );
}

export default Payment;
