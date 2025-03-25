import React from "react";
import PropTypes from "prop-types";

function ProgressBar({ progress, total, className }) {
    const progressLineLengthCalc = "100% - 5 * var(--spacing)";

    return (
        <div className={"flex items-center justify-center relative w-full"}>
            <div className="h-1 absolute left-2.5 bg-gray-500" style={{ width: `calc(${progressLineLengthCalc}` }}></div>
            <div className={`h-1.5 absolute left-2.5 z-10 ${className}`} style={{ width: `calc((${progressLineLengthCalc}) * ${(progress - 1) / (total - 1)})` }}></div>

            <div className="relative flex gap-8 justify-between items-center w-full">
                {Array.from({ length: total }, (_, i) => (
                    <div key={i} className={`rounded-full z-10 w-5 h-5 ${progress > i ? className : "bg-gray-500"}`}></div>
                ))}
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    className: PropTypes.string,
}

export default ProgressBar;
