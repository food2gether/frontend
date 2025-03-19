import React from "react";

function Input({ type, placeholder, defaultValue, onChange, valid = true, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border-b-2 rounded-t-lg py-[5px] px-[10px] outline-none text-black text-[20px] focus:bg-opacity-5 focus:bg-black transition ${valid ? "border-black focus:border-primary" : "border-red-500"} ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}

export default Input;