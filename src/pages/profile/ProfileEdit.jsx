import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Text from "../../components/Text.jsx";
import useAPI from "../../hooks/useAPI.jsx";
import Page from "../../components/Page.jsx";
import useUser from "../../hooks/useUser.jsx";
import Button from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";

function ProfileEdit() {
    const [searchParams, ] = useSearchParams();
    const navigate = useNavigate();
    const { createOrUpdateProfile } = useAPI();
    const { data: self } = useUser();

    const [displayName, setDisplayName] = useState("");
    const [displayNameValid, setDisplayNameValid] = useState(false);
    const [paypalMe, setPaypalMe] = useState("");
    const [paypalMeValid, setPaypalMeValid] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [profilePictureUrlValid, setProfilePictureUrlValid] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (self) {
            handlePaypalMeChange(self.name);
            handleDisplayNameChange(self.displayName);
            handleProfilePictureUrlChange(self.profilePictureUrl);
        }
    }, [self]);

    const handleDisplayNameChange = (val) => {
        setDisplayName(val);
        setDisplayNameValid(!!val && val.length >= 3)
    };

    const handlePaypalMeChange = (val) => {
        setPaypalMe(val);
        setPaypalMeValid(!!val);
    };

    const handleProfilePictureUrlChange = (val) => {
        setProfilePictureUrl(val);
        setProfilePictureUrlValid(!val || val.startsWith("http"));
    };

    const handleFinish = () => {
        if (displayName?.length >= 3 && paypalMeValid && profilePictureUrlValid) {
            const dto = {
                displayName,
                name: paypalMe,
                profilePictureUrl,
            };
            if (self) {
                dto.id = self.id;
            }
            createOrUpdateProfile(dto).then((response) => {
                if (response.data) {
                    navigate(searchParams.get("redirect") || "/profile/me");
                } else {
                    setShowError(true);
                }
            });
        }
    };

    return (
        <Page title={"Profil Setup"} className={"w-full flex flex-col gap-6"}>
            <div className={"flex flex-col gap-4"}>
                <Input
                    type="text"
                    placeholder="Anzeige-Name"
                    onChange={(event) => handleDisplayNameChange(event.target.value)}
                    defaultValue={self?.displayName}
                    valid={displayName?.length >= 3}
                    className="w-1/3"
                />
                <Input
                    type="text"
                    placeholder="Paypal.me-Name"
                    onChange={(event) => handlePaypalMeChange(event.target.value)}
                    defaultValue={self?.name}
                    valid={paypalMeValid}
                    className="w-1/3"
                />
                <Input
                    type="text"
                    placeholder="Profilbild-URL (optional)"
                    onChange={(event) => handleProfilePictureUrlChange(event.target.value)}
                    defaultValue={self?.profilePictureUrl}
                    valid={profilePictureUrlValid}
                    className="w-1/3"
                />
            </div>

            <Button fill arrow className={"self-center"} checkDisabled={() => !(displayNameValid && paypalMeValid && profilePictureUrlValid)} onClick={handleFinish}>
                Fertig
            </Button>
            {showError && (
                <Text type={"p"} className={"!text-red-500 w-1/2 text-center self-center"}>
                    Es gab einen Fehler. Hast du vielleicht den PayPal.me-Namen eines anderen eingetragen?
                </Text>
            )}
        </Page>
    );
}

export default ProfileEdit;
