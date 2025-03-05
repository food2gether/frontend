import { createContext, useContext, useEffect, useState } from "react";

const foodContext = createContext({});

const useFoodContext = () => {
    const [rooms, setRooms] = useState([]);
    const [self, setSelf] = useState({
        displayName: "Loading...",
        name: "Loading...",
        primaryEmail: "Loading...",
        profilePictureUrl: "",
    });

    const fetchSelf = async () => {
        try {
            const res = await fetch("/api/v1/profiles/me", {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${await res.text()}`);
            }

            const data = await res.json();
            setSelf(data.data);
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchAllRooms = async () => {
        try {
            const res = await fetch("/api/v1/sessions", {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            setRooms(data.data);
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchRestaurant = async (restaurantId) => {
        try {
            const res = await fetch(`/api/v1/restaurants/${restaurantId}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchUser = async (userId) => {
        try {
            const res = await fetch(`/api/v1/profiles/${userId}`, {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchMenu = async (restaurantId) => {
        try {
            const res = await fetch(`/api/v1/restaurants/${restaurantId}/menu`, {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    useEffect(() => {
        fetchAllRooms();
        fetchSelf();
    }, []);

    return {
        rooms,
        self,
        fetchRestaurant,
        fetchMenu,
        fetchUser,
    };
};

export const useFood = () => useContext(foodContext);
export const FoodProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
