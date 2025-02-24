import React, { cloneElement } from "react";

// Icons
import { FaArrowRight } from "react-icons/fa6";

function Button({
    children,
    clazzName,
    childrenClassess,
    onClick,
    type,
    link,
    externalLink,
    round,
    slide,
    noAnimation,
    arrow = <FaArrowRight />,
}) {
    const renderArrow = () => {
        if (!arrow) return null;

        return cloneElement(arrow, {
            className: `${arrow.props.className || ""} h-5 w-5 transition-transform duration-200 ${
                slide ? "group-hover:translate-x-1" : "group-hover:-translate-y-1"
            }`.trim(),
        });
    };

    const buttonClasses = `
    btn group inline-flex items-center gap-2 transition-all duration-200 mb-2
    ${round ? "rounded-full" : "rounded-[12px]"}
    ${
        type === "primary"
            ? "bg-primary text-white border-2 border-white-lighter hover:border-white-light"
            : type === "secondary"
              ? "bg-secondary text-white"
              : type === "tertiary"
                ? "bg-white text-primary border-2 border-white"
                : "bg-primary text-white"
    }
    ${clazzName}
  `;

    const childrenClasses = `${childrenClassess} transition-transform duration-200
    ${!slide ? "group-hover:-translate-y-1" : ""}
  `;

    return link ? (
        <a href={link} className={buttonClasses}>
            <span className={childrenClasses}>{children}</span>
            {renderArrow()}
        </a>
    ) : externalLink ? (
        <a href={externalLink} className={buttonClasses} target="_blank" rel="noopener noreferrer">
            <span className={childrenClasses}>{children}</span>
            {renderArrow()}
        </a>
    ) : (
        <button className={buttonClasses} onClick={onClick}>
            <span className={childrenClasses}>{children}</span>
            {renderArrow()}
        </button>
    );
}

export default Button;
