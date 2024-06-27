"use client";
import Layout from "@/components/Layout";
import OrderModal from "@/components/OrderModal";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'delivered'
  const [refreshTab, setRefreshTab] = useState(false);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, [refreshTab]);

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const newOrders = sortedOrders.filter((order) => !order.orderClosed);
  const deliveredOrders = sortedOrders.filter((order) => order.orderClosed);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 ${
              activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Orders
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "delivered"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("delivered")}
          >
            Delivered Orders
            <span className="ml-2 bg-red-400 text-white rounded-full px-2">
              {deliveredOrders.length}
            </span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <OrderModal
            isOpen={modalOpen}
            closeModal={closeModal}
            order={selectedOrder}
            setRefreshTab={setRefreshTab}
          />
          <table className="min-w-full bg-white border-gray-200 border rounded-lg shadow-md">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sno
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(activeTab === "new" ? newOrders : deliveredOrders).map(
                (order, index) => (
                  <tr
                    key={order._id}
                    onClick={() => openModal(order)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-pre-wrap">
                      {order.products.map((product, index) => (
                        <p key={index} className="text-sm">
                          {`${product.title} (${product.size})`}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.products.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {JSON.parse(order.address).addressLine1},{" "}
                      {JSON.parse(order.address).addressLine2},{" "}
                      {JSON.parse(order.address).city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
