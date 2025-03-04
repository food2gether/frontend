import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Home() {
    const { rooms, fetchUser } = useFood();
    const { order, setOrder } = useUser();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (rooms?.length) {
            rooms.forEach(async (room) => {
                const data = await fetchUser(room.id);
                setUserData((prev) => ({
                    ...prev,
                    [room.id]: data, // Speichert die Daten pro Raum
                }));
            });
        }
    }, [rooms]); // Wird nur ausgeführt, wenn sich `rooms` ändert

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <Text type="h2">Home</Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du die Räume der Restaurants sehen.
                </Text>
                <div className="flex flex-col w-full">
                    {rooms?.map((room) => (
                        <Link
                            to={`/room/${room.id}`}
                            key={room.id}
                            state={{ roomId: room.id }}
                            className="mb-4"
                            onClick={() => setOrder({})}
                        >
                            <Box
                                title={`Raum von ${room.id} ${userData[room.id]?.name || ""}`}
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
