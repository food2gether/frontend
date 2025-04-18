import Page from "../../components/Page.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI.jsx";
import React, { useEffect, useRef, useState } from "react";
import Text from "../../components/Text.jsx";
import Input from "../../components/Input.jsx";
import { Box } from "../../components/Box.jsx";
import Button from "../../components/Button.jsx";
import { FaTrashCan } from "react-icons/fa6";
import ToolBar from "../../components/ToolBar.jsx";

let tempId = 0;

function RestaurantEdit() {
    const navigate = useNavigate();
    const [searchParams, ] = useSearchParams();
    const id = searchParams.get("id");
    const { fetchRestaurant, createOrUpdateRestaurant, fetchMenu, updateMenu } = useAPI();

    const [restaurant, setRestaurant] = useState();

    const [menu, setMenu] = useState({});
    const [menuValid, setMenuValid] = useState(true);

    const addressStreetRef = useRef();
    const addressPostalCodeRef = useRef();
    const addressCityRef = useRef();
    const addressCountryRef = useRef();

    const setMenuMapped = (menu) => {
        const manuAsMap = menu.reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur, price: cur.price / 100 } }), {});
        setMenu(manuAsMap);
    };

    const fetchRestaurantWithId = () => {
        if (!id) {
            setRestaurant({});
            return;
        }

        return fetchRestaurant(id).then((response) => {
            if (response.data) {
                setRestaurant(response.data);
                return response.data;
            } else {
                return navigate("/404");
            }
        });
    };

    const fetchMenuWithId = () => {
        if (!id) {
            setMenuMapped([]);
            return;
        }

        return fetchMenu(id).then((response) => {
            if (response.data) {
                setMenuMapped(response.data);
                return response.data;
            }
        });
    };

    useEffect(() => {
        fetchRestaurantWithId();
        fetchMenuWithId();
    }, []);

    const updateRestaurant = (patch) => {
        setRestaurant({ ...restaurant, ...patch });
    };

    const resetRestaurant = () => {
        fetchRestaurantWithId().then((restaurant) => {
            if (!restaurant) {
                return;
            }
            addressStreetRef.current.value = restaurant.address.street;
            addressPostalCodeRef.current.value = restaurant.address.postalCode;
            addressCityRef.current.value = restaurant.address.city;
            addressCountryRef.current.value = restaurant.address.country;
        });
    };

    const saveRestaurant = () => {
        if (
            restaurant?.displayName?.length > 0 &&
            restaurant?.address?.street?.length > 0 &&
            parseInt(restaurant?.address?.postalCode) > 0 &&
            restaurant?.address?.city?.length > 0 &&
            restaurant?.address?.country?.length > 0
        ) {
            createOrUpdateRestaurant(restaurant).then((response) => {
                if (response.data) {
                    if (id) {
                        navigate(`/restaurants/${id}`);
                    } else {
                        navigate("/restaurants/edit?id=" + response.data.id);
                    }
                }
            });
        }
    };

    const resetMenu = () => {
        // workaround to not deal with refs inside the loop
        // anything else will be quite messy, unmaintainable and possibly not performant
        setMenu({});
        fetchMenuWithId();
    };

    useEffect(() => {
        setMenuValid(checkMenuValid());
    }, [menu]);

    const checkMenuValid = () => {
        // description is optional
        return Object.values(menu).every((item) => item.name && !isNaN(item.price) && parseFloat(item.price) > 0);
    };

    const saveMenu = () => {
        if (!checkMenuValid()) return;

        const dto = Object.values(menu).map((item) => ({
            ...item,
            restaurantId: id,
            price: Math.round(parseFloat(item.price) * 100)
        }));
        updateMenu(id, dto).then((response) => {
            if (response.data) {
                navigate(`/restaurants/${id}`);
            }
        })
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
                    <Text type="h3">Anschrift</Text>
                    <div className="flex flex-row gap-4">
                        <Button border onClick={resetRestaurant}>
                            Zurücksetzen
                        </Button>
                        <Button
                            fill
                            arrow
                            onClick={saveRestaurant}
                            checkDisabled={() => {
                                const enabled =
                                    restaurant?.displayName?.length > 0 &&
                                    restaurant?.address?.street?.length > 0 &&
                                    parseInt(restaurant?.address?.postalCode) > 0 &&
                                    restaurant?.address?.city?.length > 0 &&
                                    restaurant?.address?.country?.length > 0;
                                return !enabled;
                            }}
                        >
                            Speichern
                        </Button>
                    </div>
                </ToolBar>
                <Box className="flex flex-col gap-4 w-full">
                        {!id && (
                            <Input
                                inputRef={addressStreetRef}
                                type="text"
                                placeholder="Name"
                                valid={restaurant?.displayName?.length > 0}
                                defaultValue={restaurant?.displayName}
                                onChange={(e) => updateRestaurant({ displayName: e.target.value })}
                            />
                        )}
                        <Input
                            inputRef={addressStreetRef}
                            type="text"
                            placeholder="Straße"
                            valid={restaurant?.address?.street?.length > 0}
                            defaultValue={restaurant?.address?.street}
                            onChange={(e) => updateRestaurant({ address: { ...restaurant?.address, street: e.target.value } })}
                        />
                        <div className="flex flex-row gap-2">
                            <Input
                                inputRef={addressPostalCodeRef}
                                type="text"
                                placeholder="Postleitzahl"
                                valid={parseInt(restaurant?.address?.postalCode) > 0}
                                defaultValue={restaurant?.address?.postalCode}
                                onChange={(e) => updateRestaurant({ address: { ...restaurant?.address, postalCode: e.target.value } })}
                            />
                            <Input
                                inputRef={addressCityRef}
                                type="text"
                                placeholder="Stadt"
                                valid={restaurant?.address?.city?.length > 0}
                                defaultValue={restaurant?.address?.city}
                                onChange={(e) => updateRestaurant({ address: { ...restaurant?.address, city: e.target.value } })}
                            />
                        </div>
                        <Input
                            inputRef={addressCountryRef}
                            type="text"
                            placeholder="Land"
                            valid={restaurant?.address?.country?.length > 0}
                            defaultValue={restaurant?.address?.country}
                            onChange={(e) => updateRestaurant({ address: { ...restaurant?.address, country: e.target.value } })}
                        />
                </Box>
            </div>
            {!!id && (
                <div>
                    <ToolBar>
                        <Text type="h3">Menü</Text>
                        <div className="flex flex-row gap-4">
                            <Button fill onClick={() => setMenu({ ...menu, ["tmp" + tempId++]: { name: "", description: "", price: 0 } })}>
                                Neuer Eintrag
                            </Button>
                            <Button border onClick={resetMenu}>
                                Zurücksetzen
                            </Button>
                            <Button fill arrow checkDisabled={() => !menuValid} onClick={saveMenu}>
                                Speichern
                            </Button>
                        </div>
                    </ToolBar>
                    <div className="flex flex-col gap-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                        {Object.entries(menu).length > 0 ? (
                            Object.entries(menu).sort(([, aMenuItem], [, bMenuItem]) => aMenuItem.name.localeCompare(bMenuItem.name)).map(([id, menuItem]) => (
                                <Box className="flex flex-row items-center gap-4" key={id}>
                                    <Button
                                        className="!p-2 bg-red-600 hover:bg-red-600/80"
                                        onClick={() => {
                                            const newMenu = { ...menu };
                                            delete newMenu[id];
                                            setMenu(newMenu);
                                        }}
                                    >
                                        <FaTrashCan />
                                    </Button>
                                    <div className="grow">
                                        <Text type="h3">
                                            <Input
                                                type="text"
                                                placeholder={"Name des Gerichtes"}
                                                className="w-2/6"
                                                valid={menuItem.name?.length > 0}
                                                defaultValue={menuItem.name}
                                                onBlur={(e) => {
                                                    setMenu({ ...menu, [id]: { ...menuItem, name: e.target.value } });
                                                }}
                                            />
                                        </Text>
                                        <Text type="p" className={"mb-2"}>
                                            <Input
                                                type={"text"}
                                                placeholder={"Beschreibung"}
                                                className={"w-3/4"}
                                                defaultValue={menuItem.description}
                                                onChange={(e) => {
                                                    setMenu({ ...menu, [id]: { ...menuItem, description: e.target.value } });
                                                }}
                                            />
                                        </Text>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Input
                                            type="text"
                                            placeholder={"0.00"}
                                            className={"w-16 text-center"}
                                            valid={!isNaN(menuItem.price) && parseFloat(menuItem.price) > 0}
                                            defaultValue={menuItem.price?.toFixed?.(2)}
                                            onChange={(e) => {
                                                setMenu({ ...menu, [id]: { ...menuItem, price: e.target.value } });
                                            }}
                                            onBlur={(e) => e.target.value = parseFloat(e.target.value).toFixed(2)}
                                        />{" "}
                                        <Text>EUR</Text>
                                    </div>
                                </Box>
                            ))
                        ) : (
                            <Text type={"p"} center className="w-full italic">
                                Das Menü ist derzeit leer.
                            </Text>
                        )}
                    </div>
                </div>
            )}
        </Page>
    );
}

export default RestaurantEdit;
