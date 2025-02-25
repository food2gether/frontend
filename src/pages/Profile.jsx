import React, { useEffect } from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import { useUser } from "../hooks/useUser";

function Profile() {
    const { user } = useUser();

    
    const request = async (url, options) => {
        const res = await fetch(url, {
            method: options?.method || "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(options?.body),
        });

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        return await res.json();
    }

    const getProfile = async () => {
        try {
            const res = await request("http://localhost/api/v1/profiles");
            return res;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getProfile();
    }
    , []);

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
                    className="w-[200px] h-[200px] rounded-full mb-3"
                />
                <Text type={"h3"} bold clazzName={"mt-6 mb-2"}>
                    {user.name}
                </Text>
                <Text type={"p"} clazzName={"mb-2"}>
                   <strong> E-Mail: </strong> <br />{user.email}
                </Text>
                <Text type={"p"} clazzName={"mb-1"}>
                    <strong> Telefonnummer: </strong> <br />{user.phone}
                </Text>
            </div>
        </div>
    );
}

export default Profile;
