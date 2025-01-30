require("dotenv").config();
const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const healthRouter = require("./routes/health");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/health", healthRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "sample_mflix",
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB not Connected: " + err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

const port = process.env.PORT ?? 4001;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

module.exports = app;
