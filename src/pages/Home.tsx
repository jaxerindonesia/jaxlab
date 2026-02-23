import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import PartnerSection from '../components/PartnerSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <Hero />
            <ProductSection />
            <PartnerSection />
            <Testimonials />
            <Footer />
        </>
    );
};

export default Home;
