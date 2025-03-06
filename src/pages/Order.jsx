import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";
import useAPI from "../hooks/useAPI.jsx";
import PageHeader from "../components/PageHeader.jsx";

function Order() {
    const { placeOrder, self, fetchSelf } = useAPI();
    const [orderDto, setOrderDto] = useState({});
    const location = useLocation();
    const order = location.state?.order;
    const sessionId = location.state?.sessionId;
    console.log("sessionId", sessionId);

    useEffect(() => {
        fetchSelf();
    }, []);

    useEffect(() => {
        const orderDto = {
            profileId: self.id,
            items: Object.values(order).map((order_item) => {
                const { id, quantity } = order_item;
                return { menuItemId: id, quantity };
            }),
        };
        setOrderDto(orderDto);
    }, [self]);

    return (
        <>
          <PageHeader title="Bestellung" description="Prüfe noch einmal, ob alles stimmt" />
            {order &&
                Object.keys(order).map((id, index) => {
                    const { name, quantity, price } = order[id]; // Zugriff auf Menge und Preis
                    return (
                        <div
                            key={index}
                            className={`flex justify-between items-center bg-white w-full py-1 px-2 rounded ${index % 2 === 0 ? "bg-primary-light" : ""} bg-opacity-25`}
                        >
                            <Text type={"p"}>{name}</Text>
                            <div className="flex gap-2">
                                <Text type={"p"}>{quantity}x</Text>
                                <Text type={"p"}>{price}€</Text>
                            </div>
                        </div>
                    );
                })}
            <div className="h-[2px] w-full bg-black"></div>
            <div className="w-full flex justify-end items-center">
                <div className="flex flex-col items-end gap-4">
                    <Text type={"p"} bold clazzName={"mt-6"}>
                        Gesamt:{" "}
                        {order && Object.keys(order).length > 0
                            ? `${Object.values(order)
                                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                  .toFixed(2)} €`
                            : "0 €"}
                    </Text>
                    <Link to="/payment" className="mt-5" state={{ robin: order }}>
                        <Button
                            type="primary"
                            clazzName="mt-5"
                            onClick={() => placeOrder(sessionId, orderDto)}
                        >
                            Bezahlen
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Order;
