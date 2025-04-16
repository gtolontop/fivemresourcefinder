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

  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const options = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    faders.forEach((fader) => observer.observe(fader));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <NavBar />
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
              onClick={() =>
                window.open("https://discord.gg/HYzjdBcNGT", "_blank")
              }
            >
              Join Our Discord
            </button>
            <button>Show More</button>
          </div>
        </div>
        <div className="background"></div>
      </section>
      {/* Creator Spotlight Section */}
      <div className="container">
          <div className="spotlightcreator-header">
            <h2 className="spotlightcreator-title">Spotlight of Resources</h2>
            <p className="spotlightcreator-description">
              Showcase your resource to a broader audience! This space is
              dedicated to highlighting your work right on our website's front
              page.
            </p>
          </div>
        </div>
      <SpotlightCarousel />

      {/* Resource Spotlight Section */}
      <section className="resource-spotlight-section">
        <div className="container">
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
      <ReviewCard />

      {/* FAQ Section */}
      <section className="faq-section fade-in">
        <h2>FAQ</h2>
        <div className="faq-container">
          <FAQItem
            question="What is FiveM ResourceFinder?"
            answer="It is a platform to find FiveM resources."
          />
          <FAQItem
            question="How do I add my resource?"
            answer="Please contact us via Discord."
          />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by-section fade-in">
        <h2>Trusted By</h2>
        <div className="partner-logos">
          <PartnerLogo
            logoUrl="https://s3-alpha-sig.figma.com/img/5d5a/8edb/035ce8de1f6364000dbbcf9bfe6117b7?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iUKyqZteJsofxrICZOzOi-wwL3VjyCubmf0Hhi5DzxdcmDPceBmXGj4kDwcwK--YXH0NS~DsfQ0EvuSHT0kQm~YE1uOsF30~KyFAhO0YhsN16TnHGsHAaXcRkNFlp2qIQKz~ptzU6p0GGvowfJwtjZ5LwlWUO6M5Ya3nBKz~MKvxczED8wmg-dRrwVy5qgO43xaFAxqQ-gLAOl2Rdbne4syQEwb4qTaxI4MbVJSWHb7scN2HXcy-ivZ2djo-PbIq9NSvYHQJ5zng7cbNidwJDekiYDjMaZZr~BzGGxjwz-lQFRx-NG7vOKnD2Cpj37HvJMj4uoLqHDym5UGjvgT1UQ__"
            altText="Partner 1"
          />
          <PartnerLogo
            logoUrl="https://s3-alpha-sig.figma.com/img/b4cc/2504/574f425b832cc85294b94d23cb94d546?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ntf6~g5QRyUwXQ8hb7yxkRyOfdiZ4Xtb0c4v8a8LmJd7dXYtObhU0RyAMiQ6pz7zklZf4xcI~~L2Ppw~EgyiOL9CZfk1kWL9rmqfZZAABpvmAzlV-V7q3t3T7a5Q307xyWugT6nlaMQ1DSYC2U6iFBMtXVLt9UB6O8peO3X1FMRXAUK2-Uu6CUv0zbgUFSRPVBvC2v81FNJc9Ea~1yifM15zmbylM6iKaREZiiL1Kqhqf8Fw4f27mshNhJZusFCdunn37WXd-T1MdUAT5O2UP81P6U0a1vJ~7Aqhi33lLSOK2u8Qn0FMIGxjFaMXOdEH5qZ6v1VD2Ffr6hDUKAQmyw__"
            altText="Partner 2"
          />
          <PartnerLogo
            logoUrl="https://s3-alpha-sig.figma.com/img/32ed/7a49/e57f13f0f28f7de6b3ea1f385de15699?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Vjtfl3TD~ZJ43KANMe3JBOsLQI4giyKo3JtFJbkyDLKbh8QG-jhUiSbG5fwzINeX1KnfZPO8H1vbiypK5x1N2E4I7KtHqOq0NX9XYucQ6HEXIO89S7Yz5OknAkDDrfscFajGfEI38Sk66mew7PUGWV~GEcMABZmXagrmJYlgCcFQQSoD2KgJss~qJv0sw6F~MXmZ-wUPgBAHifmNNxKBYIThsq~bmNc9yR1MfVc7QBMZaOTY0aDViC30DrkeqCruOj1Nrtx3eqsyLQv7hKDPSbnRcK5~3WRDxZFk9z1Vpj~qbPYOQC8~eehmEyJYO3BOC6NIisDQhUuYhc-YhIiUDw__"
            altText="Partner 3"
          />
          <PartnerLogo
            logoUrl="https://s3-alpha-sig.figma.com/img/7047/df3e/20f967244c821f2576967816d5377d48?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QSiylDgS5u9RuqnRmWNoRB0v9rtkFRNkIf7Za25w9K8x-HAGaOQ5Wc1VwbvfStgYu4mXeu69Uq70izyNWfXD2KlPOM4TAyxoiUKIRlZKI3W7yyr4YH4Yq9sNI2Q3ccd8WTxQcvN7dKOOel1mBSG7K~oAIhB6ShdaD3ICw6NSYlkvCr3KRDusNMf3ybIahDmk84KGR~1G49kNWsBMgS6oRbvh-9K~aoOf45sOCnmxI61TH8plF74L80ZKBk2A4v7-bIMNwswXIYtTf1fTQzK2QE~zwsLnunbtzMhtvyBXGxksB9hBI914gMxrXsFyJDGwz4CDMojdnv~BLvkTPnNvcQ__"
            altText="Partner 4"
          />
                    <PartnerLogo
            logoUrl="https://s3-alpha-sig.figma.com/img/5d5a/8edb/035ce8de1f6364000dbbcf9bfe6117b7?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iUKyqZteJsofxrICZOzOi-wwL3VjyCubmf0Hhi5DzxdcmDPceBmXGj4kDwcwK--YXH0NS~DsfQ0EvuSHT0kQm~YE1uOsF30~KyFAhO0YhsN16TnHGsHAaXcRkNFlp2qIQKz~ptzU6p0GGvowfJwtjZ5LwlWUO6M5Ya3nBKz~MKvxczED8wmg-dRrwVy5qgO43xaFAxqQ-gLAOl2Rdbne4syQEwb4qTaxI4MbVJSWHb7scN2HXcy-ivZ2djo-PbIq9NSvYHQJ5zng7cbNidwJDekiYDjMaZZr~BzGGxjwz-lQFRx-NG7vOKnD2Cpj37HvJMj4uoLqHDym5UGjvgT1UQ__"
            altText="Partner 4"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
