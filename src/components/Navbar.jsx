import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { loggedIn } from "../hooks/useUser";

import Text from "./Text";

function Navbar() {
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();

    const navItems = [
        { name: "Home", to: "/" },
        { name: "Restaurants", to: "/restaurants" },
        { name: "Profil", to: "/profile/me" },
    ];

    useEffect(() => {
        const activeIndex = navItems.findIndex((item) => item.to === location.pathname);
        if (activeIndex !== -1) {
            setActiveTab(activeIndex);
        }
    }, [location]);

    return (
        <nav className="h-[80px] flex items-center justify-center fixed w-full top-0 bg-primary" style={{ zIndex: 999 }}>
            <div className={`flex items-center ${loggedIn() ? "justify-between" : "justify-center"} gap-10 px-4`}>
                <Link reloadDocument to="/">
                    <Text type={"h2"} bold light>
                        Food
                        <span className="text-primary-dark inline">2</span>
                        Gether
                    </Text>
                </Link>

                {loggedIn() && (
                    <>
                        <ul className="hidden md:flex items-center gap-10">
                            {navItems.map((item, index) => (
                                <button onClick={() => setActiveTab(index)} className={` ${activeTab === index ? "border-b-2 bg-red-500" : "bg-green-500"}"`} key={index}>
                                    <Link reloadDocument key={index} to={item.to}>
                                        <Text type={"p"} light>
                                            {item.name}
                                        </Text>
                                    </Link>
                                </button>
                            ))}

                            <Link reloadDocument to={"/oauth2/sign_out"} className="bg-white px-5 py-2 rounded-xl">
                                <Text type={"p"} className={"text-primary"}>
                                    Logout
                                </Text>
                            </Link>
                        </ul>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
