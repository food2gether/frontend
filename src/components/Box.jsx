import Text from "./Text.jsx";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import React from "react";

function BoxDescriptor({ title, description, key, className, children }) {
    return (
        <div className={className} key={key}>
            <Text type="h3">{title}</Text>
            <Text type="p" className={"mb-2"}>
                {description}
            </Text>
            <div>{children}</div>
        </div>
    );
}

function Box({ children, key, className }) {
    return <div key={key} className={`flex flex-row items-center justify-between rounded-lg border border-primary w-full p-4 ${className || ""}`}>{children}</div>;
}

function TDBox({ title, description, children, key, className }) {
    return (
        <Box className={className} key={key}>
            <BoxDescriptor title={title} description={description} />
            {children}
        </Box>
    );
}

function LinkBox({ title, description, to, children, key, className }) {
    return (
        <Link to={to} key={key}>
            <TDBox title={title} description={description} className={className}>
                {children}
            </TDBox>
        </Link>
    );
}

function VisitableBox({ title, description, to, key, className }) {
    return (
        <LinkBox key={key} title={title} description={description} to={to} className={className}>
            <Button arrow fill>
                ansehen
            </Button>
        </LinkBox>
    );
}

export { BoxDescriptor, Box, TDBox, LinkBox, VisitableBox };
