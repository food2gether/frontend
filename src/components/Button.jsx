import React, { cloneElement } from "react";

// Icons
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Button({
    children,
    className,
    childrenClassess,
    onClick,
    type,
    link,
    tabIndex,
    round,
    slide,
    disabled,
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
    btn group inline-flex items-center gap-2 transition-all duration-200
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
    ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
    ${className}
  `;

    const childrenClasses = `${childrenClassess} transition-transform duration-200
    ${!slide ? "group-hover:-translate-y-1" : ""}
  `;

    return link ? (
        <Link to={link} className={buttonClasses} tabIndex={tabIndex}>
            <span className={childrenClasses}>{children}</span>
            {renderArrow()}
        </Link>
    ) : (
        <button className={buttonClasses} onClick={disabled ? undefined : onClick} onKeyDown={disabled ? undefined : onClick} tabIndex={tabIndex}>
            <span className={childrenClasses}>{children}</span>
            {renderArrow()}
        </button>
    );
}

export default Button;
