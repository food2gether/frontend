import React, { useState } from "react";
import { createContext, useContext } from "react";

const userContext = createContext({});

const useUserContext = () => {
    const [order, setOrder] = useState({});
    const [moneyToPay, setMoneyToPay] = useState(0);
    const [state, setState] = useState("home");

    return {
        order,
        setOrder,
        moneyToPay,
        setMoneyToPay,
        state,
        setState,
    };
};

export const useUser = () => useContext(userContext);
export const UserProvider = ({ children }) => {
    const data = useUserContext();
    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default useUser;
