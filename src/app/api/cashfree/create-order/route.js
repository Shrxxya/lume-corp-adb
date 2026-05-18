import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

export async function POST(req) {
  try {
    const request = {
      order_amount: 100,
      order_currency: "INR",

      customer_details: {
        customer_id: "user_123",
        customer_phone: "9999999999",
      },

      order_meta: {
        return_url:
          "http://localhost:3000/payment-status?order_id={order_id}",
      },
    };

    const response = await cashfree.PGCreateOrder(request);

    return Response.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error);

    return Response.json(
      {
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}