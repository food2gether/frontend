import React from "react";

// Components
import Text from "./Text";
import Button from "./Button";

function Box({ children, title, details, img, button, room, onClick }) {
    return (
        <div
            className="bg-white rounded-lg p-4 mb-2 border border-primary max-w-[500px] h-[150px] cursor-pointer"
            onClick={onClick}
        >
            <div className="relative">
                <div>
                    <Text type={"h3"} bold>
                        {title}
                    </Text>
                    <Text>{details}</Text>
                </div>
                <Button slide clazzName={"mt-2"}>
                    <Text light>{button}</Text>
                </Button>
                <div className="absolute top-0 right-0 text-black">
                    <Text>{room}</Text>
                </div>
            </div>
        </div>
    );
}

export default Box;
