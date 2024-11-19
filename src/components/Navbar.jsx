import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

// Components
import Text from "./Text";

function Navbar() {
    const [menu, setMenu] = useState(false);

    const navItems = [
        { name: "Home", to: "/" },
        { name: "Bestellungen", to: "/orders" },
        { name: "History", to: "/history" },
        { name: "Profil", to: "/profile" },
    ];

    const handleMenu = () => {
        setMenu(!menu);
    }

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

                <div className="flex items-center md:hidden">
                    <button className="h-full w-full cursor-pointer mr-0" onClick={handleMenu}>
                        <HiMiniBars3BottomLeft size={30} />
                    </button>
                </div>

                <ul className={`absolute top-[120px] left-0 w-full h-[83.4vh] py-32 bg-primary-dark flex flex-col items-center justify-between gap-5 md:hidden transition-all ${menu ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
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
