import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import useAPI from "../hooks/useAPI.jsx";
import Page from "../components/Page.jsx";
import useUser from "../hooks/useUser.jsx";
import Button from "../components/Button.jsx";
import OrderOverview from "../components/OrderOverview.jsx";

function Order() {
    const { placeOrder, fetchSession } = useAPI();
    const { data: self } = useUser();
    const navigate = useNavigate();
    const [orderDto, setOrderDto] = useState({});
    const location = useLocation();
    const { orderItems, payee, sessionId, menu } = location.state;
    const moneyToPay = orderItems.reduce((acc, item) => acc + menu[item.menuItemId] * item.quantity, 0);

    const [deadline, setDeadline] = useState(new Date(0));

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
            items: orderItems
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
            <OrderOverview orderItems={orderItems} menu={menu} />
            <div className="flex justify-end w-full">
                <Button fill arrow className="mt-5" onClick={submitOrder} checkDisabled={() => deadline < new Date()}>
                    Bezahlen
                </Button>
            </div>
        </Page>
    );
}

export default Order;
