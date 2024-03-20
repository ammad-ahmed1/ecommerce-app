import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PVT_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to Shop From Home");
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port: ${PORT}`));
