import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";
import { use } from "react";

function Home() {
    const { rooms, users } = useFood();
    const { order, setOrder } = useUser();

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <Text type="h2">Home</Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du die Räume der Restaurants sehen.
                </Text>
                <div className="flex flex-col w-full">
                    {rooms?.map((room, index) => (
                        (console.log("adsf", room.restaurantId),
                        <Link
                            to={`/room/${room.id}`}
                            key={room.id}
                            state={{ roomId: room.id, userName: users[index]?.name, restaurantId: room.restaurantId }}
                            className="mb-4"
                            onClick={() => setOrder({})}
                        >
                            <Box
                                title={`Raum von ${users[index]?.name || ""}`}
                                button={"ansehen"}
                                row
                            />
                        </Link>)
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
