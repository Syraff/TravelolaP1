const express = require("express");
const router = require("./routes");
const app = express();
const port = 3003;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Travelolalola",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);
app.use(router);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
