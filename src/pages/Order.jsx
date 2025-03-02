import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Order() {

    const location = useLocation();
    const order = location.state?.robin;

    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold>
                    Bestellung
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du deine Bestellung überprüfen.
                </Text>
                {order &&
                    Object.keys(order).map((product, index) => {
                        const { quantity, price } = order[product]; // Zugriff auf Menge und Preis
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white w-full mb-6 rounded"
                            >
                                <Text type={"p"}>
                                    {quantity}x&nbsp;&nbsp;{product}
                                </Text>
                                <Text type={"p"}>{price}€</Text>
                            </div>
                        );
                    })}
                <div className="h-[2px] w-full bg-black"></div>
                <div className="w-full flex justify-end items-center">
                    <div className="flex flex-col items-end gap-4">
                        <Text type={"p"} bold clazzName={"mt-6"}>
                            Gesamt: {order && Object.keys(order).length > 0 
                                ? `${(Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)} €`
                                : "0 €"}
                        </Text>
                        <Link to="/payment" className="mt-5" state={{ robin: order }}>
                            <Button type="primary" clazzName="mt-5" onClick={() => console.log(order)}>
                                Bezahlen
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
