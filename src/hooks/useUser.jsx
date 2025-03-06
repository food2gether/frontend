import React, { useState } from "react";
import { createContext, useContext } from "react";

const userContext = createContext({});

const useUserContext = () => {
    const loggedIn = () => {
      let cookieTemp = document.cookie
      document.cookie = "_oauth2_proxy=some_val;path=/;"
      let cookieIndex = document.cookie.indexOf('_oauth2_proxy=');
      document.cookie = cookieTemp;
      // when cookie is set it will be removed from cookies
      return cookieIndex === -1;
    }

    const [order, setOrder] = useState({});
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([
        {
            id: 1,
            name: "Robin Ahn",
            profilePic: "https://robin-ahn.de/assets/avatar.svg",
            totalPrice: 34,
            isPaid: false,
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
            id: 2,
            name: "Lennart",
            profilePic:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIOsebFecOQ9G8y-YB9r5dnEd1HytZXQ4Yg&s",
            totalPrice: 20,
            isPaid: false,
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
    ]);
    const [moneyToPay, setMoneyToPay] = useState(0);
    const [state, setState] = useState("home");
    const [user, setUser] = useState({
        name: "Robin Ahn",
        age: 20,
        email: "robin.ahn99@gmail.com",
        phone: "+49 151 234 56 789",
        profilePic: "https://robin-ahn.de/assets/avatar.svg",
    });

    return {
        loggedIn,
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
