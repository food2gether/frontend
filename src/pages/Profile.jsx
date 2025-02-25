import React, { useEffect } from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import { useUser } from "../hooks/useUser";

function Profile() {
    const { user } = useUser();

    const getProfile = async () => {
        try {
            const res = await fetch("/api/v1/profiles/", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`An error occurred: ${res.statusText}`);
            }
            
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

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
