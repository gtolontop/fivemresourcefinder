import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Store: React.FC = () => {
  return (
    <div className="store-page">
      <NavBar />
      <section className="store-section">
        <h2>Store</h2>
        <div className="store-cards">
          <div className="store-card">
            <img src="https://via.placeholder.com/200" alt="Item 1" />
            <h3>Item 1</h3>
            <p>Price: $9.99</p>
            <button>Buy Now</button>
          </div>
          <div className="store-card">
            <img src="https://via.placeholder.com/200" alt="Item 2" />
            <h3>Item 2</h3>
            <p>Price: $19.99</p>
            <button>Buy Now</button>
          </div>
          {/* Ajouter d'autres cartes si besoin */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Store;
