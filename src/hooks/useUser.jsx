import React, { useState } from "react";
import { createContext, useContext } from "react";

const userContext = createContext({});

const useUserContext = () => {
    const [order, setOrder] = useState({});
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([
        {
            name: "Robin Ahn",
            profilePic: "https://robin-ahn.de/assets/avatar.svg",
            totalPrice: 69.69,
            order: [
                {
                    id: 1,
                    date: "2021-07-01",
                    items: [
                        {
                            name: "Coca Cola",
                            price: 1.5,
                            quantity: 2,
                        },
                        {
                            name: "Fanta",
                            price: 1.5,
                            quantity: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: "Kaan Güven",
            profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIOsebFecOQ9G8y-YB9r5dnEd1HytZXQ4Yg&s",
            totalPrice: 420,
            order: [
                {
                    id: 1,
                    date: "2021-07-01",
                    items: [
                        {
                            name: "Coca Cola",
                            price: 1.5,
                            quantity: 2,
                        },
                        {
                            name: "Fanta",
                            price: 1.5,
                            quantity: 1,
                        },
                    ],
                },
            ],
        }
    ]);
    const [moneyToPay, setMoneyToPay] = useState(0);
    const [state, setState] = useState("home");
    const [user, setUser] = useState({
        name: "Robin",
        age: 20,
        email: "robin.ahn99@gmail.com",
        profilePic: "https://robin-ahn.de/assets/avatar.svg",
    });

    return {
        order,
        setOrder,
        orders,
        setOrders,
        userOrders,
        setUserOrders,
        moneyToPay,
        setMoneyToPay,
        state,
        setState,
        user,
        setUser,
    };
};

export const useUser = () => useContext(userContext);
export const UserProvider = ({ children }) => {
    const data = useUserContext();
    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default useUser;
