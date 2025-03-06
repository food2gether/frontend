import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useAPI } from "../hooks/useAPI";

function Home() {
    const { rooms, fetchAllRooms, fetchUser, fetchRestaurant } = useAPI();
    const [fetchedRooms, setFetchedRooms] = useState([]);

    useEffect(() => {
      fetchAllRooms()
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            const roomDetails = await Promise.all(
                rooms.map(async (room) => {
                    const organizer = await fetchUser(room.organizerId);
                    const restaurant = await fetchRestaurant(room.restaurantId);
                    const deadline = new Date(room.deadline)
                    return { room, organizer, restaurant, deadline };
                }),
            );
            setFetchedRooms(roomDetails);
        };

        if (rooms) {
            fetchDetails();
        }
    }, [rooms]);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <Text type="h1">Home</Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du die Räume der Restaurants sehen.
                </Text>
                <div className="flex flex-col w-full">
                    {fetchedRooms.map(({ room, organizer, restaurant, deadline }) => (
                        <Link
                            to={`/room/${room.id}`}
                            key={room.id}
                            className="mb-4"
                        >
                            <Box
                                title={`Raum von ${organizer?.displayName || ""}`}
                                details={`Bei ${restaurant.displayName} bis ${deadline.toLocaleDateString()} ${deadline.toLocaleTimeString()}`}
                                button={"ansehen"}
                                row
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
