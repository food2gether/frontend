import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import NotFound from "./NotFound";
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Room() {

    const fetchAllRooms = async () => {
        try {
            const res = await fetch("/api/v1/restaurants", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }
            
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchAllRooms();
    }
    , []);

    const [selectedOrder, setSelectedOrder] = useState({});
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { validRooms, restaurants, setCurrentRoom } = useFood();
    const location = useLocation();
    const { restoID } = location.state || {};
    const { order, setOrder, moneyToPay, setMoneyToPay } = useUser();

    const restaurant = restaurants.find((restaurant) => restaurant.id === restoID);
    const products = restaurant?.menu || [];

    useEffect(() => {
        const total = Object.values(order || {}).reduce(
            (sum, { quantity, price }) => sum + quantity * price,
            0,
        );
        setMoneyToPay(total);
    }, [order, setMoneyToPay]);

    useEffect(() => {
        if (!validRooms.includes(roomId)) {
            navigate("/notfound");
        }
    }, [roomId, validRooms, navigate]);

    setCurrentRoom(roomId);

    const handleQuantityChange = (product, quantity) => {
        const newQuantity = Math.max(0, quantity);
        setSelectedOrder((prev) => ({
            ...prev,
            [product.item]: { quantity: newQuantity, price: product.price },
        }));

        setOrder((prevOrder) => {
            if (newQuantity === 0) {
                const { [product.item]: _, ...rest } = prevOrder;
                return rest;
            }
            return {
                ...prevOrder,
                [product.item]: { quantity: newQuantity, price: product.price },
            };
        });
    };

    const itemCount = Object.values(order || {}).reduce((acc, { quantity }) => acc + quantity, 0);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center mt-10">
                    <Text type="h1">Willkommen im Raum von {roomId}</Text>
                    <div className="flex flex-col items-center w-full h-auto bg-primary rounded-md p-5 my-10">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white w-full p-4 mb-3 rounded shadow"
                            >
                                <div>
                                    <Text type="p">{product.item}</Text>
                                    <Text type="p" clazzName="text-primary">
                                        {product.price} €
                                    </Text>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Text type="p">Anzahl:</Text>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-16 p-2 border rounded text-center text-black"
                                        value={selectedOrder[product.item]?.quantity || "0"}
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
                                                    (selectedOrder[product.item]?.quantity || 0) +
                                                        1,
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
                                                    (selectedOrder[product.item]?.quantity || 0) -
                                                        1,
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
                            {itemCount} Artikel im Warenkorb für {moneyToPay.toFixed(2)} €
                        </Text>
                        <Link to="/order" className="mt-5">
                            <Button
                                type="tertiary"
                                clazzName="mt-5"
                                onClick={() => console.log(order)}
                            >
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
