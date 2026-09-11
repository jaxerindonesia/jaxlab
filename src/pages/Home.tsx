import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MarqueeStats from "../components/MarqueeStats";
import ProductSection from "../components/ProductSection";
import PartnerSection from "../components/PartnerSection";
import Testimonials from "../components/Testimonials";
import MediaSection from "../components/MediaSection";
import Footer from "../components/Footer";
import BundlingSection from "../components/BundlingSection";
import ScrollReveal from "../components/ScrollReveal";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <ScrollReveal>
        <MarqueeStats />
      </ScrollReveal>
      <ProductSection />
      <PartnerSection />
      <ScrollReveal>
        <BundlingSection />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <MediaSection />
      </ScrollReveal>
      <Footer />
    </>
  );
};

export default Home;
