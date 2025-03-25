import React from "react";
import PropTypes from "prop-types";

function Input({ type, inputRef, placeholder, defaultValue, onChange, onBlur, valid = true, inline, className }) {
    return (
        <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={`border-b-2 rounded-t-lg outline-hidden ${inline ? "text-inherit" : "text-black text-sm py-1 px-2"} focus:bg-black/05 transition ${valid ? "border-black focus:border-primary" : "border-red-500"} ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    valid: PropTypes.bool,
    inline: PropTypes.bool,
    className: PropTypes.string
};

export default Input;
