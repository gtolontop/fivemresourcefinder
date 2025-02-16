import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Admin: React.FC = () => {
  return (
    <div className="admin-page">
      <NavBar />
      <section className="admin-section">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin! This page is secured.</p>
      </section>
      <Footer />
    </div>
  );
};

export default Admin;
