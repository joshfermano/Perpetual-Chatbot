import React from 'react';
import Navbar from '../components/Navbar';
import Homepage from '../pages/Homepage';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Homepage />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
