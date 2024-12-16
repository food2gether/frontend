import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

// Components
import Text from "../components/Text";
import Button from "../components/Button";
import Box from "../components/Box";
import NotFound from "./NotFound";

// Hooks
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Room() {
    const [selectedOrder, setSelectedOrder] = useState({});
    const { roomId } = useParams();
    const { validRooms, restaurants } = useFood();

    const location = useLocation();
    const { restoID } = location.state || {};

    const [restaurantID, setRestaurantID] = useState(restoID);
    const restaurant = restaurants.find((restaurant) => restaurant.id === restaurantID);
    const products = restaurant?.menu?.map((product) => product.item) || [];

    const { order, setOrder } = useUser();

    // Prüfen, ob der Raum existiert ansonsten NotFound anzeigen
    if (!validRooms.includes(roomId)) {
        return <NotFound />;
    }

    // Anzahl für ein bestimmtes Produkt aktualisieren
    const handleQuantityChange = (product, quantity) => {
        const newQuantity = Math.max(0, quantity); // Sicherstellen, dass die Anzahl nicht negativ wird

        // Update selectedOrder State
        setSelectedOrder((prev) => ({
            ...prev,
            [product]: newQuantity,
        }));

        // Update die globale Bestellung
        setOrder((prevOrder) => {
            if (newQuantity === 0) {
                // Produkt aus der Bestellung entfernen
                const { [product]: _, ...rest } = prevOrder;
                return rest;
            }

            // Produkt zur Bestellung hinzufügen oder aktualisieren
            return {
                ...prevOrder,
                [product]: newQuantity,
            };
        });
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
                                                    (selectedOrder[product] || 0) + 1, // Anzahl um 1 erhöhen
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
                                                    (selectedOrder[product] || 0) - 1, // Anzahl um 1 verringern
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
                        <Link to="/order" className="mt-5">
                            <Button type="tertiary" clazzName="mt-5" onClick={() => console.log(order)}>
                                Bestellung abschicken
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;
