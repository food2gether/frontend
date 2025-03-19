import Page from "../../components/Page.jsx";
import useAPI from "../../hooks/useAPI.jsx";
import { useEffect, useState } from "react";
import { VisitableBox } from "../../components/Box.jsx";
import Button from "../../components/Button.jsx";

function RestaurantList() {
    const { fetchAllRestaurants } = useAPI();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchAllRestaurants().then((response) => {
            if (response.data) {
                setRestaurants(response);
            }
        });
    });

    return (
        <Page title="Restaurants" description="Hier findest du alle Restaurants, die du in einer Session verwenden kannst.">
            <div className="flex justify-end items-center mb-6">
                <Button arrow fill linkTo="/restaurant/edit">Neues Restaurant</Button>
            </div>
            {restaurants.map((restaurant) => (
                <VisitableBox
                    to={`/restaurant/${restaurant.id}`}
                    key={restaurant.id}
                    title={restaurant.name}
                    description={`${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}, ${restaurant.address.country}`}
                />
            ))}
        </Page>
    );
}

export default RestaurantList;