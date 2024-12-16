import React from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";

// Hooks
import { useFood } from "../hooks/useFood";

function Home() {
    const { rooms, restaurants } = useFood();

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center w-full">
                    {rooms.map((room, index) => (
                        <Link
                            to={`/room/${room.name.toLowerCase()}`}
                            key={index}
                            state={{ restoID: room.restoID }}
                            className="mb-4"
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
