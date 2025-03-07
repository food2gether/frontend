import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Box from "../components/Box";
import Text from "../components/Text";

// Hooks
import { useAPI } from "../hooks/useAPI";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

export const PATH = "/";

function Home() {
    const { fetchAllSessions, fetchUser, fetchRestaurant } = useAPI();
    const [sessionDetails, setSessionDetails] = useState([]);

    useEffect(() => {
        fetchAllSessions().then((response) => {
            const detailPromises = response.data?.map(async (session) => {
                const organizerResp = await fetchUser(session.organizerId);
                const restaurantResp = await fetchRestaurant(session.restaurantId);
                const deadline = new Date(session.deadline);
                return { id: session.id, organizer: organizerResp.data, restaurant: restaurantResp.data, deadline };
            });
            Promise.all(detailPromises).then(setSessionDetails);
        });
    }, []);

    return (
        <>
            <div className="flex justify-between items-end mb-6">
                <PageHeader
                    title={"Home"}
                    description="Hier kannst du die alle registrierten Sessions sehen."
                />
                <Button clazzName={"mb-0"} slide link="/session/new">
                    <Text light>Neue Session</Text>
                </Button>
            </div>
            <div className="flex flex-col w-full">
                {sessionDetails.map((sessionDetail) => (
                    <Link to={`/session/${sessionDetail.id}`} key={sessionDetail.id} className="mb-4">
                        <Box
                            title={`Session von ${sessionDetail.organizer.displayName}`}
                            details={`Bei ${sessionDetail.restaurant.displayName} bis ${sessionDetail.deadline.toLocaleDateString()} ${sessionDetail.deadline.toLocaleTimeString()}`}
                            button={"ansehen"}
                            row
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;
