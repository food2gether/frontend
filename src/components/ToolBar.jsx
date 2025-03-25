import Button from "./Button.jsx";
import { Children } from "react";
import PropTypes from "prop-types";

function ToggleFilter({ filterActive, setFilterActive, children }) {
    return (
        <Button fill={filterActive} border onClick={() => setFilterActive(!filterActive)} className={filterActive ? "text-white" : "text-black"}>
            {children}
        </Button>
    )
}

ToggleFilter.propTypes = {
    filterActive: PropTypes.bool.isRequired,
    setFilterActive: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function ToolBar({ className, children }) {
    return <div className={`flex ${Children.toArray(children).length === 1 ? "justify-end" : "justify-between"} items-center mb-6 ${className || ""}`}>{children}</div>;
}

ToolBar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default ToolBar;

export { ToggleFilter };