import Page from "../../components/Page.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI.jsx";
import React, { useEffect, useState } from "react";
import Text from "../../components/Text.jsx";
import Input from "../../components/Input.jsx";
import { Box } from "../../components/Box.jsx";
import Button from "../../components/Button.jsx";
import { FaTrashCan } from "react-icons/fa6";
import ToolBar from "../../components/ToolBar.jsx";

let tempId = 0;

function RestaurantEdit() {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const id = searchParams.get("id");
    const { fetchRestaurant, fetchMenu } = useAPI();

    const [restaurant, setRestaurant] = useState();
    const [restaurantChanged, setRestaurantChanged] = useState(false);

    const [menu, setMenu] = useState([]);
    const [menuChanged, setMenuChanged] = useState(false);

    useEffect(() => {
        if (!id) return;

        fetchRestaurant(id).then((response) => {
            if (response.data) {
                setRestaurant(response.data);
            } else {
                return navigate("/404");
            }
        });

        fetchMenu(restaurant.id).then((response) => {
            if (response.data) {
                setMenu(response.data);
            }
        });
    }, []);

    const updateRestaurant = (patch) => {
        setRestaurant({ ...restaurant, ...patch });
        setRestaurantChanged(true);
    };

    return (
        <Page
            ready={!id || !!restaurant}
            title={id ? `Bearbeite Restaurant ${restaurant?.displayName}` : "Erstelle ein neues Restaurant"}
            description="Hier kannst du alles bzgl. des Restaurants einstellen."
            className="flex flex-col gap-4 pb-4"
        >
            <div>
                <ToolBar>
                    <Text type="h3">Restaurant</Text>
                    <div className="flex flex-row gap-4">
                        <Button border>Zurücksetzen</Button>
                        <Button fill arrow>
                            Speichern
                        </Button>
                    </div>
                </ToolBar>
                <Box>
                    <div className="flex flex-col gap-4 w-full">
                        <Input type="text" placeholder="Name" value={restaurant?.displayName} onChange={(e) => updateRestaurant({ displayName: e.target.value })} />
                        <Input
                            type="text"
                            placeholder="Straße"
                            value={restaurant?.address.street}
                            onChange={(e) => updateRestaurant({ address: { ...restaurant.address, street: e.target.value } })}
                        />
                        <div className="flex flex-row gap-2">
                            <Input
                                type="text"
                                placeholder="Postleitzahl"
                                value={restaurant?.address.postalCode}
                                onChange={(e) => updateRestaurant({ address: { ...restaurant.address, postalCode: e.target.value } })}
                            />
                            <Input
                                type="text"
                                placeholder="Stadt"
                                value={restaurant?.address.city}
                                onChange={(e) => updateRestaurant({ address: { ...restaurant.address, city: e.target.value } })}
                            />
                        </div>
                        <Input
                            type="text"
                            placeholder="Land"
                            value={restaurant?.address.country || "Deutschland"}
                            onChange={(e) => updateRestaurant({ address: { ...restaurant.address, country: e.target.value } })}
                        />
                    </div>
                </Box>
            </div>
            <div>
                <ToolBar>
                    <Text type="h3">Menü</Text>
                    <div className="flex flex-row gap-4">
                        <Button fill onClick={() => setMenu([...menu, { tempId: tempId++, name: "", description: "", price: 0 }])}>
                            Neuer Eintrag
                        </Button>
                        <Button border>Zurücksetzen</Button>
                        <Button fill arrow>Speichern</Button>
                    </div>
                </ToolBar>
                <div className="flex flex-col gap-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                    {menu.map((menuItem) => (
                        <Box className="gap-4" key={menuItem.tempId ? "tmp" + menuItem.tempId : menuItem.id}>
                            <Button fill={"red-600"} className="!p-2" onClick={() => setMenu(menu.filter((item) => item.tempId !== menuItem.tempId || item.id !== menuItem.id))}>
                                <FaTrashCan />
                            </Button>
                            <div className="flex-grow">
                                <Text type="h3">
                                    <Input type="text" placeholder={"Name des Gerichtes"} className="w-2/6" />
                                </Text>
                                <Text type="p" className={"mb-2"}>
                                    <Input type={"text"} placeholder={"Beschreibung"} className={"w-3/4"} />
                                </Text>
                            </div>
                            <div className="flex flex-row gap-2">
                                <Input type="text" placeholder={0.0} className={"w-10"} /> <Text>EUR</Text>
                            </div>
                        </Box>
                    ))}
                </div>
            </div>
        </Page>
    );
}

export default RestaurantEdit;
