import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ResourceCard, { Resource } from '../components/ResourceCard';
import ReviewCard from '../components/ReviewCard';
import FAQItem from '../components/FAQItem';
import Carousel from '../components/Carousel';
import PartnerLogo from '../components/PartnerLogo';
import heroBg from "../assets/hero-bg.png";

const Home: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error(err));

    const interval = setInterval(() => {
      fetch('/api/resources')
        .then(res => res.json())
        .then(data => setResources(data))
        .catch(err => console.error(err));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const creatorSpotlightItems = [
    <div className="creator-spotlight-item" key="1">
      <div className="spotlight-content">
        <img src="https://via.placeholder.com/300x200" alt="Creator 1" className="spotlight-image" />
      </div>
      <div className="spotlight-text">
        <h3>Creator 1</h3>
        <p>Description for Creator 1</p>
        <button onClick={() => console.log('Buy Me clicked for Creator 1')}>Buy Me</button>
      </div>
    </div>,
    <div className="creator-spotlight-item" key="2">
      <div className="spotlight-text">
        <h3>Creator 2</h3>
        <p>Description for Creator 2</p>
        <button onClick={() => console.log('Buy Me clicked for Creator 2')}>Buy Me</button>
      </div>
      <div className="spotlight-content">
        <img src="https://via.placeholder.com/300x200" alt="Creator 2" className="spotlight-image" />
      </div>
    </div>
  ];

  return (
    <div className="home-page">
      <NavBar />
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-content">
          <h1>FiveM ResourceFinder</h1>
          <p>ResourceFinder is a community dedicated to helping you find the best FiveM resources for your server. We don't create the resources ourselves, but we provide a platform to keep track of all the available resources out there—from free scripts to premium options, custom HUDs, maps, and more.</p>
          <div className="hero-buttons">
            <button onClick={() => window.open('https://discord.gg/', '_blank')}>Join Our Discord</button>
            <button>Show More</button>
          </div>
        </div>
      </section>

      {/* Creator Spotlight Section */}
      <section className="creator-spotlight-section">
        <h2>Creator Spotlight</h2>
        <p>Description blabla</p>
        <Carousel items={creatorSpotlightItems} />
      </section>

      {/* Resource Spotlight Section */}
      <section className="resource-spotlight-section">
        <h2>Resource Spotlight</h2>
        <p>Description blabla</p>
        <div className="resource-grid">
          {resources.slice(0, 6).map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
        <button className="view-all-button" onClick={() => window.location.href='/resources'}>View All</button>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Users Say</h2>
        <p>Description blabla</p>
        <div className="reviews-container">
          <div className="reviews-box">
            <ReviewCard
              image="https://via.placeholder.com/100"
              name="User 1"
              handle="@user1"
              rating={5}
              review="Great service!"
            />
            <ReviewCard
              image="https://via.placeholder.com/100"
              name="User 2"
              handle="@user2"
              rating={4}
              review="Good experience."
            />
          </div>
          <div className="trustpilot-section">
            {/* Intégration Trustpilot (exemple) */}
            <iframe
              title="Trustpilot"
              src="https://www.trustpilot.com"
              style={{ width: '100%', height: '300px', border: 'none' }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>FAQ</h2>
        <FAQItem question="What is FiveM ResourceFinder?" answer="It is a platform to find FiveM resources." />
        <FAQItem question="How do I add my resource?" answer="Please contact us via Discord." />
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by-section">
        <h2>Trusted By</h2>
        <div className="partner-logos">
          <PartnerLogo logoUrl="https://via.placeholder.com/150" altText="Partner 1" />
          <PartnerLogo logoUrl="https://via.placeholder.com/150" altText="Partner 2" />
          <PartnerLogo logoUrl="https://via.placeholder.com/150" altText="Partner 3" />
          <PartnerLogo logoUrl="https://via.placeholder.com/150" altText="Partner 4" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
