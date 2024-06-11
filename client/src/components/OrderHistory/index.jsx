import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context";

const orders = [
  {
    number: "WU88191111",
    date: "January 22, 2021",
    datetime: "2021-01-22",
    invoiceHref: "#",
    total: "$238.00",
    products: [
      {
        id: 1,
        name: "Machined Pen and Pencil Set",
        href: "#",
        price: "$70.00",
        status: "Delivered Jan 25, 2021",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg",
        imageAlt:
          "Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.",
      },
      // More products...
    ],
  },
  // More orders...
];
export default function OrderHistory() {
  const { userToken } = useContext(CartContext);
  const [myOrders, setMyOrders] = useState([]);

  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_API_URL}/api/v1/orders`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const fetchOrders = async () => {
    const response = await axios.request(options);
    setMyOrders(response.data);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="bg-white" data-aos="fade-up">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            {myOrders.map((order) => (
              <div key={order.number}>
                <h3 className="sr-only">
                  Order placed on{" "}
                  <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time>
                </h3>

                <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="sm:mt-1">
                        <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time>
                      </dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Order number
                      </dt>
                      <dd className="sm:mt-1">{1}</dd>
                    </div>
                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                      <dt>Total amount</dt>
                      <dd className="sm:mt-1">125$</dd>
                    </div>
                  </dl>
                  <a
                    href={order.invoiceHref}
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                  >
                    View Invoice
                    <span className="sr-only">for order {order.number}</span>
                  </a>
                </div>

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-center text-sm text-gray-500 sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t text-center">
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/assets/${product.data.imageUrl}`}
                              alt={product.data.name}
                              className="mr-6 h-auto w-16 rounded object-cover object-center"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.data.name}
                              </div>
                              <div className="mt-1 sm:hidden">
                                ${product.data.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          ${product.data.price}
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          In stock
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
