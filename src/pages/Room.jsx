import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import { LOADING_USER, useAPI } from "../hooks/useAPI";
import PageHeader from "../components/PageHeader.jsx";

function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { fetchRoom, fetchUser, fetchRestaurant, fetchMenu } = useAPI();

    const [room, setRoom] = useState();
    const [restaurant, setRestaurant] = useState({});
    const [deadline, setDeadline] = useState(new Date());
    const [organizer, setOrganizer] = useState({ ...LOADING_USER });
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            let room = await fetchRoom(roomId, setRoom);
            if (!room) {
                navigate("/notfound");
            } else {
                setDeadline(new Date(room.deadline));
            }
        };
        fetch();
    }, [fetchRoom, roomId, navigate]);

    useEffect(() => {
        if (room) {
            fetchUser(room.organizerId, setOrganizer);
        }
    }, [fetchUser, room]);

    useEffect(() => {
        if (room) {
            fetchRestaurant(room.restaurantId, setRestaurant);
        }
    }, [fetchRestaurant, room]);

    useEffect(() => {
        if (room) {
            fetchMenu(room.restaurantId, setMenu);
        }
    }, [fetchMenu, room]);

    useEffect(() => {
        const total = Object.values(order).reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);
        setTotalPrice(total);
    }, [order]);

    const updateQuantity = (product, quantity) => {
        if (quantity === 0) {
            const { [product.id]: _, ...rest } = order;
            setOrder(rest);
            return;
        }
        setOrder((prev) => ({
            ...prev,
            [product.id]: {
                ...product,
                quantity: quantity,
                price: (product.price / 100).toFixed(2),
            },
        }));
    };

    const handleQuantityChangePlus = (product) => {
        const newQuantity = Math.max((order[product.id]?.quantity || 0) + 1, 0);
        updateQuantity(product, newQuantity);
    };

    const handleQuantityChangeMinus = (product) => {
        const newQuantity = Math.max((order[product.id]?.quantity || 0) - 1, 0);
        updateQuantity(product, newQuantity);
    };

    return (
        <>
          <PageHeader title={`Bestelle mit ${organizer.displayName} bei ${restaurant.displayName}`} description={`Offen bis ${deadline?.toLocaleDateString()} um ${deadline?.toLocaleTimeString()}`} />
            <div className="flex flex-col items-center mt-10">
                {menu?.map((product) => (
                    <div
                        key={product.id}
                        className="flex justify-between items-center bg-white w-full p-4 mb-3 rounded-2xl border-primary border"
                    >
                        <div>
                            <Text type="h5">{product.name}</Text>
                            <Text type="p" clazzName={"mb-2"}>
                                {product.description}
                            </Text>
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
                                value={order[product.id]?.quantity || "0"}
                                onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
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
                <Button
                    type="primary"
                    disabled={totalPrice <= 0}
                    clazzName="mt-10"
                    onClick={() => console.log(order)}
                >
                    <Link to="/order" state={{ order: order, sessionId: roomId }}>
                        Bestellung abschicken
                    </Link>
                </Button>
            </div>
        </>
    );
}

export default Room;
