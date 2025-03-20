import Page from "../../components/Page.jsx";
import { useNavigate, useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar.jsx";
import Button from "../../components/Button.jsx";
import useAPI from "../../hooks/useAPI.jsx";
import { useEffect, useState } from "react";
import { TDBox } from "../../components/Box.jsx";
import Text from "../../components/Text.jsx";

function RestaurantView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchRestaurant, fetchMenu } = useAPI();
    const [restaurant, setRestaurant] = useState();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchRestaurant(id).then((response) => {
            if (response.data) {
                setRestaurant(response.data);
            } else {
                return navigate("/404");
            }
        });
    }, []);

    useEffect(() => {
        fetchMenu(id).then((response) => {
            if (response.data) {
                setMenu(response.data);
            }
        });
    }, []);

    return (
        <Page
            ready={!!restaurant}
            title={`Restaurant ${restaurant?.displayName || id}`}
            description={`${restaurant?.address.street}, ${restaurant?.address.postalCode} ${restaurant?.address.city}, ${restaurant?.address.country}`}
        >
            <ToolBar>
                <Button fill arrow>
                    Bearbeiten
                </Button>
            </ToolBar>
            <div className="flex flex-col gap-4">
                {menu.map((menuItem) => (
                    <TDBox title={menuItem.name} key={menuItem.id} description={menuItem.description}>
                        <Text className={"text-primary"}>{(menuItem.price / 100).toFixed(2)} EUR</Text>
                    </TDBox>
                ))}
            </div>
        </Page>
    );
}

export default RestaurantView;
