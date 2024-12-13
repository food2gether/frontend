import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";
import Box from "../components/Box";
import NotFound from "./NotFound";

function Room() {
    const [selectedOrder, setSelectedOrder] = useState({});
    const { roomId } = useParams();

    const validRooms = ["robin", "marvin", "kaan", "nicola", "jo"];

    if (!validRooms.includes(roomId)) {
        return <NotFound />;
    }

    // Liste der Essensprodukte
    const products = [
        "Pizza Margherita",
        "Spaghetti Bolognese",
        "Caesar Salad",
        "Sushi Set",
        "Veggie Burger",
        "Chicken Wings",
        "Pad Thai",
        "Tacos",
        "Ramen",
        "Chocolate Cake",
    ];

    // Anzahl für ein bestimmtes Produkt aktualisieren
    const handleQuantityChange = (product, quantity) => {
        setSelectedOrder((prev) => ({
            ...prev,
            [product]: Math.max(0, quantity), // Sicherstellen, dass die Anzahl nicht negativ wird
        }));
    };

    // Anzahl der Artikel im Warenkorb
    const itemCount = Object.values(selectedOrder).reduce((acc, curr) => acc + curr, 0);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center mt-10">
                    <Text type="h1">Willkommen im Raum von {roomId}</Text>
                    <div className="flex flex-col items-center w-full h-auto bg-primary rounded-md p-5 mt-10">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white w-full p-4 mb-3 rounded shadow"
                            >
                                <Text type="p">{product}</Text>
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <Text type="p">Anzahl:</Text>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-16 p-2 border rounded text-center text-black"
                                        value={selectedOrder[product] || "0"}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                product,
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                    />
                                    <div className="flex flex-col gap-1">
                                        <button
                                            className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product,
                                                    (selectedOrder[product] || 0) + 1,
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                        <button
                                            className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product,
                                                    (selectedOrder[product] || 0) - 1,
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Text type="p" clazzName="mt-2" light>
                            {itemCount} Artikel im Warenkorb
                        </Text>
                        <Button type="tertiary" clazzName="mt-5">
                            Bestellung abschicken
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;
