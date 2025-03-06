import React, { useEffect } from "react";

// Components
import Text from "../components/Text";

// Hooks
import useAPI from "../hooks/useAPI";
import PageHeader from "../components/PageHeader.jsx";

function Profile() {
    const { self, fetchSelf } = useAPI();
    useEffect(() => {
      fetchSelf()
    }, []);

    return (
        <div className="navMargin">
            <div className="container">
              <PageHeader title="Profil" description="Hier kannst du dein Profil sehen."/>
                {self?.profilePictureUrl ? (
                    <img
                        src={self.profilePictureUrl}
                        alt=""
                        className="w-[200px] h-[200px] object-cover rounded-full mb-3 bg-primary border-4 border-primary"
                    />
                ) : (
                    <div className="w-[200px] h-[200px] flex items-center justify-center rounded-full mb-3 bg-primary border-4 border-primary">
                        <p className={"text-9xl font-bold"}>?</p>
                    </div>
                )}
                <Text type={"h2"} bold clazzName={"mt-8 mb-2 text-primary"}>
                    {self?.displayName}
                </Text>
                <Text type={"p"} clazzName={"mt-0 mb-2"}>
                    <strong>Benutzername:</strong> {self?.name}
                </Text>
                {self?.primaryEmail && (
                    <Text type={"p"} clazzName={"mb-6"}>
                        <strong>Email:</strong> {self?.primaryEmail}
                    </Text>
                )}
            </div>
        </div>
    );
}

export default Profile;
