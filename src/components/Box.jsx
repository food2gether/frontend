import React from "react";

// Components
import Text from "./Text";
import Button from "./Button";

function Box({ title, description, button, onClick, row, children }) {
    return (
        <div
            className="rounded-lg p-4 mb-2 border border-primary cursor-pointer"
            onClick={onClick}
        >
            <div className={"flex " + (row ? "flex-row items-center justify-between" : "flex-col items-start gap-2")}>
                <div>
                    <Text type={"h3"} bold>
                        {title}
                    </Text>
                    <Text>{description}</Text>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Box;
