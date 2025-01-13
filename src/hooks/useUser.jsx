import React, { useState } from "react";
import { createContext, useContext } from "react";

const userContext = createContext({});

const useUserContext = () => {
    const [order, setOrder] = useState({});
    const [orders, setOrders] = useState([]);
    const [moneyToPay, setMoneyToPay] = useState(0);
    const [state, setState] = useState("home");
    const [user, setUser] = useState({ name: "Robin", age: 20, email: "robin.ahn99@gmail.com", profilePic: "https://robin-ahn.de/assets/avatar.svg" });

    return {
        order,
        setOrder,
        orders,
        setOrders,
        moneyToPay,
        setMoneyToPay,
        state,
        setState,
        user,
        setUser
    };
};

export const useUser = () => useContext(userContext);
export const UserProvider = ({ children }) => {
    const data = useUserContext();
    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default useUser;
