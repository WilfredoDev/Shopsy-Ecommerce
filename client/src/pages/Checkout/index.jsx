import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Checkout from "../../components/Checkout";

const CheckoutPage = () => {
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
      <Checkout/>
  );
};

export { CheckoutPage };
