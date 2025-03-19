import React, { useEffect, useState } from "react";

// Components
import Text from "../../components/Text.jsx";

// Hooks
import useAPI from "../../hooks/useAPI.jsx";
import { useParams } from "react-router-dom";
import Page from "../../components/Page.jsx";
import Button from "../../components/Button.jsx";
import ToolBar from "../../components/ToolBar.jsx";

function ProfileProperty({ label, value }) {
    return value ? (
        <Text type={"p"}>
            <strong>{label}: </strong>
            {value}
        </Text>
    ) : null;
}

function ProfileView() {
    const { id } = useParams();
    const [profile, setProfile] = useState();

    const { fetchProfile } = useAPI();
    useEffect(() => {
        fetchProfile(id).then((response) => {
            setProfile(response.data);
        });
    }, []);

    return (
        <Page title="Profil" description="Hier kannst du dein Profil sehen.">
            <ToolBar>
                <Button linkTo="/profile/edit" fill arrow>
                    Profil bearbeiten
                </Button>
            </ToolBar>
            <div className="flex flex-row">
                <div className="w-1/3">
                    <div>
                        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-full mb-3 bg-primary border-4 border-primary">
                            {profile?.profilePictureUrl ? (
                                <img src={profile.profilePictureUrl} alt="ProfileView Picture" className="size-full rounded-full object-cover" />
                            ) : (
                                <p className={"text-9xl font-bold"}>?</p>
                            )}
                        </div>
                    </div>
                    <Text type={"h2"} bold className={"mt-8 mb-2 text-primary"}>
                        {profile?.displayName}
                    </Text>
                    <div className="flex flex-col gap-2">
                        <ProfileProperty label="Benutzername" value={profile?.name} />
                        <ProfileProperty label="Email" value={profile?.primaryEmail} />
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default ProfileView;
