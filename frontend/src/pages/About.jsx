import React from "react";
import "../Styles/StylesAbout.css";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About | My Website</title>
        <meta name="description" content="This is the about page of the website." />
      </Helmet>

      <section className="about-section">
        <div className="about-block">
          <h1 className="about-title">About Us</h1>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula mauris non orci congue, in tincidunt mi tincidunt.
          </p>
        </div>

        <div className="about-block">
          <h2 className="about-title">Our Mission</h2>
          <p className="about-text">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="about-text">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <img src="https://via.placeholder.com/400x250" alt="Mission" className="about-image" />
        </div>

        <div className="about-block">
          <h2 className="about-title">Crafted with Passion</h2>
          <p className="about-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="about-text">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <img src="https://via.placeholder.com/400x250" alt="Crafted" className="about-image" />
        </div>

        <div className="about-block">
          <h2 className="about-title">Our Team</h2>
          <p className="about-text">
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          </p>
          <img src="https://via.placeholder.com/400x250" alt="Team" className="about-image" />
        </div>

        <div className="about-block">
          <h2 className="about-title">Join Us</h2>
          <p className="about-text">
            Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
          </p>
          <p className="about-text">
            Vivamus suscipit tortor eget felis porttitor volutpat.
          </p>
          <img src="https://via.placeholder.com/400x250" alt="Join Us" className="about-image" />
        </div>
      </section>
    </div>
  );
};

export default About;
