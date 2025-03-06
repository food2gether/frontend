import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import { LOADING_USER, useAPI } from "../hooks/useAPI";
import PageHeader from "../components/PageHeader.jsx";

function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { self, fetchOrders, fetchRoom, fetchUser, fetchSelf, fetchRestaurant, fetchMenu } =
        useAPI();

    const [room, setRoom] = useState();
    const [restaurant, setRestaurant] = useState({});
    const [deadline, setDeadline] = useState(new Date());
    const [organizer, setOrganizer] = useState({ ...LOADING_USER });
    const [menu, setMenu] = useState({});
    const [order, setOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [ownOrders, setOwnOrders] = useState([]);

    useEffect(() => {
        fetchSelf();
    }, []);

    useEffect(() => {
        if (self) {
            fetchOrders({ sessionId: roomId, profileId: self.id }, setOwnOrders);
        }
    }, [self]);

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
            fetchMenu(room.restaurantId, (menu_arr) => {
                const menu_map = menu_arr?.reduce((menu_map, menu_item) => {
                    menu_map[menu_item.id] = menu_item;
                    return menu_map;
                }, {});
                setMenu(menu_map);
            });
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
            <div className={"flex flex-row justify-between items-center"}>
                <PageHeader
                    title={`Bestelle mit ${organizer.displayName} bei ${restaurant.displayName}`}
                    description={`Offen bis ${deadline?.toLocaleDateString()} um ${deadline?.toLocaleTimeString()}`}
                />
                {self?.id === room?.organizerId && (
                    <Button link={`/room/${roomId}/manage`}>Verwalten</Button>
                )}
            </div>
            <div className="flex flex-row gap-5 mt-10">
                <div className="flex flex-col items-center">
                    {Object.values(menu).map((product) => (
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
                                    onChange={(e) =>
                                        updateQuantity(product, parseInt(e.target.value))
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
                    <Button
                        type="primary"
                        disabled={totalPrice <= 0}
                        clazzName="mt-10"
                        onClick={() => console.log(order)}
                    >
                        <Link to="/order" state={{ order: order, sessionId: roomId, payee: organizer.name }}>
                            Bestellung abschicken
                        </Link>
                    </Button>
                </div>
                {ownOrders && ownOrders.length > 0 && (
                    <div className="flex flex-col items-center">
                        <Text type={"h4"} clazzName={"mb-5"}>
                            Deine Bestellungen
                        </Text>
                        {ownOrders?.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col justify-between bg-white w-full p-4 mb-3 rounded-2xl border-primary border"
                            >
                                <div className="flex flex-col">
                                    {order?.items?.map((item) => (
                                        <Text key={item.id}>
                                            {item.quantity}x {menu[item.menuItemId]?.name}
                                        </Text>
                                    ))}
                                </div>
                                <Text clazzName="self-end border-t-4 border-primary">
                                    {order?.items
                                        ?.map((item) => ({
                                            quantity: item.quantity,
                                            price: menu[item.menuItemId]?.price / 100,
                                        }))
                                        .reduce((a, b) => a + b.price * b.quantity, 0)
                                        .toFixed(2)}
                                    €
                                </Text>
                                <div className={"flex items-center justify-center relative w-full"}>
                                    <div className="h-2 bg-gray-500 absolute w-[95%]"></div>
                                    <div
                                        className={`h-2 ${order.state === "REJECTED" ? "bg-red-600" : "bg-primary"} left-1 absolute w-[${order.state === "PAYED" || order.state === "REJECTED" ? "95" : "50"}%]`}
                                    ></div>
                                    <div
                                        className={
                                            "relative flex gap-8 justify-between items-center w-full"
                                        }
                                    >
                                        <div
                                            className={`rounded-full w-5 h-5 ${order.state === "REJECTED" ? "bg-red-600" : "bg-primary"}`}
                                        ></div>
                                        <div
                                            className={`rounded-full w-5 h-5 ${order.state === "REJECTED" ? "bg-red-600" : "bg-primary"}`}
                                        ></div>
                                        <div
                                            className={`rounded-full w-5 h-5 ${order.state === "REJECTED" ? "bg-red-600" : "bg-primary"}`}
                                        ></div>
                                    </div>
                                </div>
                                <Text clazzName={"self-center"}>
                                    {order.state === "PAYED"
                                        ? "Bezahlt"
                                        : order.state === "REJECTED"
                                          ? "Abgelehnt"
                                          : "Abgeschickt"}
                                </Text>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Room;
