import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Text from "../components/Text";

// Hooks
import { useAPI } from "../hooks/useAPI";
import Button from "../components/Button.jsx";
import Page from "../components/Page.jsx";

export const PATH = "/";

function Filter({ children, active, onClick, tabIndex }) {
    return (
        <div
            onClick={onClick}
            onKeyDown={onClick}
            tabIndex={tabIndex}
            className={`cursor-pointer rounded-3xl border border-primary py-1 px-3 bg-primary
             hover:bg-primary-light hover:bg-opacity-75 transition-colors
             ${active ? "text-white bg-opacity-100" : "text-black bg-opacity-0"}`}
        >
            {children}
        </div>
    );
}

function SessionBox({ sessionLink, title, description, tabIndex }) {
    return (
        <Link to={sessionLink} tabIndex={tabIndex} className="mb-4">
            <div className="rounded-lg p-4 mb-2 border border-primary cursor-pointer">
                <div className={"flex flex-row items-center justify-between"}>
                    <div>
                        <Text type={"h3"} bold>
                            {title}
                        </Text>
                        <Text>{description}</Text>
                    </div>
                    <Button slide>
                        <Text light>ansehen</Text>
                    </Button>
                </div>
            </div>
        </Link>
    );
}

function Home() {
    const { fetchAllSessions, fetchProfile, fetchRestaurant } = useAPI();
    const [sessionDetails, setSessionDetails] = useState([]);
    const [filterActive, setFilterActive] = useState(true);
    const [filterRestaurantId, setFilterRestaurantId] = useState(-1);

    const handleRestaurant = (restaurantId) => {
        setFilterRestaurantId(restaurantId);
    };

    useEffect(() => {
        fetchAllSessions().then((response) => {
            const detailPromises = response.data?.map(async (session) => {
                const organizerResp = await fetchProfile(session.organizerId);
                const restaurantResp = await fetchRestaurant(session.restaurantId);
                const deadline = new Date(session.deadline);
                return {
                    id: session.id,
                    organizer: organizerResp.data,
                    restaurant: restaurantResp.data,
                    deadline,
                };
            });
            Promise.all(detailPromises).then(setSessionDetails);
        });
    }, []);

    return (
        <Page title="Home" description="Hier kannst du die alle registrierten Sessions sehen.">
            <div className="flex justify-between items-center mb-6">
                <div className={"flex-row flex justify-around gap-4 items-center"}>
                    <Filter
                        tabIndex={0}
                        active={filterActive}
                        onClick={() => setFilterActive(!filterActive)}
                    >
                        Nur Aktiv
                    </Filter>
                    <Filter
                        tabIndex={1}
                        active={filterRestaurantId >= 0}
                        onClick={(event) => handleRestaurant(event.value)}
                    >
                        Restaurant
                    </Filter>
                </div>
                <Button className={"mb-0"} slide link="/session/new" tabIndex={2}>
                    <Text light>Neue Session</Text>
                </Button>
            </div>
            <div className="flex flex-col w-full">
                {sessionDetails.map((sessionDetail, index) => (
                    <SessionBox
                        sessionLink={`/session/${sessionDetail.id}`}
                        title={`${sessionDetail.organizer.displayName} bei ${sessionDetail.restaurant.displayName}`}
                        description={`Bis ${sessionDetail.deadline.toLocaleDateString("de")} ${sessionDetail.deadline.toLocaleTimeString("de")}`}
                        tabIndex={index + 3}
                        key={sessionDetail.id}
                    />
                ))}
            </div>
        </Page>
    );
}

export default Home;
