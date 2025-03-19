import React from "react";

function Input({ type, placeholder, defaultValue, onChange, valid = true, inline, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border-b-2 rounded-t-lg outline-none ${inline ? "text-inherit" : "text-black text-sm py-1 px-2"}  focus:bg-opacity-5 focus:bg-black transition ${valid ? "border-black focus:border-primary" : "border-red-500"} ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}

export default Input;