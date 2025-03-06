import PageHeader from "../components/PageHeader.jsx";
import Text from "../components/Text.jsx";
import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

function RoomNew() {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState(-1);
    const [deadline, setDeadline] = useState(new Date());
    const { self, fetchSelf, fetchAllRestaurants, createSession } = useAPI();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSelf();
        fetchAllRestaurants(setRestaurants);
    }, []);

    const now = new Date();
    // correct the timezone offset
    const correctedTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    const createRoom = () => {
        // correct deadline timezone offset
        const correctedDeadline = new Date(
            deadline.getTime() - deadline.getTimezoneOffset() * 60000,
        );
        const sessionDto = {
            restaurantId: restaurantId,
            organizerId: self.id,
            deadline: correctedDeadline.toISOString(),
        };

        createSession(sessionDto, (session) => {
            navigate("/room/" + session.id);
        });
    };

    return (
        <>
            <PageHeader
                title="Neuer Raum"
                description="Hier kannst du einen neuen Raum erstellen."
            />

            <div className="flex flex-row justify-center gap-5 my-16">
                <div className="w-1/3">
                    <Text type="p">Restaurant</Text>
                    <select
                        className="border border-gray-300 px-5 py-[10px] rounded-xl mt-1 text-black w-full text-lg"
                        onChange={(e) => setRestaurantId(parseInt(e.target.value))}
                        value={-1}
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
                    <input
                        type="datetime-local"
                        className="border border-gray-300 px-5 py-[10px] rounded-xl mt-1 text-black w-full text-lg"
                        value={correctedTime.toISOString().slice(0, 16)}
                        min={correctedTime.toISOString().slice(0, 16)}
                        onChange={(e) => setDeadline(new Date(e.target.value))}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-end">
                <Button clazzName="self-end" onClick={createRoom} slide disabled={restaurantId < 0}>
                    Erstellen
                </Button>
            </div>
        </>
    );
}

export default RoomNew;
