import React from "react";

// Components
import Text from "../components/Text";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

function Payment() {
    const location = useLocation();
    const order = location.state?.robin;

    const moneyToPay =
        order && Object.keys(order).length > 0
            ? `${Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0)}`
            : 0.0;

    return (
        <div className="navMargin">
            <div className="container">
                <div className="w-full h-full flex flex-col items-center justify-center mt-10">
                    <Text type="h1" clazzName="mb-10">
                        Du musst {parseFloat(moneyToPay)?.toFixed(2)} € zahlen!
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
                        Bitte scanne den QR-Code, um zu bezahlen, oder klicke auf den QR-Code um die
                        Seite in einem neuen Tab zu öffnen.
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default Payment;
