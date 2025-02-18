import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ResourceCard, { Resource } from "../components/ResourceCard";
import ReviewCard from "../components/ReviewCard";
import FAQItem from "../components/FAQItem";
import PartnerLogo from "../components/PartnerLogo";
import heroBg from "../assets/hero-bg.png";
import SpotlightCarousel from "../components/SpotlightCarousel";

const Home: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error(err));

    const interval = setInterval(() => {
      fetch("/api/resources")
        .then((res) => res.json())
        .then((data) => setResources(data))
        .catch((err) => console.error(err));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="hero-content">
          <h1>FiveM ResourceFinder</h1>
          <p>
            ResourceFinder is a community dedicated to helping you find the best
            FiveM resources for your server. We don't create the resources
            ourselves, but we provide a platform to keep track of all the
            available resources out there—from free scripts to premium options,
            custom HUDs, maps, and more.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => window.open("https://discord.gg/", "_blank")}
            >
              Join Our Discord
            </button>
            <button>Show More</button>
          </div>
        </div>
      </section>

      {/* Creator Spotlight Section */}
      <SpotlightCarousel />

      {/* Resource Spotlight Section */}
      <section className="resource-spotlight-section">
  <div className="container">
    {/* Titre principal et description */}
    <div className="spotlight-header">
      <h2 className="spotlight-title">Spotlight of Resources</h2>
      <p className="spotlight-description">
        Showcase your resource to a broader audience! This space is
        dedicated to highlighting your work right on our website's front
        page.
      </p>
    </div>
  </div>

  <div className="resource-grid">
    {resources.slice(0, 6).map((resource, index) => (
      <ResourceCard key={index} resource={resource} />
    ))}
  </div>

  <div className="view-all-container">
    <button
      className="view-all-button"
      onClick={() => (window.location.href = "/resources")}
    >
      View All
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path d="M5 12.0811H19H5Z" fill="white" />
        <path
          d="M5 12.0811H19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 18.0811L19 12.0811L13 18.0811Z" fill="white" />
        <path
          d="M13 18.0811L19 12.0811"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 6.08105L19 12.0811L13 6.08105Z" fill="white" />
        <path
          d="M13 6.08105L19 12.0811"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
</section>


      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Users Say</h2>
        <p>Here you can read some of our reviews from the community. Get insights into how we’ve been rated and what others think about us!
        </p>
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
              style={{ width: "100%", height: "300px", border: "none" }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>FAQ</h2>
        <FAQItem
          question="What is FiveM ResourceFinder?"
          answer="It is a platform to find FiveM resources."
        />
        <FAQItem
          question="How do I add my resource?"
          answer="Please contact us via Discord."
        />
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by-section">
        <h2>Trusted By</h2>
        <div className="partner-logos">
          <PartnerLogo
            logoUrl="https://via.placeholder.com/150"
            altText="Partner 1"
          />
          <PartnerLogo
            logoUrl="https://via.placeholder.com/150"
            altText="Partner 2"
          />
          <PartnerLogo
            logoUrl="https://via.placeholder.com/150"
            altText="Partner 3"
          />
          <PartnerLogo
            logoUrl="https://via.placeholder.com/150"
            altText="Partner 4"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
