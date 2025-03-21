import Text from "./Text.jsx";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import React from "react";

function BoxDescriptor({ title, description, className, children }) {
    return (
        <div className={className}>
            <Text type="h3">{title}</Text>
            <Text type="p" className={"mb-2"}>
                {description}
            </Text>
            <div>{children}</div>
        </div>
    );
}

function Box({ children, className }) {
    return (
        <div className={`flex flex-row items-center justify-between rounded-lg border border-primary w-full p-4 ${className || ""}`}>
            {children}
        </div>
    );
}

function TDBox({ title, description, children, className }) {
    return (
        <Box className={className}>
            <BoxDescriptor title={title} description={description} />
            {children}
        </Box>
    );
}

function LinkBox({ title, description, to, children, className }) {
    return (
        <Link to={to}>
            <TDBox title={title} description={description} className={className}>
                {children}
            </TDBox>
        </Link>
    );
}

function VisitableBox({ title, description, to, className }) {
    return (
        <LinkBox title={title} description={description} to={to} className={className}>
            <Button arrow fill>
                ansehen
            </Button>
        </LinkBox>
    );
}

export { BoxDescriptor, Box, TDBox, LinkBox, VisitableBox };
