import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useUser } from "../hooks/useUser";

// Icons
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

// Components
import Text from "./Text";
import Button from "./Button";

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [activeTab, setActivetab] = useState(0);

    const { loggedIn, setLoggedIn } = useUser();

    // get current route
    const currentRoute = window.location.pathname;

    const navItems = [
        { name: "Home", to: "/" },
        // { name: "Bestellungen", to: "/orders" },
        // { name: "Anfragen", to: "/Requests" },
        { name: "Profil", to: "/profile" },
    ];

    useEffect(() => {
        const activeIndex = navItems.findIndex((item) => item.to === currentRoute);
        if (activeIndex !== -1) {
            setActivetab(activeIndex);
        }
    }, [currentRoute]);

    const handleMenu = () => {
        setMenu(!menu);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <nav
            className="h-[80px] flex items-center justify-center fixed w-full top-0 bg-primary"
            style={{ zIndex: 999 }}
        >
            <div className="flex items-center justify-between gap-10 px-4 container-nav">
                <Link reloadDocument to="/">
                    <Text type={"h2"} bold light>
                        Food
                        <Text clazzName="text-primary-dark inline" type="h2">
                            2
                        </Text>
                        Gether
                    </Text>
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    {navItems.map((item, index) => (
                        <button
                            onClick={() => setActivetab(index)}
                            className={` ${activeTab === index ? "border-b-2 bg-red-500" : "bg-green-500"}"`}
                            key={index}
                        >
                            <Link reloadDocument key={index} to={item.to}>
                                <Text type={"p"} light>
                                    {item.name}
                                </Text>
                            </Link>
                        </button>
                    ))}
                    {loggedIn && (
                        <Link reloadDocument to={"/oauth2/sign_out"} onClick={handleLogout} className="bg-white px-5 py-2 rounded-xl">
                            <Text type={"p"} clazzName={"text-primary"}>
                                Logout
                            </Text>
                        </Link>
                    )}
                </ul>

                <div className="flex items-center md:hidden">
                    <button className="h-full w-full cursor-pointer mr-0" onClick={handleMenu}>
                        <HiMiniBars3BottomLeft size={30} />
                    </button>
                </div>

                <ul
                    className={`absolute top-[120px] left-0 w-full h-[83.4vh] py-32 bg-primary-dark flex flex-col items-center justify-between gap-5 md:hidden transition-all ${menu ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    {navItems.map((item, index) => (
                        <Link reloadDocument key={index} to={item.to}>
                            <Text type={"p"} light>
                                {item.name}
                            </Text>
                        </Link>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;