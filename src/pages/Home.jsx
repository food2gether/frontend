import { useEffect, useState } from "react";

import { useAPI } from "../hooks/useAPI";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import { VisitableBox } from "../components/Box.jsx";
import ToolBar, { ToggleFilter } from "../components/ToolBar.jsx";

function Home() {
    const { fetchAllSessions, fetchProfile, fetchRestaurant } = useAPI();
    const [sessionDetails, setSessionDetails] = useState([]);
    const [filterActive, setFilterActive] = useState(true);

    const setSessionDetailsSorted = (details) => {
        setSessionDetails(details.toSorted((a, b) => b.deadline - a.deadline));
    }

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
            Promise.all(detailPromises).then(setSessionDetailsSorted);
        });
    }, [filterActive]);

    return (
        <Page title="Home" description="Hier kannst du die alle registrierten Sessions sehen.">
            <ToolBar>
                <ToggleFilter filterActive={filterActive} setFilterActive={setFilterActive}>
                    {filterActive ? "Alle Sessions" : "Aktive Sessions"}
                </ToggleFilter>
                <Button arrow fill linkTo="/session/new">
                    Neue Session
                </Button>
            </ToolBar>
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
