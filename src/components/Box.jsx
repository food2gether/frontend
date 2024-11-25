import React from "react";

// Components
import Text from "./Text";
import Button from "./Button";

function Box({ children, title, details, button }) {
    return (
        <div className="bg-white p-4 rounded-lg mb-2 border border-primary max-w-[500px]">
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
    );
}

export default Box;
