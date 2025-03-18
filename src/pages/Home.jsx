import { useEffect, useState } from "react";

import { useAPI } from "../hooks/useAPI";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import { VisitableBox } from "../components/Box.jsx";

function Home() {
    const { fetchAllSessions, fetchProfile, fetchRestaurant } = useAPI();
    const [sessionDetails, setSessionDetails] = useState([]);
    const [filterActive, setFilterActive] = useState(true);

    useEffect(() => {
        fetchAllSessions(filterActive ? true : undefined).then((response) => {
            const detailPromises = response.data?.map(async (session) => {
                const organizerResp = await fetchProfile(session.organizerId);
                const restaurantResp = await fetchRestaurant(session.restaurantId);
                // Z indicates UTC time (GMT which is what the api service uses)
                const deadline = new Date(session.deadline + "Z");
                return {
                    id: session.id,
                    organizer: organizerResp.data,
                    restaurant: restaurantResp.data,
                    deadline: deadline,
                };
            });
            Promise.all(detailPromises).then(setSessionDetails);
        });
    }, [filterActive]);

    return (
        <Page title="Home" description="Hier kannst du die alle registrierten Sessions sehen.">
            <div className="flex justify-between items-center mb-6">
                <div className={"flex-row flex justify-around gap-4 items-center"}>
                    <Button fill={filterActive} border onClick={() => setFilterActive(!filterActive)} className={filterActive ? "text-white" : "text-black"}>
                        Aktive Sessions
                    </Button>
                    <Button border className="text-black">
                        Restaurant
                    </Button>
                </div>
                <Button arrow fill linkTo="/session/new">
                    Neue Session
                </Button>
            </div>
            <div className="flex flex-col w-full gap-4">
                {sessionDetails.map((sessionDetail) => (
                    <VisitableBox
                        to={`/session/${sessionDetail.id}`}
                        title={`${sessionDetail.organizer.displayName} bei ${sessionDetail.restaurant.displayName}`}
                        description={`Bis ${sessionDetail.deadline.toLocaleString()}`}
                        key={sessionDetail.id}
                    />
                ))}
            </div>
        </Page>
    );
}

export default Home;
