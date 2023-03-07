require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const products = require("./routes/product-routes");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookie = require("cookie-parser");
//middleware to use cookie
app.use(cookie());
//middleware to access the json and form datas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//set base routes
app.use("/api/v1/products", products);

//middleware for static files
app.use('/', express.static("./public"));
app.use('/admin', express.static("./admin-public"))
app.use('/uploads', express.static("uploads"));
//middleware for incorrect route
app.use(notFound)
app.use(errorHandlerMiddleware)

//set the default port value to be used in production and while building
const port = process.env.PORT || 8080;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
      .then(() => {
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}`)
        );
        console.log('')
      })
      .catch((error) => console.error("Could not connect."));
  } catch (error) {
    console.log(error);
  }
};

startApp();
  // if (name) {
  //   queryObject.name = { $regex: name, $options: 'i' };
  // }
