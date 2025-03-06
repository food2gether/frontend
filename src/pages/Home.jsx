import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useAPI } from "../hooks/useAPI";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

function Home() {
    const { rooms, fetchAllRooms, fetchUser, fetchRestaurant } = useAPI();
    const [fetchedRooms, setFetchedRooms] = useState([]);

    useEffect(() => {
        fetchAllRooms();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            const roomDetails = await Promise.all(
                rooms.map(async (room) => {
                    const organizer = await fetchUser(room.organizerId);
                    const restaurant = await fetchRestaurant(room.restaurantId);
                    const deadline = new Date(room.deadline);
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
                <div className="flex justify-between items-end mb-6">
                    <PageHeader title={"Home"} description="Hier kannst du die Räume der Restaurants sehen."/>
                    <Button clazzName={"mb-0"} slide link="/room/new">
                        <Text light>Neuen Raum erstellen</Text>
                    </Button>
                </div>
                <div className="flex flex-col w-full">
                    {fetchedRooms.map(({ room, organizer, restaurant, deadline }) => (
                        <Link to={`/room/${room.id}`} key={room.id} className="mb-4">
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
