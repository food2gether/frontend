import React, { useState } from "react";
import { createContext, useContext } from "react";

const foodContext = createContext({});

const useFoodContext = () => {
    const [rooms, setRooms] = useState(fetchAllRooms());
    const [validRooms, setValidRooms] = useState(rooms.map((room) => room.name));
    const [restaurants, setRestaurants] = useState(fetchAllRestaurants());

    function fetchAllRooms() {
        return [
            {
                name: "robin",
                restoID: "mcdonalds",
            },
            {
                name: "kaan",
                restoID: "dominos",
            },
            {
                name: "nikolas",
                restoID: "subway",
            },
            {
                name: "marvin",
                restoID: "mcdonalds",
            },
            {
                name: "jo",
                restoID: "burgerking",
            },
        ];
    }

    function fetchAllRestaurants() {
        return [
            {
                name: "McDonald's",
                id: "mcdonalds",
                menu: [
                    { item: "Big Mac", price: 5.99 },
                    { item: "Chicken Nuggets (6 pcs)", price: 4.49 },
                    { item: "Fries", price: 2.99 },
                    { item: "Coke", price: 1.99 },
                ],
            },
            {
                name: "Burger King",
                id: "burgerking",
                menu: [
                    { item: "Whopper", price: 6.49 },
                    { item: "Chicken Fries", price: 3.99 },
                    { item: "Onion Rings", price: 2.79 },
                    { item: "Pepsi", price: 1.89 },
                ],
            },
            {
                name: "KFC",
                id: "kfc",
                menu: [
                    { item: "Bucket (8 pcs)", price: 12.99 },
                    { item: "Zinger Burger", price: 4.99 },
                    { item: "Coleslaw", price: 1.49 },
                    { item: "Sprite", price: 1.99 },
                ],
            },
            {
                name: "Subway",
                id: "subway",
                menu: [
                    { item: "Italian B.M.T.", price: 6.49 },
                    { item: "Turkey Breast", price: 5.99 },
                    { item: "Veggie Delight", price: 4.99 },
                    { item: "Iced Tea", price: 1.89 },
                ],
            },
            {
                name: "Domino's",
                id: "dominos",
                menu: [
                    { item: "Pepperoni Pizza (M)", price: 8.99 },
                    { item: "Garlic Bread", price: 3.99 },
                    { item: "Chicken Wings (6 pcs)", price: 5.99 },
                    { item: "Fanta", price: 1.99 },
                ],
            },
        ];
    }

    return {
        rooms,
        setRooms,
        validRooms,
        setValidRooms,
        restaurants,
        setRestaurants,
    };
};

export const useFood = () => useContext(foodContext);
export const FoodProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
