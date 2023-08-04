// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NasoTEoFbwUBVkdlyvx2btAh1jRjufUN4oeDDvNwQDmMztLwo7r8tI8O2G0FvGjlVLtAbgSk8kozh21RjUfpKiH00BC3uIDmQ"
);
const express = require("express");
const routerStripe = express();

const YOUR_DOMAIN = "http://localhost:3003";

routerStripe.post("/create-checkout-session", async (req, res) => {
  const line_items = req.session.checkout;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "idr",
          product_data: {
            name: line_items.Package.name,
          },
          unit_amount: line_items.totalPayment * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

module.exports = routerStripe;
