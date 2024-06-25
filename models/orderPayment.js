import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderPaymentSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
      default: null,
    },
    razorpay_order_id: {
      type: String,
      default: null,
    },
    razorpay_signature: {
      type: String,
      default: null,
    },
    products: {
      type: [productSchema],
      default: [],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderPaymentDetails =
  models.OrderPaymentDetails ||
  model("OrderPaymentDetails", orderPaymentSchema);
export default OrderPaymentDetails;
