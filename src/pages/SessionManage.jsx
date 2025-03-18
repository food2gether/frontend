import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.jsx";
import Text from "../components/Text.jsx";
import useUser from "../hooks/useUser.jsx";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

function SessionManage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [session, setSession] = useState();
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState({});
    const [sessionOrders, setSessionOrders] = useState([]);
    const [users, setUsers] = useState({});

    const { fetchProfile, fetchSession, fetchRestaurant, fetchOrders, fetchMenu, placeOrder } = useAPI();
    const { data: self } = useUser();

    // validate route
    useEffect(() => {
        fetchSession(sessionId).then((session) => {
            if (session.data) {
                setSession(session.data);
            } else {
                navigate("/notfound");
            }
        });
    }, [fetchSession, sessionId, navigate]);

    // protected route
    useEffect(() => {
        if (self && session && self.id !== session.organizerId) {
            window.alert("Du bist nicht berechtigt diesen SessionView zu verwalten");
            navigate("/notfound");
        }
    }, [self, session]);

    // fetch restaurant, orders and menu
    useEffect(() => {
        if (session) {
            fetchRestaurant(session.restaurantId).then((response) => response.data && setRestaurant(response.data));
            fetchOrders(session.id).then((response) => response.data && setSessionOrders(response.data));

            fetchMenu(session.restaurantId).then((response) => {
                const menu_map = response.data?.reduce((menu_map, menu_item) => {
                    menu_map[menu_item.id] = menu_item;
                    return menu_map;
                }, {});

                if (menu_map) {
                    setMenu(menu_map);
                }
            });
        }
    }, [session]);

    // fetch user info
    useEffect(() => {
        if (!sessionOrders) return;

        // filter unique orders by profileId and fetch users
        const profileResponsePromises = sessionOrders
            .map((order) => order.profileId)
            // filter unique profileIds to prevent multiple fetches per profile
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((profileId) => fetchProfile(profileId));

        Promise.all(profileResponsePromises).then((responses) => {
            const users = responses.reduce((users, response) => {
                if (response.data) {
                    users[response.data.id] = response.data;
                }
                return users;
            }, {});
            setUsers(users);
        });
    }, [sessionOrders]);

    const updateOrderState = (orderId, state) => {
        const orderDto = {
            id: orderId,
            state: state,
        };
        placeOrder(sessionId, orderDto).then((orderResponse) => {
            const order = orderResponse.data;
            // update in sessionOrders]
            const updatedOrders = sessionOrders.map((o) => {
                if (o.id === order.id) {
                    return order;
                }
                return o;
            });
            setSessionOrders(updatedOrders);
        });
    };

    return (
        <Page title={`Verwalte bestellung bei ${restaurant?.displayName}`} description="Hier kannst du die Bestellungen verwalten.">
            {sessionOrders?.map((order) => (
                <div className="bg-white rounded-lg p-4 mb-2 border border-primary w-full min-w-[500px] h-auto" key={order.id}>
                    <Text type={"h4"} className={"mb-2"}>
                        {users[order.profileId]?.displayName}
                    </Text>
                    {order.items.map((item, index) => {
                        const menuItem = menu[item.menuItemId];
                        return (
                            <div className="flex flex-row items-center justify-between" key={item.id}>
                                <div className={`flex flex-row justify-between w-full p-1 rounded ${index % 2 === 0 ? "bg-primary-light bg-opacity-50" : ""}`}>
                                    <Text>{menuItem?.name}</Text>
                                    <Text>
                                        {item?.quantity}x {(menuItem?.price / 100).toFixed(2)}€
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                    <div className={`flex flex-row justify-between w-full items-end`}>
                        <Text bold className={"pl-1"}>
                            Gesamt
                        </Text>
                        <Text className={"border-t-4 mt-2 border-primary"}>
                            {order.items
                                .reduce((prev, curr) => {
                                    const menuItem = menu[curr.menuItemId];
                                    return prev + (curr?.quantity * menuItem?.price) / 100;
                                }, 0)
                                .toFixed(2)}
                        </Text>
                    </div>
                    <div className={"flex flex-row gap-2 mt-2 justify-end"}>
                        <Button border={"primary"} fill={order.state === "PAYED" && "primary"} onClick={() => updateOrderState(order.id, "PAYED")}>
                            Bezahlt
                        </Button>
                        <Button border="red-600" fill={order.state === "REJECTED" && "red-600"} onClick={() => updateOrderState(order.id, "REJECTED")}>
                            Ablehnen
                        </Button>
                        <Button border="black" onClick={() => updateOrderState(order.id, "OPEN")}>
                            Zurücksetzen
                        </Button>
                    </div>
                </div>
            ))}
        </Page>
    );
}

export default SessionManage;
