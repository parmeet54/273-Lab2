//import the required dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

// graphQL
const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/graphql/schema");

require("dotenv").config();
require("./src/auth/auth");

app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors());

//use express session to maintain session data
app.use(
  session({
    secret: "TOP_SECRET",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// API Map Routing
const userRoutes = require("./src/routes/user.route");
const shopRoutes = require("./src/routes/shop.route");
const itemRoutes = require("./src/routes/item.route");
//const cartRoutes = require('./src/routes/cart.route');
const orderRoutes = require("./src/routes/order.route");

// Auth Routes
const authRoutes = require("./src/routes/auth.route");
app.use("/api/v1/auth/", authRoutes);

// Getting routes

// User Routes
app.use("/api/v1/users", userRoutes);

// Shop Routes
app.use("/api/v1/shops", shopRoutes);

// Item Routes
app.use("/api/v1/items", itemRoutes);

// Cart Routes
//app.use("/api/v1/cart", cartRoutes);

// Order Routes
app.use("/api/v1/orders", orderRoutes);

// // User logout function
// app.get('/api/v1/logout', (req,res) => {
//     if(!req.session.user){
//         console.log("\nNot logged in");
//         res.send("Not Logged In");
//     }
//     else{
//         req.session.destroy();
//         res.send("Logged Out");
//         console.log("\nLogged out successfully!");
//     }
// });

// ------------  GRAPHQL SETUP  -------------//

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// -----------------------------------------//

// Server Port
const port = process.env.PORT || 3001;

// Listen to port
// connect to mongodb cluster, then start server
mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    maxPoolSize: 500,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Backend is running at port:", port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to mongo database: ", err);
  });

module.exports = app;
