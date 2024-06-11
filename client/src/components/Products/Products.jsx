import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/";
import { updateTotalPrice } from "../../utils/totalprice";

const Products = () => {
  const { setShoppingCart, shoppingCart,products,setProducts, setTotalPrice } =
    useContext(CartContext);

  const fetchProducts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/products`
    );
    setProducts(response.data);
  };

  const addProductToCart = (product) => {
    const newProduct = { ...product, quantity: 1 };
    const existProduct = shoppingCart.find((item) => item._id === product._id);
    let newShoppingCart;
    if (existProduct) {
      newShoppingCart = shoppingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newShoppingCart = [...shoppingCart, newProduct];
    }
    setShoppingCart(newShoppingCart);
    const total = updateTotalPrice(newShoppingCart);
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center gap-5">
            {/* card section */}
            {products.map((product) => (
  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-auto h-full" key={product._id}>
    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-auto">
      <img
        src={`${import.meta.env.VITE_API_URL}/assets/${product.imageUrl}`}
        alt="card-image"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          {product.name}
        </p>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          ${product.price}
        </p>
      </div>
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
        {product.description}
      </p>
    </div>
    <div className="p-6 pt-0 mt-auto">
      <button
        onClick={() => addProductToCart(product)}
        className="bg-gradient-to-r from-primary to-secondary align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        type="button"
      >
        Add to Cart
      </button>
    </div>
  </div>
))}

          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
