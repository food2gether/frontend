import React from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

// Hooks
import { useUser } from "../hooks/useUser";

function Profile() {

    const { user } = useUser();

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
                <Text type={"h3"} bold clazzName={"mt-6"}>
                    {user.name}
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    {user.email}
                </Text>
                <div className="flex flex-col w-[250px]">
                    <Button type={"button"}>Change Password</Button>
                    <Button type={"button"}>Change Language</Button>
                    <Button type={"button"}>Log out</Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
