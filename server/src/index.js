const config = require("./config/app.json");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Puerto de la aplicación
const port = process.env.PORT || config.APP_PORT;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


console.log(process.env.CORS_ORIGIN || config.CORS_ORIGIN);

const allowedOrigins = config.CORS_ORIGIN;

// Función para habilitar CORS
app.use(
  cors({
    origin: function (origin, callback) {
    // Permitir solicitudes sin 'origin' como en curl/postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS no permitido para este origen"));
      }
    },
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

