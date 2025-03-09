import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Text from "../components/Text";
import { LOADING_USER, useAPI } from "../hooks/useAPI";
import useUser from "../hooks/useUser.jsx";
import Page from "../components/Page.jsx";
import { toDateTimeString, toInputDateTimeString } from "../util.js";
import Button from "../components/Button.jsx";

function MenuItemCard({ name, description, price, quantity, updateQuantity }) {
    return (
        <div className="flex justify-between items-center bg-white w-full p-4 rounded-2xl border-primary border gap-4">
            <div>
                <Text type="h5">{name}</Text>
                <Text type="p" className={"mb-2"}>
                    {description}
                </Text>
                <Text type="p" className="text-primary">
                    {(price / 100).toFixed(2)} €
                </Text>
            </div>
            <div className="flex items-center gap-4">
                <Text type="p">Anzahl:</Text>
                <input type="text" min="0" className="w-8 text-black outline-none border-none" value={quantity || 0} onChange={(e) => updateQuantity(parseInt(e.target.value))} />
                <div className="flex flex-col gap-1">
                    <button className="w-7 h-7 bg-primary rounded-full flex items-center justify-center" onClick={() => updateQuantity(quantity + 1)}>
                        +
                    </button>
                    <button className="w-7 h-7 bg-primary rounded-full flex items-center justify-center" onClick={() => updateQuantity(Math.max(quantity - 1, 0))}>
                        -
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProgressBar({ state }) {
    let progress = 1;
    let progressColor = state === "REJECTED" ? "bg-red-600" : "bg-primary";
    switch (state) {
        case "OPEN":
        case "SUBMITTED":
            progress = 2;
            break;
        case "PAYED":
        case "REJECTED":
            progress = 3;
            break;
    }

    let translation = {
        OPEN: "In Bearbeitung",
        SUBMITTED: "In Bearbeitung",
        PAYED: "Bezahlt",
        REJECTED: "Abgelehnt",
    };

    return (
        <>
            <div className={"flex items-center justify-center relative w-full"}>
                <div className="h-1.5 bg-gray-500 absolute w-[95%] left-1"></div>
                <div className={`h-2 z-10 ${progressColor} left-1 absolute`} style={{ width: `${((progress - 1) / 2) * 95}%` }}></div>
                <div className="relative flex gap-8 justify-between items-center w-full">
                    <div className={`rounded-full z-10 w-5 h-5 ${progress >= 1 ? progressColor : "bg-gray-500"}`}></div>
                    <div className={`rounded-full z-10 w-5 h-5 ${progress >= 2 ? progressColor : "bg-gray-500"}`}></div>
                    <div className={`rounded-full z-10 w-5 h-5 ${progress >= 3 ? progressColor : "bg-gray-500"}`}></div>
                </div>
            </div>
            <Text className={"self-center"}>{translation[state]}</Text>
        </>
    );
}

function SessionView() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const { fetchOrders, fetchSession, fetchProfile, fetchRestaurant, fetchMenu, createOrUpdateSession } = useAPI();
    const { data: self } = useUser();

    const [session, setSession] = useState();
    const [restaurant, setRestaurant] = useState({});
    const [deadline, setDeadline] = useState();
    const [organizer, setOrganizer] = useState({ ...LOADING_USER });
    const [menu, setMenu] = useState({});
    const [order, setOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [ownOrders, setOwnOrders] = useState([]);

    const init = async () => {
        const sessionResponse = await fetchSession(sessionId);
        const sessionData = sessionResponse.data;
        if (sessionData) {
            setSession(sessionData);
            setDeadline(new Date(sessionData.deadline + "Z"));
        } else {
            navigate("/notfound");
            return;
        }

        fetchProfile(sessionData.organizerId).then((response) => {
            if (response.data) {
                setOrganizer(response.data);
            }
        });
        fetchRestaurant(sessionData.restaurantId).then((response) => {
            if (response.data) {
                setRestaurant(response.data);
            }
        });
        fetchMenu(sessionData.restaurantId).then((menu_arr) => {
            const menu_map = menu_arr.data?.reduce((menu_map, menu_item) => {
                menu_map[menu_item.id] = menu_item;
                return menu_map;
            }, {});
            setMenu(menu_map);
        });
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (!self) return;

        fetchOrders(sessionId, self.id).then((response) => {
            if (!response.data) return;

            setOwnOrders(response.data);
        });
    }, [self]);

    const updateQuantity = (product, quantity) => {
        if (quantity <= 0) {
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

    useEffect(() => {
        setTotalPrice(Object.values(order).reduce((acc, item) => acc + item.quantity * item.price, 0));
    }, [order]);

    const [deadlineValid, setDeadlineValid] = useState(true);
    const updateDeadline = (value) => {
        const newDeadline = new Date(value);
        if (newDeadline < new Date()) {
            setDeadlineValid(false);
            return;
        } else {
            setDeadlineValid(true);
        }

        createOrUpdateSession({ id: sessionId, deadline: newDeadline }).then((response) => {
            if (response.data) {
                setDeadline(new Date(response.data.deadline + "Z"));
            }
        });
    };

    return (
        <Page title={`Bestelle mit ${organizer.displayName} bei ${restaurant.displayName}`} description={`Offen bis ${deadline && toDateTimeString(deadline)}`}>
            {self?.id === session?.organizerId && (
                <div className={"flex flex-row justify-between items-center"}>
                    <input
                        type="datetime-local"
                        className={"border border-primary py-[5px] px-[10px] rounded-xl text-black text-[20px]" + `${deadlineValid ? "" : " border-red-500"}`}
                        defaultValue={deadline ? toInputDateTimeString(deadline) : undefined}
                        onChange={(e) => updateDeadline(e.target.value)}
                    />
                    <Button linkTo={`/session/${sessionId}/manage`} fill arrow>
                        Verwalten
                    </Button>
                </div>
            )}
            <div className="flex flex-row gap-5 mt-10">
                <div className="flex flex-col items-center gap-10">
                    <div className={"flex flex-col gap-4"}>
                        {Object.values(menu).map((product) => (
                            <MenuItemCard
                                key={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                quantity={order[product.id]?.quantity || 0}
                                updateQuantity={(quantity) => updateQuantity(product, quantity)}
                            />
                        ))}
                    </div>
                    <Text type="h2" bold>
                        {order && Object.keys(order).length > 0 ? `Gesamtpreis: ${totalPrice.toFixed(2)} €` : "Bitte wähle etwas aus!"}
                    </Text>
                    <Button
                        linkTo="/order"
                        linkOptions={{
                            state: {
                                order: order,
                                sessionId: sessionId,
                                payee: organizer.name,
                            },
                        }}
                        fill
                        arrow
                        checkDisabled={() => totalPrice <= 0 || deadline < new Date()}
                    >
                        Fortfahren
                    </Button>
                </div>
                {/*Currently placed orders*/}
                {ownOrders && ownOrders.length > 0 && (
                    <div className="flex flex-col items-center">
                        <Text type={"h4"} className={"mb-5"}>
                            Deine Bestellungen
                        </Text>
                        {ownOrders?.map((order) => (
                            <div key={order.id} className="flex flex-col justify-between bg-white w-full p-4 mb-3 rounded-2xl border-primary border">
                                <div className="flex flex-col">
                                    {order?.items?.map((item) => (
                                        <Text key={item.id}>
                                            {item.quantity}x {menu[item.menuItemId]?.name}
                                        </Text>
                                    ))}
                                </div>
                                <Text className="self-end border-t-4 border-primary">
                                    {order?.items
                                        ?.map((item) => ({
                                            quantity: item.quantity,
                                            price: menu[item.menuItemId]?.price / 100,
                                        }))
                                        .reduce((a, b) => a + b.price * b.quantity, 0)
                                        .toFixed(2)}
                                    €
                                </Text>
                                <ProgressBar state={order.state} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Page>
    );
}

export default SessionView;
