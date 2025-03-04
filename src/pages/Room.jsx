import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import NotFound from "./NotFound";
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Room() {
    const location = useLocation();
    const { roomId, userName, restaurantId } = location.state || {};
    const navigate = useNavigate();
    const { rooms, fetchRestaurant, fetchMenu } = useFood();
    const [order, setOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState([]);

    useEffect(() => {
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
                price: (product.price / 100).toFixed(2),
            },
        }));
    };

    const handleQuantityChangeMinus = (product) => {
        setOrder((prev) => ({
            ...prev,
            [product.name]: {
                ...prev[product.name],
                quantity: Math.max((prev[product.name]?.quantity || 0) - 1, 0),
                price: (product.price / 100).toFixed(2),
            },
        }));
    };
    useEffect(() => {
        const total = Object.values(order).reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);
        setTotalPrice(total);
    }, [order]);

    useEffect(() => {
        const fetchData = async () => {
            const restaurantData = await fetchRestaurant(restaurantId);
            setRestaurant(restaurantData);
            const menuData = await fetchMenu(restaurantId);
            setMenu(menuData);
        };
        fetchData();
    }, [fetchRestaurant, restaurantId]);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center mt-10">
                    <Text type="h1">Willkommen im Raum von {userName}</Text>
                    <Text type="h2" clazzName={"mb-14 text-primary font-normal"}>
                        Restaurant: {restaurant.displayName}
                    </Text>
                    {menu?.map((product, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white w-full p-4 mb-3 rounded-2xl border-primary border"
                        >
                            <div>
                                <Text type="p">{product.name}</Text>
                                <Text type="p" clazzName="text-primary">
                                    {(product.price / 100).toFixed(2)} €
                                </Text>
                            </div>
                            <div className="flex items-center gap-4">
                                <Text type="p">Anzahl:</Text>
                                <input
                                    type="text"
                                    min="0"
                                    className="w-8 text-black outline-none border-none"
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
                    <Text type="h2" bold clazzName="mt-10">
                        {order && Object.keys(order).length > 0
                            ? `Gesamtpreis: ${totalPrice.toFixed(2)} €`
                            : "Bitte wähle etwas aus!"}
                    </Text>
                    <Link to="/order" state={{ robin: order }}>
                        <Button type="primary" clazzName="mt-10" onClick={() => console.log(order)}>
                            Bestellung abschicken
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Room;
