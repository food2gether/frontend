import { createContext, useContext, useEffect, useState } from "react";

const foodContext = createContext({});

const useFoodContext = () => {
    const [rooms, setRooms] = useState([]);
    const [users , setUsers] = useState([]);
    const [restaurants , setRestaurants] = useState([]);
    const [menu , setMenu] = useState([]);

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

    const fetchAllRestaurants = async () => {
        try {
            const res = await fetch(`/api/v1/restaurants/`, {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            setRestaurants(data.data);
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await fetch(`/api/v1/profiles/`, {
                method: "GET",
                credentials: "same-origin",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }

            const data = await res.json();
            setUsers(data.data);
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
            setMenu(data.data);
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }
    useEffect(() => {
        fetchAllRooms();
        fetchAllRestaurants();
        fetchAllUsers();
    }, []);

    return {
        rooms,
        users,
        restaurants,
        menu,
        setMenu,
        setRestaurants,
        setUsers,
        setRooms,
        fetchAllRooms,
        fetchAllRestaurants,
        fetchUser,
    };
};

export const useFood = () => useContext(foodContext);
export const FoodProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
