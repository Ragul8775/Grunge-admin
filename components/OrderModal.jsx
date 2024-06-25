// OrderModal.js

import React from "react";

const OrderModal = ({ isOpen, closeModal, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-4xl mx-auto my-6">
        {/* Modal content */}
        <div className="bg-white border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-lg font-semibold">{`Order Details - ${order.orderId}`}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black  float-right outline-none focus:outline-none"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            {/* Display order details */}
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Order ID:</p>
              <p className="text-sm">{order.orderId}</p>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Name:</p>
              <p className="text-sm">{order.name}</p>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Email:</p>
              <p className="text-sm">{order.email}</p>
            </div>
            <div className="mb-4 flex items-center gap-2 ">
              <p className="text-sm font-semibold">Amount:</p>
              <p className="text-sm">₹{order.amount}</p>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Products:</p>
              <ul className="list-disc list-inside">
                {order.products.map((product) => (
                  <li className="text-sm" key={product.id}>
                    {`${product.title} (${product.size}) - ${product.price}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 flex items-start gap-2">
              <p className="text-sm font-semibold">Address:</p>
              <div className="text-sm">
                <p>{JSON.parse(order.address).addressLine1}, </p>
                <p>{JSON.parse(order.address).addressLine2}, </p>
                <p>{JSON.parse(order.address).city}, </p>
                <p>
                  {JSON.parse(order.address).state} -
                  {JSON.parse(order.address).pinCode}{" "}
                </p>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Created At:</p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-semibold">Razorpay Payment ID:</p>
              <p className="text-sm">{order.razorpay_payment_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
