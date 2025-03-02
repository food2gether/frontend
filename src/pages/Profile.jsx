import React, { useEffect, useState } from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import useFood from "../hooks/useFood";

function Profile() {
    const { fetchUser, user } = useFood();

    console.log(user);
    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold>
                    Profil
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du dein Profil bearbeiten.
                </Text>
                <img
                    src={user.profilePic}
                    alt=""
                    className="w-[200px] h-[200px] rounded-full mb-3 bg-gray-600"
                />
                <Text type={"h3"} bold clazzName={"mt-6 mb-2"}>
                    {user.displayname}
                </Text>
                {user?.contact?.map((contact, index) => (
                    <Text type={"p"} key={index} clazzName={"mb-2"}>
                        <span className="font-bold">{contact.displayname}</span>: {contact.value}
                    </Text>
                ))}
            </div>
        </div>
    );
}

export default Profile;
