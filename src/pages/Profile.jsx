import React from "react";

// Components
import Text from "../components/Text";
import Button from "../components/Button";

function Profile() {
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
                    src="https://pbs.twimg.com/ext_tw_video_thumb/1846130111277309952/pu/img/SKyz6N_ky7cZbwfd?format=jpg&name=large"
                    alt=""
                    className="w-[200px] h-[200px] rounded-full mb-3"
                />
                <Text type={"h3"} bold clazzName={"mt-6"}>
                    Veni whehnie
                </Text>
                <Text type={"p"} clazzName={"mb-6"}>
                    @venicraft
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
