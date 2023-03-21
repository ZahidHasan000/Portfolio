import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsYoutube, BsLinkedin, BsFacebook, BsTwitter } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <Typography variant="h5">About Me</Typography>
                <Typography>
                    Hey, my name is Zahid Hasan. I am a MERN Stack Developer and a
                    tutorial on Youtube channel called <b>Mern stack</b>
                </Typography>

                <Link to="/contact" className="footerContactBtn">
                    <Typography>Contact Us</Typography>
                </Link>
            </div>
            <div>
                <Typography variant="h6">Social Media</Typography>
                <a href="https://github.com/ZahidHasan000" target="black">
                    <BsGithub />
                </a>
                <a href="https://youtube.com/6packprogrammer/" target="black">
                    <BsYoutube />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100006849996705" target="black">
                    <BsFacebook />
                </a>
                <a href="https://www.linkedin.com/in/zahid-hasan-6ba380117/" target="black">
                    <BsLinkedin />
                </a>
                <a href="https://twitter.com/ZahidHa61236380" target="black">
                    <BsTwitter />
                </a>
            </div>
        </div>
    );
};

export default Footer;