import { createContext, useContext, useEffect, useState } from "react";

const foodContext = createContext({});

const useFoodContext = () => {

    const [rooms, setRooms] = useState([]);
    const [user , setUser] = useState({});

    const fetchAllRooms = async () => {
        try {
            const res = await fetch("/api/v1/sessions", {
                method: "GET",
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
    }

    const fetchUser = async (userId) => {
        try {
            const res = await fetch(`/api/v1/profiles/${userId}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }
            
            const data = await res.json();
            setUser(data.data);
            return data.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        fetchAllRooms();
        fetchUser("1731095302112");
    }
    , []);

    return {
        rooms,
        user,
        setUser,
        setRooms,
        fetchAllRooms,
        fetchRestaurant,
        fetchUser,
    };
};

export const useFood = () => useContext(foodContext);
export const FoodProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
