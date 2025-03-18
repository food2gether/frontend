import Page from "../../components/Page.jsx";
import { useLocation, useSearchParams } from "react-router-dom";

function RestaurantEdit() {
    const [ searchParams, getSearchParams] = useSearchParams();

    const id = searchParams.get("id");

    return (
        <Page title={id ? `Bearbeite Restaurant ${id}` : "Erstelle ein neues Restaurant"} description="Hier kannst du alles bzgl. des Restaurants einstellen.">

        </Page>
    )
}

export default RestaurantEdit;