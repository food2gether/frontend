import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Text from "./Text";

function Navbar() {
    const navItems = [
        { name: "Home", to: "/" },
        { name: "Bestellungen", to: "/orders" },
        { name: "History", to: "/history" },
        { name: "Profil", to: "/profile" },
    ];

    return (
        <nav
            className="h-[120px] flex items-center justify-center fixed w-full top-0 bg-primary"
            style={{ zIndex: 999 }}
        >
            <div className="flex items-center justify-between gap-10 px-4 container-nav">
                <Text type={"h2"} bold light>
                    Food<p className="text-primary-dark inline">2</p>Gether
                </Text>

                <ul className="hidden md:flex items-center gap-10">
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.to}>
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
