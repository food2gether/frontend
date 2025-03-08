import React from "react";

function Text({ children, type, bold, center, light, className }) {
    const textClass = `
    ${bold ? "font-bold" : ""}
    ${center ? "text-center" : "text-left"}
    ${light ? "text-white" : "text-black"}
    ${
        type === "h0"
            ? "text-[50px] md:text-[80px] font-bold"
            : type === "h1"
              ? "text-3xl font-bold"
              : type === "h2"
                ? "text-2xl font-bold"
                : type === "h3"
                  ? "text-xl font-bold"
                  : type === "h4"
                    ? "text-lg font-bold"
                    : type === "h5"
                      ? "text-base font-bold"
                      : "text-base"
    }
    
  `;
    return <p className={`${textClass}${className}`}>{children}</p>;
}

export default Text;
