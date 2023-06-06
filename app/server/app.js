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
import {
  getAllUsers,
  getCurrentUser,
  editCurrentUser,
} from "./controllers/api/user.js";
import { getUserDetailPage } from "./controllers/user-detail.js";
import { getRequestPage } from "./controllers/request.js";
import { getInventoryPage } from "./controllers/inventory.js";
import { getPlanPage } from "./controllers/plan.js";
import { getHistoryPage } from "./controllers/history.js";

import registerAuth from "./middleware/validation/registerAuth.js";
import loginAuth from "./middleware/validation/loginAuth.js";
import { jwtAPIAuth, jwtAuth } from "./middleware/jwtAuth.js";

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

app.get("/api/gebruikers", getAllUsers);

app.get("/api/detail-gebruiker/:id", jwtAuth, getUserDetailPage);
// app.post("/api/detail-gebruiker/:id", jwtAuth, editCurrentUser);
// app.put("/api/detail-gebruiker/:id", editCurrentUser);

app.get("/api/beschikbaar-materiaal", jwtAuth, getInventoryPage);

app.get("/api/plan-opstellen", jwtAuth, getPlanPage);

app.get("/api/geschiedenis", jwtAuth, getHistoryPage);

app.get("/api/vraag-aan", jwtAuth, getRequestPage);
// app.post("/vraag-aan", jwtAuth, postRequest, request);

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
