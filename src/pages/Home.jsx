import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useFood } from "../hooks/useFood";

function Home() {
    const { rooms, fetchUser } = useFood();
    const [ fetchedRooms, setFetchedRooms ] = useState([]);

    useEffect(() => {
      const fetchOrganizers = async () => {
        const roomsWithOrganizers = await Promise.all(
            rooms.map(async (room) => {
              const organizer = await fetchUser(room.organizerId);
              return { room, organizer };
            })
        );
        setFetchedRooms(roomsWithOrganizers);
      };

      if (rooms) {
        fetchOrganizers();
      }
    }, [rooms]);

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <Text type="h2">Home</Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du die Räume der Restaurants sehen.
                </Text>
                <div className="flex flex-col w-full">
                    {fetchedRooms.map(({ room, organizer }) => (
                        <Link
                            to={`/room/${room.id}`}
                            key={room.id}
                            state={{
                                roomId: room.id,
                                userName: organizer?.displayName,
                                restaurantId: room.restaurantId,
                            }}
                            className="mb-4"
                        >
                            <Box
                                title={`Raum von ${organizer?.displayName || ""}`}
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
