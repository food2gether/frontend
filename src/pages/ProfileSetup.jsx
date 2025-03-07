import PageHeader from "../components/PageHeader.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Text from "../components/Text.jsx";
import { RxCross2 } from "react-icons/rx";
import useAPI from "../hooks/useAPI.jsx";

function ValidatedInput({ onChange, valid, placeholder, defaultValue }) {
    return (
        <div className={"w-full flex flex-row items-center gap-3"}>
            <input
                type="text"
                placeholder={placeholder}
                className="border border-gray-300 px-5 py-[10px] rounded-xl mt-1 text-black text-lg w-1/3"
                onChange={(event) => onChange(event.target.value)}
                defaultValue={defaultValue}
            />
            {valid ? (
                <Text type={"h3"} clazzName={"text-green-600"}>
                    <FaCheck />
                </Text>
            ) : (
                <Text type={"h3"} clazzName={"text-red-600"}>
                    <RxCross2 />
                </Text>
            )}
        </div>
    );
}

function ProfileSetup() {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const { fetchSelf, setupProfile } = useAPI();

    const [displayName, setDisplayName] = useState("");
    const [paypalMe, setPaypalMe] = useState("");
    const [paypalMeValid, setPaypalMeValid] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [profilePictureUrlValid, setProfilePictureUrlValid] = useState(true);
    const [showError, setShowError] = useState(false);
    const [self, setSelf] = useState(null);

    useEffect(() => {
        fetchSelf(false, setSelf);
    }, []);

    useEffect(() => {
      if (self) {
        handlePaypalMeChange(self.name);
        handleDisplayNameChange(self.displayName);
        handleProfilePictureUrlChange(self.profilePictureUrl);
      }
    }, [self])

    const handleDisplayNameChange = (val) => {
        setDisplayName(val);
    };

    const handlePaypalMeChange = (val) => {
        setPaypalMe(val);
        // TODO validate
        setPaypalMeValid(val);
    };

    const handleProfilePictureUrlChange = (val) => {
        setProfilePictureUrl(val);
        // TODO validate
    };

    const handleFinish = () => {
        console.log(self);
        if (displayName && paypalMeValid && profilePictureUrlValid) {
            const dto = {
                displayName,
                name: paypalMe,
                profilePictureUrl,
            };
            if (self) {
                dto.id = self.id;
            }
            setupProfile(dto, () => {
                navigate(searchParams.get("redirect") || "/profile/me");
            }).then((val) => {
                if (!val) {
                    setShowError(true);
                }
            });
        }
    };

    return (
        <div className={"w-full flex flex-col gap-6"}>
            <PageHeader
                title={"Profil Setup"}
                description={"Bitte richte erst dein Profil ein, bevor du weiter gehst."}
            />

            <div className={"flex flex-col gap-4"}>
                <ValidatedInput
                    placeholder="Anzeige-Name"
                    valid={displayName?.length >= 3}
                    onChange={handleDisplayNameChange}
                    defaultValue={self?.displayName}
                />
                <ValidatedInput
                    placeholder="Paypal.me-Name"
                    valid={paypalMeValid}
                    onChange={handlePaypalMeChange}
                    defaultValue={self?.name}
                />
                <ValidatedInput
                    placeholder="Profilbild-URL (optional)"
                    valid={profilePictureUrlValid}
                    onChange={handleProfilePictureUrlChange}
                    defaultValue={self?.profilePictureUrl}
                />
            </div>

            <Button
                slide
                clazzName={"self-center"}
                disabled={!(displayName && paypalMeValid && profilePictureUrlValid)}
                onClick={handleFinish}
            >
                Fertig
            </Button>
            {showError && (
                <Text type={"p"} clazzName={"!text-red-500 w-1/2 text-center self-center"}>
                    Es gab einen Fehler. Hast du vielleicht den PayPal.me-Namen eines anderen
                    eingetragen?
                </Text>
            )}
        </div>
    );
}

export default ProfileSetup;
