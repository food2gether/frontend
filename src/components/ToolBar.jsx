import Button from "./Button.jsx";
import { Children } from "react";

function ToggleFilter({ filterActive, setFilterActive, children }) {
    return (
        <Button fill={filterActive} border onClick={() => setFilterActive(!filterActive)} className={filterActive ? "text-white" : "text-black"}>
            {children}
        </Button>
    )
}

function ToolBar({ className, children }) {
    return <div className={`flex ${Children.toArray(children).length === 1 ? "justify-end" : "justify-between"} items-center mb-6 ${className || ""}`}>{children}</div>;
}

export default ToolBar;

export { ToggleFilter };