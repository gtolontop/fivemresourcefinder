import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <NavBar />
      <section className="about-section">
        <h2>About FiveM ResourceFinder</h2>
        <p>
          This is a platform dedicated to providing the best resources for your FiveM server.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default About;
