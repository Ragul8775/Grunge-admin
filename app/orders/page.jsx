"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log("Orders:", products);
  return (
    <Layout>
      <div>Order </div>
    </Layout>
  );
};

export default Orders;
