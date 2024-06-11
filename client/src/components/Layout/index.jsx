import Navbar from "../Navbar/Navbar";
import ProductsCart from "../ProductsCart/ProductsCart";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="items-center bg-white dark:bg-gray-900 dark:text-white duration-200">
        {children}
      </div>
      <ProductsCart />
    </>
  );
};

export { Layout };
