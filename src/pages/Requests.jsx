import React, { useState } from "react";

// Components
import Text from "../components/Text";
import Box from "../components/Box";
import Button from "../components/Button";

// Hooks
import { useUser } from "../hooks/useUser";

function Requests() {
    const { userOrders, setUserOrders } = useUser();

    console.log(userOrders);
    return (
        <div className="navMargin">
            <div className="container">
                <Text type="h2">Anfragen</Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du deine Anfragen sehen.
                </Text>
                {userOrders.map((userOrder) => (
                    <div className="border border-gray-200 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-10">
                            <img src={userOrder.profilePic} alt={userOrder.name} className="w-20 h-20 rounded-full border border-gray-200" />
                            <Text type="h2">{userOrder.name}</Text>
                            </div>
                            <Text type="h2" clazzName={"mr-4"}>{userOrder.totalPrice} €</Text>
                        </div>
                        <div className="border border-gray-200 p-4 rounded-lg mt-4">
                            <Button type={"primary"} arrow={false} clazzName={"!bg-red-500 mr-2"}>ablehnen</Button>
                            <Button type={"primary"} arrow={false} clazzName={"!bg-green-500"}>bezahlt</Button>
                            {/* <Text type="h3">Order:</Text>
                            {userOrder.order.map((order) => (
                                <div className="border border-gray-200 p-4 rounded-lg mt-4">
                                    <Text type="h4">Date: {order.date}</Text>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <Text type="h5">Item</Text>
                                        <Text type="h5">Price</Text>
                                        <Text type="h5">Quantity</Text>
                                        {order.items.map((item) => (
                                            <>
                                                <Text type="p">{item.name}</Text>
                                                <Text type="p">{item.price} €</Text>
                                                <Text type="p">{item.quantity}</Text>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Requests;
