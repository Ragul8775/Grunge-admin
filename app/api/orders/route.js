import OrderPaymentDetails from "@/models/orderPayments";
import { mongooseConnectUserPayments } from "../../../lib/mongoose";

export const GET = async (req) => {
  await mongooseConnectUserPayments();
  console.log("Connection done");

  try {
    const products = await OrderPaymentDetails.find();
    console.log(products);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error Getting product:", error);
    return new Response(JSON.stringify("Internal Server Error:", error), {
      status: 500,
    });
  }
};
