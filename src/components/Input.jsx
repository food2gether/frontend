import React from "react";

function Input({ type, placeholder, defaultValue, onChange, valid = true, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border py-[5px] px-[10px] rounded-xl text-black text-[20px] ${valid ? "border-primary" : "border-red-500"} ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}

export default Input;