import React, { useEffect } from "react";
import qrcode from "qrcode-generator";

// Components
import Text from "../components/Text";
import { useLocation } from "react-router-dom";

function Payment() {
    const location = useLocation();
    const order = location.state?.robin;

    const moneyToPay = order && Object.keys(order).length > 0
        ? `${Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0)}`
        : 0.00;

    // QR-Code generieren
    useEffect(() => {
        var typeNumber = 4;
        var errorCorrectionLevel = "L";
        var cellSize = 14;
        var margin = 0;

        var data = "https://www.paypal.com/paypalme/robinahnn/" + moneyToPay + "EUR";

        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(data);
        qr.make();
 
        document.getElementById("qrcode").innerHTML = qr.createSvgTag(cellSize, margin);
    }, []);

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
                        id="qrcode"
                    ></a>
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
