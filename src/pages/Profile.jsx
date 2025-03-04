import React, { useEffect, useState } from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import useFood from "../hooks/useFood";

function Profile() {
    const { user } = useFood();

    return (
        <div className="navMargin">
            <div className="container">
                <Text type={"h2"} bold>
                    Profil
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    Hier kannst du dein Profil sehen.
                </Text>
                <img
                    src={user.profilePictureUrl}
                    alt=""
                    className="w-[200px] h-[200px] object-cover rounded-full mb-3 bg-gray-600"
                />
                <Text type={"h2"} bold clazzName={"mt-8 mb-2 text-primary"}>
                    {user.name}
                </Text>
                <Text type={"p"} clazzName={"mt-0 mb-2"}>
                    <strong>Benutzername:</strong> {user.displayName}
                </Text>
                {user.primaryEmail && (
                    <Text type={"p"} clazzName={"mb-6"}>
                        <strong>Email:</strong> {user.primaryEmail}
                    </Text>
                )}
            </div>
        </div>
    );
}

export default Profile;
