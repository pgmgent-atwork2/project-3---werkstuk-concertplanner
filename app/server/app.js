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
  getSpecificUser,
  editSpecificUser,
  deleteSpecificUser,
} from "./controllers/api/user.js";
import { getUserDetailPage } from "./controllers/user-detail.js";
import { getRequestPage } from "./controllers/request.js";
import {
  getInventory,
  getInventoryItem,
  addInventoryItem,
  editInventoryItem,
  deleteInventoryItem,
} from "./controllers/api/inventory.js";
import { getInventoryPage } from "./controllers/inventory.js";
import { getPlanPage } from "./controllers/plan.js";
import { getHistoryPage } from "./controllers/history.js";

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

/* APP routing */
app.get("/", jwtAuth, home);

app.get("/login", login);
app.get("/register", register);
app.post("/login", loginAuth, postLogin, login);
app.post("/register", registerAuth, postRegister, register);
app.post("/logout", logout);

app.get("/detail-gebruiker/:id", jwtAuth, getUserDetailPage);

app.get("/beschikbaar-materiaal", jwtAuth, getInventoryPage);

app.get("/plan-opstellen", jwtAuth, getPlanPage);

app.get("/geschiedenis", jwtAuth, getHistoryPage);

app.get("/vraag-aan", jwtAuth, getRequestPage);

/* API routing */
app.get("/api/gebruikers", getAllUsers);
app.get("/api/gebruikers/:id", getSpecificUser);
// Still an error with the new hashed password, salt and hash error
app.put("/api/gebruikers/:id", editSpecificUser);
app.delete("/api/gebruikers/:id", deleteSpecificUser);

app.get("/api/inventaris", getInventory);
app.get("/api/inventaris/:id", getInventoryItem);
app.post("/api/inventaris", addInventoryItem);
app.put("/api/inventaris/:id", editInventoryItem);
app.delete("/api/inventaris/:id", deleteInventoryItem);

// plan

// history

// request

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
