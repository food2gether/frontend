import PropTypes from "prop-types";

const styles = {
    h0: "text-[50px] md:text-[80px] font-bold",
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
    h4: "text-lg font-bold",
    h5: "text-base font-bold",
    base: "text-base",
};

function Text({ children, type, bold, center, light, className }) {
    const textClass = `
    ${bold ? "font-bold" : ""}
    ${center ? "text-center" : "text-left"}
    ${light ? "text-white" : "text-black"}
    ${styles[type]}`;

    return <p className={`${textClass} ${className}`}>{children}</p>;
}

Text.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["h0", "h1", "h2", "h3", "h4", "h5", "base"]),
    bold: PropTypes.bool,
    center: PropTypes.bool,
    light: PropTypes.bool,
    className: PropTypes.string,
}

export default Text;
