import Page from "../../components/Page.jsx";
import useAPI from "../../hooks/useAPI.jsx";
import { useEffect, useState } from "react";
import { VisitableBox } from "../../components/Box.jsx";
import Button from "../../components/Button.jsx";
import ToolBar from "../../components/ToolBar.jsx";

function RestaurantList() {
    const { fetchAllRestaurants } = useAPI();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchAllRestaurants().then((response) => {
            if (response.data) {
                setRestaurants(response.data);
            }
        });
    }, []);

    return (
        <Page title="Restaurants" description="Hier findest du alle Restaurants, die du in einer Session verwenden kannst.">
            <ToolBar>
                <Button arrow fill linkTo="/restaurants/edit">
                    Neues Restaurant
                </Button>
            </ToolBar>
            <div className="flex flex-col gap-4">
                {restaurants.sort((a, b) => a.displayName.localeCompare(b.displayName)).map((restaurant) => (
                    <VisitableBox
                        to={`/restaurants/${restaurant.id}`}
                        key={restaurant.id}
                        title={restaurant.displayName}
                        description={`${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}, ${restaurant.address.country}`}
                    />
                ))}
            </div>
        </Page>
    );
}

export default RestaurantList;