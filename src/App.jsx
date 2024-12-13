import React from "react";
import { Link } from "react-router-dom";
import Box from "./components/Box";

function App() {
    const rooms = ["robin", "marvin", "kaan", "nicola", "jo"];

    return (
        <>
            <div className="navMargin"></div>
            <div className="container">
                <div className="flex flex-col items-center w-full">
                    {rooms.map((room, index) => (
                        <Link to={`/room/${room.toLowerCase()}`} key={index} className="mb-4">
                            <Box title={`Raum von ${room}`} button={"ansehen"} row />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
