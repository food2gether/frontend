import { useNavigate } from "react-router-dom";
import { cloneElement, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import PropTypes, { object } from "prop-types";

function Button({
    children,
    linkTo,
    linkOptions,
    onClick,
    checkDisabled,
    className,
    arrow,
    tabIndex,
    fill,
    border,
}) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(checkDisabled && checkDisabled())
    }, [checkDisabled]);

    if (fill === true) {
        fill = "primary";
        className += " text-white";
    }

    if (border === true) {
        border = "primary";
    }

    if (arrow === true) {
        arrow = <FaArrowRight />;
    }

    const handleClick = () => {
        const disabled = checkDisabled && checkDisabled();
        setDisabled(disabled);

        if (!disabled) {
            onClick && onClick();
            linkTo && navigate(linkTo, linkOptions);
        }
    };

    return (
        <button
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={tabIndex}
            className={
                "px-2.5 py-1.5 cursor pointer text-sm group inline-flex items-center gap-2 transition-all duration-200 rounded-xl " +
                (fill ? `bg-${fill} ${arrow ? "" : "hover:bg-opacity-80 text-white "} ` : "text-black ") +
                (border ? `border-2 border-${border} border-opacity-100 hover:border-opacity-80 ` : "") +
                (disabled ? "pointer-events-none cursor-not-allowed opacity-50 " : "") +
                (arrow ? "" : "group-hover:-translate-y-1 ") +
                className
            }
        >
            <span className={"group-hover:-translate-y-1 transition-all duration-200"}>
                {children}
            </span>
            {arrow
                ? cloneElement(arrow, {
                      ...arrow.props,
                      className: `${arrow.props.className || ""} h-5 w-5 transition-transform duration-200 group-hover:translate-x-1`,
                  })
                : null}
        </button>
    );
}

Button.prototype = {
    children: PropTypes.node,
    linkTo: PropTypes.string,
    linkOptions: PropTypes.object,
    onClick: PropTypes.func,
    checkDisabled: PropTypes.func,
    className: PropTypes.string,
    arrow: PropTypes.node,
    tabIndex: PropTypes.number,
    fill: PropTypes.string,
    border: PropTypes.string,
}

export default Button;
