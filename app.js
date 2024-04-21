const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const booksrouter = require("./routes/books");
const loginrouter = require("./routes/login");

app.get("/", (req, res) => {
  res.send("<h1>Books</h1>");
});
//middleware
app.use(express.json());

//router
app.use("/api/v1", loginrouter);
app.use("/api/v1/books", booksrouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
