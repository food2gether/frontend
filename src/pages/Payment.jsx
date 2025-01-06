import React, { useEffect } from "react";
import qrcode from "qrcode-generator";

// Components
import Text from "../components/Text";

// Hooks
import { useUser } from "../hooks/useUser";

function Payment() {
    const { moneyToPay, state } = useUser();

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
    }),
        [];

    return (
        <div className="navMargin">
            <div className="container">
                <div className="w-full h-full flex flex-col items-center justify-center mt-10">
                    <Text type="h1" clazzName="mb-10">
                        Du musst {moneyToPay} € zahlen!
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
