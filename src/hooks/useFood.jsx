import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const foodContext = createContext({});

const useFoodContext = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [validRooms, setValidRooms] = useState(rooms.map((room) => room.name));
    const [restaurants, setRestaurants] = useState([]);


    const fetchAllRooms = async () => {
        try {
            const res = await fetch("/api/v1/profiles", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }
            
            const data = await res.json();
            console.log(data);
            setRooms(data.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchAllRestaurants = async () => {
        try {
            const res = await fetch("/api/v1/restaurants", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }
            
            const data = await res.json();
            console.log("Restaurants", data);
            setRestaurants(data.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
            // {
            //     name: "McDonald's",
            //     id: "mcdonalds",
            //     menu: [
            //         { item: "Big Mac", price: 5.99 },
            //         { item: "Chicken Nuggets (6 pcs)", price: 4.49 },
            //         { item: "Fries", price: 2.99 },
            //         { item: "Coke", price: 1.99 },
            //     ],
            // },
    }

    useEffect(() => {
        fetchAllRooms();
        fetchAllRestaurants();
    }, []);


    return {
        rooms,
        setRooms,
        validRooms,
        setValidRooms,
        restaurants,
        setRestaurants,
        currentRoom,
        setCurrentRoom,
    };
};

export const useFood = () => useContext(foodContext);
export const FoodProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
