import { FaDesktop, FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import Text from "./Text.jsx";
import PropTypes from "prop-types";

function Credits({ title, credits }) {
    return (
        <div>
            <Text type="h2" light className="w-full text-center">
                {title}
            </Text>
            <div className="text-2xl flex flex-row justify-center gap-8 m-2">
                {credits.map((credit) => (
                    <a href={credit.link} key={credit.link} target="_blank" className="text-white hover:text-primary-dark transition-colors duration-200">
                        {credit.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}

Credits.propTypes = {
    title: PropTypes.string.isRequired,
    credits: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
}

function Footer() {
    return (
        <footer className="w-full mx-auto border-t-6 border-primary-dark flex flex-row justify-center gap-16 py-5 px-16 bg-primary">
            <Credits
                title="Food2Gether"
                credits={[
                    {
                        link: "https://github.com/food2gether",
                        icon: <FaGithub />,
                    },
                    {
                        link: "https://discord.gg/food2gether",
                        icon: <FaDiscord />,
                    },
                ]}
            />
            <Credits
                title="Soptim AG"
                credits={[
                    {
                        link: "https://soptim.de/",
                        icon: <FaDesktop />,
                    },
                    {
                        link: "https://www.linkedin.com/company/soptim-ag/",
                        icon: <FaLinkedin />,
                    },
                ]}
            />
        </footer>
    );
}

export default Footer;
