import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Text from "../../components/Text.jsx";
import { LOADING_USER, useAPI } from "../../hooks/useAPI.jsx";
import useUser from "../../hooks/useUser.jsx";
import Page from "../../components/Page.jsx";
import { toInputDateTimeString } from "../../helper/dates.js";
import Button from "../../components/Button.jsx";
import { Box, BoxDescriptor } from "../../components/Box.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import Input from "../../components/Input.jsx";
import ToolBar from "../../components/ToolBar.jsx";
import OrderOverview from "../../components/OrderOverview.jsx";

function MenuItemCard({ name, description, price, quantity, updateQuantity }) {
    return (
        <Box title={name} description={description} className="flex flex-row justify-between gap-32">
            <div>
                <BoxDescriptor title={name} description={description} />
                <Text type="p" className="text-primary">
                    {(price / 100).toFixed(2)} €
                </Text>
            </div>
            <div className="flex items-center gap-4">
                <Text type="p">Anzahl:</Text>
                <input type="text" min="0" className="w-8 text-black outline-hidden border-none" value={quantity || 0} onChange={(e) => updateQuantity(parseInt(e.target.value))} />
                <div className="flex flex-col gap-1">
                    <button className="w-7 h-7 bg-primary rounded-full flex items-center justify-center" onClick={() => updateQuantity(quantity + 1)}>
                        +
                    </button>
                    <button className="w-7 h-7 bg-primary rounded-full flex items-center justify-center" onClick={() => updateQuantity(Math.max(quantity - 1, 0))}>
                        -
                    </button>
                </div>
            </div>
        </Box>
    );
}

function DeliveryProgressBar({ state }) {
    let progress = 1;
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
            <ProgressBar progress={progress} total={3} className={state === "REJECTED" ? "bg-red-600" : "bg-primary"} />
            <Text center className={"w-full"}>{translation[state]}</Text>
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
    const [quantityByMenuItemId, setQuantityByMenuItemId] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [ownOrders, setOwnOrders] = useState([]);

    const init = async () => {
        const sessionResponse = await fetchSession(sessionId);
        const sessionData = sessionResponse.data;
        if (sessionData) {
            setSession(sessionData);
            setDeadline(new Date(sessionData.deadline + "Z"));
        } else {
            navigate("/404");
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
            const { [product.id]: _, ...rest } = quantityByMenuItemId;
            setQuantityByMenuItemId(rest);
            return;
        }
        setQuantityByMenuItemId((prev) => ({
            ...prev,
            [product.id]: quantity,
        }));
    };

    useEffect(() => {
        setTotalPrice(Object.entries(quantityByMenuItemId).reduce((acc, [menuItemId, quantity]) => acc + quantity * menu[menuItemId].price, 0));
    }, [quantityByMenuItemId]);

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
        <Page title={`Bestelle mit ${organizer.displayName} bei ${restaurant.displayName}`} description={`Offen bis ${deadline && deadline.toLocaleString("de-DE")}`}>
            {self?.id === session?.organizerId && (
                <ToolBar>
                    <Input
                        type={"datetime-local"}
                        defaultValue={deadline ? toInputDateTimeString(deadline) : undefined}
                        onChange={(e) => updateDeadline(e.target.value)}
                        valid={deadlineValid}
                    />
                    <Button linkTo={`/session/${sessionId}/manage`} fill arrow>
                        Verwalten
                    </Button>
                </ToolBar>
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
                                quantity={quantityByMenuItemId[product.id] || 0}
                                updateQuantity={(quantity) => updateQuantity(product, quantity)}
                            />
                        ))}
                    </div>
                    <Text type="h2" bold>
                        {deadline < new Date()
                            ? "Die Zeit ist leider schon abgelaufen."
                            : quantityByMenuItemId && Object.keys(quantityByMenuItemId).length > 0
                              ? `Gesamtpreis: ${(totalPrice / 100).toFixed(2)} €`
                              : "Bitte wähle etwas aus!"}
                    </Text>
                    <Button
                        linkTo="/order"
                        linkOptions={{
                            state: {
                                orderItems: Object.entries(quantityByMenuItemId).map(([orderItemId, quantity]) => ({ menuItemId: parseInt(orderItemId), quantity })),
                                menu: menu,
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
                    <div className="flex flex-col items-center gap-3">
                        <Text type={"h4"}>
                            Deine Bestellungen
                        </Text>
                        {ownOrders?.map((order) => (
                            <div key={order.id} className="flex flex-col justify-between items-center bg-white w-full p-4 rounded-2xl border-primary border">
                                <OrderOverview orderItems={order?.items} menu={menu} light/>
                                <DeliveryProgressBar state={order.state} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Page>
    );
}

export default SessionView;
