// /pages/api/orders/[id].js

import { mongooseConnectUserPayments } from "@/lib/mongoose";
import { sendMail } from "@/lib/sendEmail";
import OrderPaymentDetails from "@/models/orderPayments";

export const PATCH = async (request, { params }) => {
  try {
    await mongooseConnectUserPayments();

    const { orderClosed, closeDate } = await request.json();

    const existingOrder = await OrderPaymentDetails.findById(params.id);
    if (!existingOrder) {
      return new Response("The order doesn't exist", { status: 404 });
    }

    existingOrder.orderClosed = orderClosed;
    existingOrder.deliveryDate = closeDate;
    await existingOrder.save();

    if (orderClosed) {
      await sendMail(existingOrder.email, "Order Delivered", existingOrder);
    }

    return new Response(JSON.stringify(existingOrder), { status: 200 });
  } catch (error) {
    console.error("Error updating order details:", error);
    return new Response("Failed to update order details", {
      status: 500,
    });
  }
};
