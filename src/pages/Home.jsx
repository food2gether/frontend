import React from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useFood } from "../hooks/useFood";
import { useUser } from "../hooks/useUser";

function Home() {
    const { rooms, restaurants } = useFood();
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
                    {rooms.map((room, index) => (
                        <Link
                            to={`/room/${room.displayname.toLowerCase()}`}
                            key={index}
                            state={{ restoID: room.id }}
                            className="mb-4"
                            onClick={() => setOrder({})}
                        >
                            <Box title={`Raum von ${room.name}`} button={"ansehen"} row />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
