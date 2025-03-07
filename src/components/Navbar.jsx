import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useUser } from "../hooks/useUser";

// Icons

// Components
import Text from "./Text";

function Navbar() {
    const [activeTab, setActiveTab] = useState(0);

    const { loggedIn } = useUser();

    // get current route
    const currentRoute = window.location.pathname;

    const navItems = [
        { name: "Home", to: "/" },
        { name: "Profil", to: "/profile/me" },
    ];

    useEffect(() => {
        const activeIndex = navItems.findIndex((item) => item.to === currentRoute);
        if (activeIndex !== -1) {
            setActiveTab(activeIndex);
        }
    }, [currentRoute]);

    return (
        <nav
            className="h-[80px] flex items-center justify-center fixed w-full top-0 bg-primary"
            style={{ zIndex: 999 }}
        >
            <div
                className={`flex items-center ${loggedIn() ? "justify-between" : "justify-center"} gap-10 px-4 container-nav`}
            >
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
                                <button
                                    onClick={() => setActiveTab(index)}
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

                            <Link to={"/oauth2/sign_out"} className="bg-white px-5 py-2 rounded-xl">
                                <Text type={"p"} clazzName={"text-primary"}>
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
