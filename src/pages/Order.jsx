import React from "react";

// Components
import Text from "../components/Text";

// Hooks
import { useUser } from "../hooks/useUser";
import Button from "../components/Button";

function Order() {
    const { order, setOrder } = useUser();

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
                    Object.keys(order).map((product, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white w-full mb-6 rounded"
                        >
                            <Text type={"p"}>
                                {order[product]}x&nbsp;&nbsp;{product}
                            </Text>
                            <Text type={"p"}>5€</Text>
                        </div>
                    ))}
                <div className="h-[2px] w-full bg-black"></div>
                <div className="w-full flex justify-end items-center">
                    <div className="flex flex-col items-end gap-4">
                        <Text type={"p"} bold clazzName={"mt-6"}>
                            {/* {Object.values(order).reduce((acc, curr) => acc + curr, 0)} */} 10€
                        </Text>
                        <Button type={"button"}>Bestellen</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
