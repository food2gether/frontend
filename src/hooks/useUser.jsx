import React, { createContext, useContext, useEffect, useState } from "react";
import useAPI from "./useAPI.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const pathsWithoutProfile = ["/profile/edit", "/login"];

export const loggedIn = () => {
    let cookieTemp = document.cookie;
    document.cookie = "_oauth2_proxy=some_val;path=/;";
    let cookieIndex = document.cookie.indexOf("_oauth2_proxy=");
    document.cookie = cookieTemp;
    // when cookie is set it will be removed from cookies
    return cookieIndex === -1;
};

const useUserContext = () => {
    const { fetchProfile } = useAPI();
    const [data, setData] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile("me").then((response) => {
            if (response.data) {
                setData(response.data);
            } else if (pathsWithoutProfile.indexOf(location.pathname) === -1) {
                navigate("/profile/edit");
            }
        });
    }, []);

    return {
        data,
    };
};

const userContext = createContext({});

export const useUser = () => useContext(userContext);
export const UserProvider = ({ children }) => {
    const data = useUserContext();
    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default useUser;
