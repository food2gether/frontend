import React, { useEffect } from "react";
import { createContext, useContext } from "react";

const foodContext = createContext({});

const useFoodContext = () => {
    const [rooms, setRooms] = useState([]);

    return {
        rooms,
        setRooms,
    };
};

export const useFood = () => useContext(foodContext);
export const UserProvider = ({ children }) => {
    const data = useFoodContext();
    return <foodContext.Provider value={data}>{children}</foodContext.Provider>;
};

export default useFood;
