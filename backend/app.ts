var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var statusRouter = require("./routes/status");

import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authentication";

var app = express();

//why they do this?
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002",
    credentials: true, // Required for cookies
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/status", statusRouter);
app.use("/auth", authRoutes);
app.use(errorHandler);

app.use(favicon(path.join("public", "favicon.ico")));

export default app;
