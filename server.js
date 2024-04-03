import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.VITE_PVT_KEY);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const array = [];
  if (items?.length > 0) {
    items?.map((item) => {
      const { price, cartQuantity } = item;
      const cartItemAmout = price * cartQuantity;
      return array.push(cartItemAmout);
    });
    const totalAmount = array.reduce((a, b) => {
      return a + b;
    });
    console.log(totalAmount * 100);
    return totalAmount * 100;
  }
};
app.post("/create-payment-intent", async (req, res) => {
  const { items, userEmail, address } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    userEmail,
    address,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.get("/", (req, res) => {
  res.send("Welcome to Shop From Home");
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port: ${PORT}`));
