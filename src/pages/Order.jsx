import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import Text from "../components/Text";
import useAPI from "../hooks/useAPI.jsx";
import Page from "../components/Page.jsx";
import useUser from "../hooks/useUser.jsx";
import Button from "../components/Button.jsx";

function Order() {
    const { placeOrder, fetchSession } = useAPI();
    const { data: self } = useUser();
    const navigate = useNavigate();
    const [orderDto, setOrderDto] = useState({});
    const location = useLocation();
    const { order, payee, sessionId } = location.state;
    const moneyToPay = Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [deadline, setDeadline] = useState();

    useEffect(() => {
        fetchSession(sessionId).then((response) => {
            if (response.data) {
                setDeadline(new Date(response.data.deadline + "Z"));
            } else {
                navigate("/404");
            }
        });
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

    const submitOrder = () => {
        placeOrder(sessionId, orderDto).then(() =>
            navigate("/payment", {
                state: {
                    moneyToPay: moneyToPay,
                    payee: payee,
                },
            }),
        );
    };

    return (
        <Page title="Bestellung" description="Prüfe noch einmal, ob alles stimmt">
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
                    <Text type={"p"} bold className={"mt-6"}>
                        Gesamt: {moneyToPay.toFixed(2)} €
                    </Text>
                    <Button fill arrow className="mt-5" onClick={submitOrder} checkDisabled={() => deadline < new Date()}>
                        Bezahlen
                    </Button>
                </div>
            </div>
        </Page>
    );
}

export default Order;
