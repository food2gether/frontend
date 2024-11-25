import React from "react";

// Components
import Text from "../components/Text";
import Box from "../components/Box";

const orders = [
    {
        id: 1,
        title: "Order #1",
        details: "Order details here",
    },
    {
        id: 2,
        title: "Order #2",
        details: "Order details here",
    },
    {
        id: 3,
        title: "Order #3",
        details: "Order details here",
    },
];

function Orders() {
    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold clazzName={"mb-4"}>
                    Orders
                </Text>
                <div className="flex flex-row justify-between items-center w-full gap-1">
                    <div className="flex-1 border-solid border-2 border-red-500">
                        {orders.map((orders) => (
                            <Box
                                title={orders.title}
                                details={orders.details}
                                button={"ansehen"}
                                key={orders.id}
                            />
                        ))}
                    </div>
                    <div className="flex-1 border-solid border-2 border-red-500">
                        <img src="/assets/hand.png"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
