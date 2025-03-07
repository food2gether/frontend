import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const location = useLocation();

    const fetchSelf = async (redirect = true, setter) => {
        const self = await apiFetch("/api/v1/profiles/me", (val) => {
          setSelf(val)
          if (setter) {
              setter(val);
          }
        });
        if (!self && redirect) {
            navigate("/profile/setup?redirect=" + encodeURIComponent(location.pathname));
        }
        return self;
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

    const fetchAllRestaurants = async (setter) => {
        return await apiFetch(`/api/v1/restaurants/`, setter);
    };

    const fetchMenu = async (restaurantId, setter) => {
        return await apiFetch(`/api/v1/restaurants/${restaurantId}/menu`, setter);
    };

    const fetchOrders = async ({ sessionId, profileId }, setter) => {
        return await apiFetch(
            `/api/v1/sessions/${sessionId}/orders${profileId !== undefined ? `?profile_id=${profileId}` : ""}`,
            setter,
        );
    };

    const placeOrder = async (sessionId, order, setter) => {
        return await apiFetch(`/api/v1/sessions/${sessionId}/orders`, setter, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    };

    const createSession = async (session, setter) => {
        return await apiFetch(`/api/v1/sessions/`, setter, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(session),
        });
    };

    const setupProfile = async (dto, setter) => {
        return await apiFetch(`/api/v1/profiles/`, setter, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
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
        fetchAllRestaurants,
        fetchMenu,
        fetchOrders,
        placeOrder,
        createSession,
        setupProfile,
    };
};
export const useAPI = () => useContext(apiContext);
export const APIProvider = ({ children }) => {
    const data = useApiContext();
    return <apiContext.Provider value={data}>{children}</apiContext.Provider>;
};

export default useAPI;
