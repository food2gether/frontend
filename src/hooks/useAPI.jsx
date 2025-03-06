import { createContext, useContext, useState } from "react";
import order from "../pages/Order.jsx";

const apiContext = createContext({});

export const LOADING_USER = {
    displayName: "Loading...",
    name: "Loading...",
    primaryEmail: "Loading...",
    profilePictureUrl: "",
};

const apiFetch = async (input, setter, init = {}) => {
    const res = await fetch(input, { credentials: "same-origin", method: "GET", ...init });

    if (!res.ok) {
        console.error(await res.text());
        return;
    }

    const data = await res.json();
    if (setter) {
        setter(data.data);
    }
    return data.data;
};

const useApiContext = () => {
    const [rooms, setRooms] = useState([]);
    const [self, setSelf] = useState({ ...LOADING_USER });

    const fetchSelf = async () => {
        return await apiFetch("/api/v1/profiles/me", setSelf);
    };

    const fetchUser = async (userId, setter) => {
        return await apiFetch(`/api/v1/profiles/${userId}`, setter);
    };

    const fetchAllRooms = async (orderable = undefined) => {
        return await apiFetch(
            `/api/v1/sessions${orderable !== undefined ? `?orderable=${orderable}` : ""}`,
            setRooms,
        );
    };

    const fetchRoom = async (sessionId, setter) => {
        return await apiFetch(`/api/v1/sessions/${sessionId}`, setter);
    };

    const fetchRestaurant = async (restaurantId, setter) => {
        return await apiFetch(`/api/v1/restaurants/${restaurantId}`, setter);
    };

    const fetchMenu = async (restaurantId, setter) => {
        return await apiFetch(`/api/v1/restaurants/${restaurantId}/menu`, setter);
    };

    const fetchOrders = async (sessionId, setter) => {
        return await apiFetch(`/api/v1/sessions/${sessionId}/orders`, setter);
    };

    const placeOrder = async (sessionId, order) => {
        return await apiFetch(`/api/v1/sessions/${sessionId}/orders`, undefined, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    };

    return {
        rooms,
        self,
        fetchSelf,
        fetchUser,
        fetchAllRooms,
        fetchRoom,
        fetchRestaurant,
        fetchMenu,
        fetchOrders,
        placeOrder,
    };
};
export const useAPI = () => useContext(apiContext);
export const APIProvider = ({ children }) => {
    const data = useApiContext();
    return <apiContext.Provider value={data}>{children}</apiContext.Provider>;
};

export default useAPI;
