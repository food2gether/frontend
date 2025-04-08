import Page from "../../components/Page.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI.jsx";
import Text from "../../components/Text.jsx";
import OrderOverview from "../../components/OrderOverview.jsx";
import ToolBar, { ToggleFilter } from "../../components/ToolBar.jsx";

function SessionOverview() {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const { fetchSession, fetchRestaurant, fetchMenu, fetchOrders } = useAPI();

    const [showNewOrders, setShowNewOrders] = useState(true);
    const [showDeniedOrders, setShowDeniedOrders] = useState(false);

    const [restaurant, setRestaurant] = useState({});
    const [address, setAddress] = useState({});
    const { menu, setMenu } = useState({});
    const { orders, setOrders } = useState([]);
    const { orderSummary, setOrderSummary } = useState({});

    useEffect(() => {
        fetchSession(sessionId).then((session) => {
            if (session.data) {
                fetchRestaurant(session.data.restaurantId).then((response) => {
                    if (response.data) {
                        setRestaurant(response.data);
                        setAddress(response.data.address);
                    }
                });
            } else {
                navigate("/404");
            }
        });
    }, []);

    return (
        <Page
            title={`Bestellung bei ${restaurant?.displayName}`}
            description={
                <>
                    <Text>
                        {address?.street}, {address?.postalCode} {address?.city}
                    </Text>
                    <Text>{address?.country}</Text>
                </>
            }
            className={"flex gap-4 flex-col"}
        >
            <ToolBar>
                <div className={"flex flex-row gap-4"}>
                    <ToggleFilter filterActive={showNewOrders} setFilterActive={setShowNewOrders}>
                        Neue Bestellungen anzeigen
                    </ToggleFilter>
                    <ToggleFilter filterActive={showDeniedOrders} setFilterActive={setShowDeniedOrders}>
                        Abgelehnte Bestellungen anzeigen
                    </ToggleFilter>
                </div>
            </ToolBar>
            <div className={"w-full"}>
                <Text type={"h3"}>Bestätigte Bestellungen</Text>
                {/*<OrderOverview orderItems={orderSummary} menu={menu} />*/}
            </div>
            <div className={`w-full ${showNewOrders ? "block" : "hidden"}`}>
                <Text type={"h3"}>Neue Bestellungen</Text>
                {/*<OrderOverview orderItems={orderSummary} menu={menu} />*/}
            </div>
            <div className={`w-full ${showDeniedOrders ? "block" : "hidden"}`}>
                <Text type={"h3"}>Abgelehnte Bestellungen</Text>
                {/*<OrderOverview orderItems={orderSummary} menu={menu} />*/}
            </div>
        </Page>
    );
}

export default SessionOverview;
