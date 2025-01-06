import React, { useState } from "react";

// Components
import Text from "../components/Text";
import Box from "../components/Box";
import Button from "../components/Button";
import useUser from "../hooks/useUser";

function Orders() {
    const [state, setState] = useState(0); // 0: Bestellt, 1: In Bearbeitung, 2: Bestätigt
    const { orders, setOrders } = useUser()

    const handleNextState = () => {
        setState((prevState) => (prevState < 2 ? prevState + 1 : 0));
    };

    const progressWidth = `${(state / 2) * 100}%`;

    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold>
                    Bestellungen
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier siehst du deine aktiven Bestellungen.
                </Text>

                {orders && orders.length === 0 ? (
                    <Text type={"p"} clazzName={"text-gray-500"}>
                        Keine aktiven Bestellungen vorhanden.
                    </Text>
                ) : (
                    orders.map((orderItem, index) => (
                        <div
                            key={index}
                            className="bg-white border-solid border-2 border-primary p-10 rounded-lg"
                        >
                            <div>
                                <Text type={"h3"} bold>
                                    Bestellung {index + 1}
                                </Text>
                                <Text type={"h3"} bold clazzName={"float-right"}>
                                    {orderItem.id}
                                </Text>
                                <div>
                                    <Text type={"h3"} bold>
                                        {Object.entries(orderItem.order).map(
                                            (product) => (
                                                (
                                                    <div>
                                                        <div>
                                                            {product[1].quantity}x {product[0]} =
                                                            {product[1].price}
                                                        </div>
                                                    </div>
                                                )
                                            ),
                                        )}
                                    </Text>
                                </div>
                            </div>

                            <Text>Details: {orderItem.details || "Keine Details verfügbar"}</Text>
                            <div className="w-full mt-6 mb-6 relative flex items-center flex-col gap-2">
                                <div className="w-[95%] h-3 bg-gray-300 rounded-full relative">
                                    <div
                                        className={`h-full transition-all duration-300 ease-in-out bg-primary rounded-full`}
                                        style={{ width: progressWidth }}
                                    ></div>
                                    <div className="w-full relative -mt-4 -ml-2">
                                        <div
                                            className={`rounded-full left-0 w-5 h-5 absolute top-0 ${
                                                state >= 0 ? "bg-primary" : "bg-gray-300"
                                            }`}
                                        ></div>
                                        <div
                                            className={`rounded-full left-[50%] w-5 h-5 absolute top-0 ${
                                                state >= 1 ? "bg-primary" : "bg-gray-300"
                                            }`}
                                        ></div>
                                        <div
                                            className={`rounded-full left-[100%] w-5 h-5 absolute top-0 ${
                                                state >= 2 ? "bg-primary" : "bg-gray-300"
                                            }`}
                                        ></div>
                                    </div>
                                </div>

                                <div className="w-full flex justify-between mt-3">
                                    <Text
                                        clazzName={`${state >= 0 ? "text-primary" : "text-black"}`}
                                    >
                                        Bestellt
                                    </Text>
                                    <Text
                                        clazzName={`${state >= 1 ? "text-primary" : "text-black"}`}
                                    >
                                        In Bearbeitung
                                    </Text>
                                    <Text
                                        clazzName={`${state >= 2 ? "text-primary" : "text-black"}`}
                                    >
                                        Bestätigt
                                    </Text>
                                </div>
                            </div>

                            <Button
                                onClick={handleNextState}
                                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Nächster Schritt
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Orders;
