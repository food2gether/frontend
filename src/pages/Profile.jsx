import React, { useEffect, useState } from "react";

// Components
import Text from "../components/Text";

// Hooks
import useAPI from "../hooks/useAPI";
import PageHeader from "../components/PageHeader.jsx";
import { useParams } from "react-router-dom";

function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState();

    const { fetchUser } = useAPI();
    useEffect(() => {
        fetchUser(id, setProfile);
    }, []);

    return (
        <>
            <PageHeader title="Profil" description="Hier kannst du dein Profil sehen." />
            {profile?.profilePictureUrl ? (
                <img
                    src={profile.profilePictureUrl}
                    alt=""
                    className="w-[200px] h-[200px] object-cover rounded-full mb-3 bg-primary border-4 border-primary"
                />
            ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center rounded-full mb-3 bg-primary border-4 border-primary">
                    <p className={"text-9xl font-bold"}>?</p>
                </div>
            )}
            <Text type={"h2"} bold clazzName={"mt-8 mb-2 text-primary"}>
                {profile?.displayName}
            </Text>
            <Text type={"p"} clazzName={"mt-0 mb-2"}>
                <strong>Benutzername:</strong> {profile?.name}
            </Text>
            {profile?.primaryEmail && (
                <Text type={"p"} clazzName={"mb-6"}>
                    <strong>Email:</strong> {profile?.primaryEmail}
                </Text>
            )}
        </>
    );
}

export default Profile;
