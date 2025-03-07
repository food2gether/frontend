import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.jsx";
import Text from "../components/Text.jsx";
import Button from "../components/Button.jsx";

function SessionManage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [session, setSession] = useState();
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState({});
    const [sessionOrders, setSessionOrders] = useState([]);
    const [users, setUsers] = useState({});

    const { self, fetchSelf, fetchUser, fetchSession, fetchRestaurant, fetchOrders, fetchMenu, placeOrder } =
        useAPI();

    useEffect(() => {
        fetchSelf();
    }, []);

    useEffect(() => {
      fetchSession(sessionId, setSession)
          .then((session) => {
            if (!session) {
              window.alert("SessionView nicht gefunden");
              navigate("/notfound");
            }
          });
    }, [fetchSession, sessionId, navigate]);

    useEffect(() => {
        if (self && session && self.id !== session.organizerId) {
          window.alert("Du bist nicht berechtigt diesen SessionView zu verwalten");
          //  navigate("/notfound");
        }
    }, [self, session]);

    useEffect(() => {
        if (session) {
            fetchRestaurant(session.restaurantId, setRestaurant);
        }
    }, [fetchRestaurant, session]);

    useEffect(() => {
        if (session) {
            fetchOrders({ sessionId: session.id }, setSessionOrders);
        }
    }, [fetchOrders, session]);

    useEffect(() => {
        if (session) {
            fetchMenu(session.restaurantId, (menu_arr) => {
                const menu_map = menu_arr?.reduce((menu_map, menu_item) => {
                    menu_map[menu_item.id] = menu_item;
                    return menu_map;
                }, {});
                setMenu(menu_map);
            });
        }
    }, [fetchMenu, session]);

  useEffect(() => {
    // filter unique orders by profileId and fetch users
    sessionOrders
        ?.map((order) => order.profileId)
        .filter((value, index, self) => self.indexOf(value) === index)
        .forEach((profileId) => {
            fetchUser(profileId, (user) => {
                setUsers((users) => ({ ...users, [profileId]: user }))
            })
        });
  }, [sessionOrders]);

    const updateOrderState = (orderId, state) => {
        const orderDto = {
            id: orderId,
            state: state,
        };
        placeOrder(sessionId, orderDto, (order) => {
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
        <>
            <PageHeader
                title={`Verwalte bestellung bei ${restaurant.displayName || `Session ${sessionId}`}`}
                description={"Hier kannst du die Bestellungen verwalten."}
            />
            {sessionOrders?.map((order) => (
                <div
                    className="bg-white rounded-lg p-4 mb-2 border border-primary w-full min-w-[500px] h-auto"
                    key={order.id}
                >
                  <Text type={"h4"} clazzName={"mb-2"}>{users[order.profileId]?.displayName}</Text>
                    {order.items.map((item, index) => {
                        const menuItem = menu[item.menuItemId];
                        return (
                            <div
                                className="flex flex-row items-center justify-between"
                                key={item.id}
                            >
                                <div
                                    className={`flex flex-row justify-between w-full p-1 rounded ${index % 2 === 0 ? "bg-primary-light bg-opacity-50" : ""}`}
                                >
                                    <Text>{menuItem?.name}</Text>
                                    <Text>
                                        {item?.quantity}x {(menuItem?.price / 100).toFixed(2)}€
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                    <div className={`flex flex-row justify-between w-full items-end`}>
                        <Text bold clazzName={"pl-1"}>
                            Gesamt
                        </Text>
                        <Text clazzName={"border-t-4 mt-2 border-primary"}>
                            {order.items
                                .reduce((prev, curr) => {
                                    const menuItem = menu[curr.menuItemId];
                                    return prev + (curr?.quantity * menuItem?.price) / 100;
                                }, 0)
                                .toFixed(2)}
                        </Text>
                    </div>
                    <div className={"flex flex-row gap-2 mt-2 justify-end"}>
                        <Button
                            arrow={""}
                            type={"tertiary"}
                            clazzName={`${order.state === "PAYED" && "!bg-primary"} !border-primary-light`}
                            childrenClassess={`${order.state === "PAYED" && "!text-white"}`}
                            onClick={() => updateOrderState(order.id, "PAYED")}
                        >
                            Bezahlt
                        </Button>
                        <Button
                            arrow={""}
                            type={"tertiary"}
                            clazzName={`${order.state === "REJECTED" && "!bg-red-600"} !border-red-600`}
                            childrenClassess={`${order.state === "REJECTED" && "!text-white"}`}
                            onClick={() => updateOrderState(order.id, "REJECTED")}
                        >
                            Ablehnen
                        </Button>
                        <Button arrow={""} type={"tertiary"} clazzName={"!border-black"} onClick={() => updateOrderState(order.id, "OPEN")}>
                            Zurücksetzen
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SessionManage;
