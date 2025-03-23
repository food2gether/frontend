import { createContext, useContext } from "react";

export const LOADING_USER = {
    displayName: "Loading...",
    name: "Loading...",
    primaryEmail: "Loading...",
    profilePictureUrl: "",
};

const apiFetch = async (input, init = {}) => {
    const res = await fetch(input, { credentials: "same-origin", ...init });

    const data = await res.json();
    return data || { success: false, message: "Could not parse data" };
};

const apiPut = async (input, body, init = {}) => {
    return apiFetch(input, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        ...init,
    });
};

const apiGet = async (input, init = {}) => {
    return apiFetch(input, { method: "GET", ...init });
};

const useApiContext = () => {
    const fetchProfile = async (userId, setter) => {
        return await apiGet(`/api/v1/profiles/${userId}`, setter);
    };

    const fetchAllSessions = async (orderable = undefined) => {
        return await apiGet(`/api/v1/sessions${orderable !== undefined ? `?orderable=${orderable}` : ""}`);
    };

    const fetchSession = async (sessionId) => {
        return await apiGet(`/api/v1/sessions/${sessionId}`);
    };

    const fetchRestaurant = async (restaurantId) => {
        return await apiGet(`/api/v1/restaurants/${restaurantId}`);
    };

    const fetchAllRestaurants = async () => {
        return await apiGet(`/api/v1/restaurants/`);
    };

    const fetchMenu = async (restaurantId) => {
        return await apiGet(`/api/v1/restaurants/${restaurantId}/menu`);
    };

    const fetchOrders = async (sessionId, profileId) => {
        return await apiGet(`/api/v1/sessions/${sessionId}/orders${profileId !== undefined ? `?profile_id=${profileId}` : ""}`);
    };

    const placeOrder = async (sessionId, order) => {
        return await apiPut(`/api/v1/sessions/${sessionId}/orders`, order);
    };

    const createOrUpdateSession = async (session) => {
        return await apiPut(`/api/v1/sessions/`, session);
    };

    const createOrUpdateProfile = async (dto) => {
        return await apiPut(`/api/v1/profiles/`, dto);
    };

    const createOrUpdateRestaurant = async (dto) => {
        return await apiPut(`/api/v1/restaurants/`, dto);
    };

    const updateMenu = async (restaurantId, dto) => {
        return await apiPut(`/api/v1/restaurants/${restaurantId}/menu`, dto);
    };

    return {
        fetchProfile,
        fetchAllSessions,
        fetchSession,
        fetchRestaurant,
        fetchAllRestaurants,
        fetchMenu,
        fetchOrders,
        placeOrder,
        createOrUpdateSession,
        createOrUpdateProfile,
        createOrUpdateRestaurant,
        updateMenu,
    };
};

const apiContext = createContext({});
export const useAPI = () => useContext(apiContext);

export const APIProvider = ({ children }) => {
    const data = useApiContext();
    return <apiContext.Provider value={data}>{children}</apiContext.Provider>;
};

export default useAPI;
