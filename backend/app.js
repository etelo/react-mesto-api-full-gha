require("dotenv").config(); // env-переменные из файла .env добавятся в process.env ; .env вгит игнор добавить

const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const router = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const bodyParser = require("body-parser");

const auth = require("./middlewares/auth");
const { validateSignUp, validateSignIn } = require("./middlewares/validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");

const app = express();
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post("/signin", validateSignIn, login);
app.post("/signup", validateSignUp, createUser);
app.use(auth);

app.use(router);

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(3000);
