import { useNavigate } from "react-router-dom";
import { cloneElement, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import PropTypes from "prop-types";

function Button({ children, linkTo, linkOptions, onClick, checkDisabled, className, arrow, fill, border }) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(checkDisabled?.());
    }, [checkDisabled]);

    if (border === true) {
        border = "primary";
    }

    if (arrow === true) {
        arrow = <FaArrowRight />;
    }

    const handleClick = () => {
        const disabled = checkDisabled?.();
        setDisabled(disabled);

        if (!disabled) {
            onClick?.();
            linkTo && navigate(linkTo, linkOptions);
        }
    };

    let classNames = "px-2.5 py-1.5 cursor-pointer text-sm group inline-flex items-center gap-2 transition-all duration-200 rounded-xl ";
    if (fill) {
        classNames += `bg-primary text-white ${arrow ? "" : `hover:bg-primary/80 `} `;
    } else {
        classNames += "text-black ";
    }

    if (disabled) {
        classNames += "pointer-events-none cursor-not-allowed opacity-50 ";
    }

    classNames += className;

    return (
        <button onClick={handleClick} onKeyDown={handleClick} className={classNames}>
            <span className={`${arrow ? "" : "group-hover:-translate-y-0.5"} transition-all duration-200`}>{children}</span>
            {arrow
                ? cloneElement(arrow, {
                      ...arrow.props,
                      className: `${arrow.props.className || ""} h-5 w-5 transition-transform duration-200 group-hover:translate-x-1`,
                  })
                : null}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    linkTo: PropTypes.string,
    linkOptions: PropTypes.object,
    onClick: PropTypes.func,
    checkDisabled: PropTypes.func,
    className: PropTypes.string,
    arrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    fill: PropTypes.bool,
    border: PropTypes.bool,
};

export default Button;
