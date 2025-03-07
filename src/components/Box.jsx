import React from "react";

// Components
import Text from "./Text";
import Button from "./Button";

function Box({ children, title, details, img, button, session, onClick, row }) {
    return (
        <div
            className="bg-white rounded-lg p-4 mb-2 border border-primary w-full min-w-[500px] h-auto cursor-pointer"
            onClick={onClick}
        >
            {!row && (
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
                        <Text>{session}</Text>
                    </div>
                </div>
            )}
            {row && (
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <Text type={"h3"} bold>
                            {title}
                        </Text>
                        <Text>{details}</Text>
                    </div>
                    <Button slide clazzName={"mt-2"}>
                        <Text light>{button}</Text>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Box;
