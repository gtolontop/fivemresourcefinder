import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top : titre + bouton Discord */}
        <div className="footer-top">
          <h2>Lets Connect there</h2>
          <a
            href="#"
            className="footer-discord-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord&nbsp;
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12h10M13 6l6 6-6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Séparateur */}
        <div className="footer-divider" />

        {/* Corps : logo + texte + socials  |  Navigation */}
        <div className="footer-main">
          <div className="footer-brand">
            {/* Remplace "#" par le lien de ton logo si besoin */}
            <img src="#" alt="Logo" className="footer-logo" />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              congue interdum ligula a dignissim. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed lobortis orci elementum egestas
              lobortis.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="YouTube">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15l5-3-5-3v6z" />
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="4"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                </svg>
              </a>
            </div>
          </div>

          <nav className="footer-navigation">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </nav>
        </div>

        {/* Séparateur */}
        <div className="footer-divider" />

        {/* Bas du footer */}
        <div className="footer-bottom">
          <p>© {year} FiveM ResourceFinder. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">User Terms &amp; Conditions</a>
            <span>|</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
