import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import OrderHistory from "../../components/OrderHistory";

const OrderHistoryPage = () => {
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
      <OrderHistory/>
  );
};

export { OrderHistoryPage };
