import { Fragment, useContext } from "react";
import { Transition } from "@headlessui/react";
import { CartContext } from "../../context";
import {updateTotalPrice}  from '../../utils/totalprice';
import { NavLink } from "react-router-dom";

const ProductsCart = () => {
  const { shoppingCart, setShoppingCart, isCartOpen, setIsCartOpen, totalPrice, setTotalPrice } = useContext(CartContext);

  const incrementQuantity = (product) => {
    const newCart = [...shoppingCart];
    const index = newCart.findIndex((item) => item._id === product._id);
    newCart[index].quantity += 1;
    setShoppingCart(newCart);
    const total  = updateTotalPrice(newCart);
    setTotalPrice(total);
    console.log(newCart);
  };

  const decreaseQuantity = (product) => {
    const newCart = [...shoppingCart];
    const index = newCart.findIndex((item) => item._id === product._id);
    newCart[index].quantity -= 1;
    setShoppingCart(newCart);
    const total  = updateTotalPrice(newCart);
    setTotalPrice(total);
  };

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {shoppingCart.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`${import.meta.env.VITE_API_URL}/assets/${product.imageUrl}`}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{product.name}</a>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <form className="">
                                      <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Quantity:
                                      </label>
                                      <div className="relative flex items-center max-w-[8rem]">
                                        <button
                                          type="button"
                                          id="decrement-button"
                                          onClick={() => decreaseQuantity(product)}
                                          data-input-counter-decrement="quantity-input"
                                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                          <svg
                                            className="w-3 h-3 text-gray-900 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 2"
                                          >
                                            <path
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M1 1h16"
                                            />
                                          </svg>
                                        </button>
                                        <input
                                          type="text"
                                          id="quantity-input"
                                          data-input-counter
                                          aria-describedby="helper-text-explanation"
                                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          value={product.quantity}
                                          required
                                        />
                                        <button
                                          type="button"
                                          id="increment-button"
                                          onClick={() => incrementQuantity(product)}
                                          data-input-counter-increment="quantity-input"
                                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                          <svg
                                            className="w-3 h-3 text-gray-900 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                          >
                                            <path
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M9 1v16M1 9h16"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </form>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <NavLink
                          to="checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:scale-105 transition-all"
                        >
                          Checkout
                        </NavLink>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
};

export default ProductsCart;
