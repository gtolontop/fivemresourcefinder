import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const handleLogin = () => {
    console.log('Redirecting to Discord OAuth...');
    window.location.href = '/api/auth/discord';
  };

  return (
    <div className="login-page">
      <NavBar />
      <section className="login-section">
        <h2>Login</h2>
        <button onClick={handleLogin}>Login with Discord</button>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
