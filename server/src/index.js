const cookieParser = require("cookie-parser");
const routes = require("./routes");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);


// Puerto de la aplicación
const port = process.env.PORT || process.env.APP_PORT;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Función para habilitar CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

/*Routers*/
app.use("/api/v1", routes);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

