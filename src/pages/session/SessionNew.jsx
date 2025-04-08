import Text from "../../components/Text.jsx";
import React, { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI.jsx";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page.jsx";
import useUser from "../../hooks/useUser.jsx";
import { toInputDateTimeString } from "../../helper/dates.js";
import Button from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";

function SessionNew() {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState(-1);
    const [deadline, setDeadline] = useState(new Date());
    const { fetchAllRestaurants, createOrUpdateSession } = useAPI();
    const navigate = useNavigate();
    const { data: self } = useUser();

    useEffect(() => {
        fetchAllRestaurants().then((response) => {
            setRestaurants(response.data.toSorted((a, b) => a.displayName.localeCompare(b.displayName)));
        });
    }, []);

    const handleSubmit = () => {
        // correct deadline timezone offset
        const sessionDto = {
            restaurantId: restaurantId,
            organizerId: self.id,
            deadline: deadline,
        };

        createOrUpdateSession(sessionDto).then((response) => {
            navigate("/session/" + response.data.id);
        });
    };

    return (
        <Page title="Neue Session" description="Hier kannst du eine neue Session erstellen.">
            <div className="flex flex-row justify-center gap-5 my-16">
                <div className="w-1/3">
                    <Text type="p">Restaurant</Text>
                    <select
                        className="border border-gray-300 px-5 py-[10px] rounded-xl mt-1 text-black w-full text-lg"
                        onChange={(e) => setRestaurantId(parseInt(e.target.value))}
                        defaultValue={-1}
                    >
                        <option value={-1} disabled>
                            Bitte wählen
                        </option>
                        {restaurants.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-1/3">
                    <Text type="p">Deadline</Text>
                    <Input
                        type="datetime-local"
                        defaultValue={toInputDateTimeString(deadline)}
                        onChange={(e) => setDeadline(new Date(e.target.value))}
                        valid={deadline > new Date()}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-end">
                <Button className="self-end" onClick={handleSubmit} fill arrow checkDisabled={() => restaurantId < 0 || deadline <= new Date()}>
                    Erstellen
                </Button>
            </div>
        </Page>
    );
}

export default SessionNew;
