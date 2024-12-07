import React, { useState } from "react";

// Components
import Text from "../components/Text";
import Box from "../components/Box";

const orders = [
    {
        id: 1,
        title: "Cheeseburger",
        details: "ohne Zwiebeln mit extra Käse",
        img: "https://img.chefkoch-cdn.de/rezepte/2561591400946434/bilder/1568567/crop-960x540/cheeseburger.jpg",
        room: "295820",
    },
    {
        id: 2,
        title: "Frischer Salat",
        details: "ohne Tomaten",
        img: "https://geschmacksuniversum.com/wp-content/uploads/2024/04/gemischter-salat-mit-dressing.webp",
        room: "295820",
    },
    {
        id: 3,
        title: "Pizza",
        details: "ohne Oliven mit extra Ananas",
        img: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067",
        room: "762920",
    },
    {
        id: 4,
        title: "Pasta",
        details: "ohne Käse",
        img: "https://www.leckerschmecker.me/wp-content/uploads/sites/6/2024/08/paprika-pasta-mit-feta.jpg",
        room: "095420",
    },
    {
        id: 5,
        title: "Sushi",
        details: "ohne Fisch",
        img: "https://crazy-sushi.de/wp-content/uploads/2021/07/crazy-sushi-Aachen-impressionen-27.jpg",
        room: "295820",
    },
];

function History() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold clazzName={"mb-4"}>
                    Dein Bestellungsverlauf ({ orders.length })
                </Text>
                <div className="relative flex flex-row gap-4 h-[500px]">
                    <div className="flex flex-col w-[50%] gap-1 overflow-y-auto pr-2">
                        {orders.map((order) => (
                            <Box
                                title={order.title}
                                details={order.details}
                                img={order.img}
                                button={"ansehen"}
                                room={order.room}
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
