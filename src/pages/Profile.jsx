import React, { useEffect, useState } from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import useFood from "../hooks/useFood";
import { use } from "react";

function Profile() {
    const { users } = useFood();
    const [userId, setUserId] = useState(0);

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
                    src={users[userId]?.profilePictureUrl}
                    alt=""
                    className="w-[200px] h-[200px] object-cover rounded-full mb-3 bg-primary border-4 border-primary"
                />
                <Text type={"h2"} bold clazzName={"mt-8 mb-2 text-primary"}>
                    {users[userId]?.name}
                </Text>
                <Text type={"p"} clazzName={"mt-0 mb-2"}>
                    <strong>Benutzername:</strong> {users[userId]?.displayName}
                </Text>
                {users[userId]?.primaryEmail && (
                    <Text type={"p"} clazzName={"mb-6"}>
                        <strong>Email:</strong> {users[userId]?.primaryEmail}
                    </Text>
                )}
            </div>
        </div>
    );
}

export default Profile;
