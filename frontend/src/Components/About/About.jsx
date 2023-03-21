import { Typography } from "@mui/material";
import React from "react";
import "./About.css";

// const About = ({ about }) => {
const About = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        {/* <Typography>{about.quote}</Typography> */}
        <Typography>This is a simple quote</Typography>
      </div>
      <div className="aboutContainer2">
        <div>
          {/* <img src={about.avatar.url} alt="Zahid" className="aboutAvatar" /> */}
          <img src='https://scontent.fdac24-1.fna.fbcdn.net/v/t31.18172-8/19055442_1893588784212770_1123629914367866026_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=s1RYRPGr2f0AX9VIclY&_nc_ht=scontent.fdac24-1.fna&oh=00_AfAPP3m0QzPBumc_e7ibIn4vbTpPifqH9i8xGbVvGhG7XA&oe=642AA49B' alt="Zahid" className="aboutAvatar" />

          <Typography variant="h4"
            style={{ margin: "1vmax 0", color: "black" }}
          >
            {/* {about.name} */}
            Zahid Hasan
          </Typography>

          {/* <Typography>{about.title}</Typography> */}
          <Typography>MERN Stack Developer</Typography>

          {/* <Typography style={{ margin: "1vmax 0", textAlign: "center" }}>
            {about.subtitle}
          </Typography> */}
          <Typography style={{ margin: "1vmax 0", textAlign: "center" }}>
            I am a developer
          </Typography>
        </div>

        <div>
          <Typography
            style={{
              wordSpacing: "5px",
              lineHeight: "50px",
              letterSpacing: "5px",
              textAlign: "right",
            }}
          >
            This is description Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Sapiente adipisci iusto deleniti veniam quaerat doloremque, incidunt blanditiis rem natus,
            cupiditate dicta harum rerum exercitationem placeat.
          </Typography>
          {/* <Typography
            style={{
              wordSpacing: "5px",
              lineHeight: "50px",
              letterSpacing: "5px",
              textAlign: "right",
            }}
          >
            {about.description}
          </Typography> */}
        </div>
      </div>
    </div>
  );
};

export default About;
