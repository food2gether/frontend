import Page from "../../components/Page.jsx";
import { useParams } from "react-router-dom";

function RestaurantView() {
    const { id } = useParams();

    return <Page title={`Restaurants ${id}`} description="Hier werden ein paar coole infos stehen"></Page>;
}

export default RestaurantView;
