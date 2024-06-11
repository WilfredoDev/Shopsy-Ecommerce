import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import Subscribe from "../../components/Subscribe/Subscribe";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Hero />
      <Products />
      <Banner />
      <Subscribe />
      <Footer />
    </>
  );
};

export { Home };
