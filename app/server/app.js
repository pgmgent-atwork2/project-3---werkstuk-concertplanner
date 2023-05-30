/* Import statements */
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";

import { create } from "express-handlebars";
import HandlebarsHelpers from "./lib/HandleBarsHelpers.js";

import { VIEWS_PATH } from "./constants.js";

import { home } from "./controllers/home.js";

import {
  register,
  login,
  postRegister,
  postLogin,
  logout,
} from "./controllers/authentication.js";

import registerAuth from "./middleware/validation/registerAuth.js";
import loginAuth from "./middleware/validation/loginAuth.js";
import { jwtAuth } from "./middleware/jwtAuth.js";

/* Setup express server */
const app = express();
app.use(express.static("client"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Add handlebars to app */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.resolve("server", "views", "layouts"),
  partialDir: path.resolve("server", "views", "partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

/* App routing */
app.get("/", jwtAuth, home);
app.get("/login", login);
app.get("/register", register);
app.post("/login", loginAuth, postLogin, login);
app.post("/register", registerAuth, postRegister, register);
app.post("/logout", logout);

/* Start the server */
if (process.env.NODE_ENV !== "test") {
  DataSource.initialize().then(() => {
    const port = process.env.PORT;

    try {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  });
}

export default app;
