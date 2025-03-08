import React, { useEffect, useState } from "react";

// Components
import Text from "../components/Text";

// Hooks
import useAPI from "../hooks/useAPI";
import { useParams } from "react-router-dom";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

function ProfileProperty({ label, value }) {
    return value ? (
        <Text type={"p"}>
            <strong>{label}: </strong>
            {value}
        </Text>
    ) : null;
}

function Profile() {
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
            <div className={"flex flex-row items-center justify-end"}>
                <Button link="/profile/edit" slide>Profil bearbeiten</Button>
            </div>
            <div className="flex flex-row">
                <div className="w-1/3">
                    <div>
                        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-full mb-3 bg-primary border-4 border-primary">
                            {profile?.profilePictureUrl ? (
                                <img
                                    src={profile.profilePictureUrl}
                                    alt="Profile Picture"
                                    className="size-full rounded-full object-cover"
                                />
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

export default Profile;
