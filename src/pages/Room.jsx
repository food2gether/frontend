import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import NotFound from "./NotFound";
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { rooms, restaurant, menu } = useFood();
    const [order, setOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        console.log("Räume: ", rooms);
        if (!rooms.find((room) => room.id === parseInt(roomId))) {
            navigate("/notfound");
        }
    }, [roomId, rooms, navigate]);

    const handleQuantityChangePlus = (product) => {
        setOrder((prev) => ({
            ...prev,
            [product.name]: {
                ...prev[product.name],
                quantity: (prev[product.name]?.quantity || 0) + 1,
                price: (product.price/100).toFixed(2),
            },
        }));
    }

    const handleQuantityChangeMinus = (product) => {
        setOrder((prev) => ({
            ...prev,
            [product.name]: {
                ...prev[product.name],
                quantity: Math.max((prev[product.name]?.quantity || 0) - 1, 0),
                price: (product.price/100).toFixed(2),
            },
        }));
    }
    useEffect(() => {
        console.log("Bestellung: ", order);
        const total = Object.values(order).reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);
        setTotalPrice(total);
    }, [order]);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center mt-10">
                    <Text type="h1">Willkommen im Raum von {roomId}</Text>
                    <Text type="h2">Restaurant: {restaurant.displayName}</Text>
                    {console.log("Menu: ", menu)}
                    {menu?.map((product, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white w-full p-4 mb-3 rounded shadow"
                        >
                            <div>
                                <Text type="p">{product.name}</Text>
                                <Text type="p" clazzName="text-primary">
                                    {(product.price/100).toFixed(2)} €
                                </Text>
                            </div>
                            <div className="flex items-center gap-4">
                                <Text type="p">Anzahl:</Text>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-16 p-2 border rounded text-center text-black"
                                    value={order[product.name]?.quantity || "0"}
                                    onChange={(e) =>
                                        setOrder((prev) => ({
                                            ...prev,
                                            [product.name]: {
                                                ...prev[product.name],
                                                quantity: parseInt(e.target.value) || 0,
                                            },
                                        }))
                                    }
                                />
                                <div className="flex flex-col gap-1">
                                    <button
                                        className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                                        onClick={() => handleQuantityChangePlus(product)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                                        onClick={() => handleQuantityChangeMinus(product)}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Text type="p" clazzName="mt-2">
                        {order && Object.keys(order).length > 0
                            ? `Gesamtpreis: ${totalPrice.toFixed(2)} €`
                            : "Bitte wähle etwas aus!"}
                    </Text>
                    <Link to="/order" state={{ robin: order }}>
                        <Button type="primary" clazzName="mt-5" onClick={() => console.log(order)}>
                            Bestellung abschicken
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Room;
