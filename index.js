const express = require("express");
const dotenv = require("dotenv");
require("express-async-errors");
const tweets = require("./routes/tweets");
const requests = require("./routes/requests");
const logs = require("./routes/audits");
const matrix = require("./routes/matrix");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const { startAudit } = require("./middleware/audit");

dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server has started in ${process.env.NODE_ENV} on port ${port}`);
});

app.use(startAudit);

app.use("/api/v1/tweets", tweets);
app.use("/api/v1/requests", requests);
app.use("/api/v1/logs", logs);
app.use("/api/v1/matrix", matrix);
app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR ${err.message}`);
  server.close(() => process.exit());
});
