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
import { getUserDetailPage, editUserInfo } from "./controllers/user-detail.js";
import { getIncommingReqPage } from "./controllers/incomming-req.js";
import { getIncommingPlanPage } from "./controllers/incomming-plan.js";
import { getGroupPage } from "./controllers/group.js";
import {
  getAllRequests,
  getSpecificRequest,
  addRequest,
  deleteRequest,
} from "./controllers/api/request.js";
import { getRequestPage, postRequest } from "./controllers/request.js";
import {
  getAllCollections,
  getSpecificCollection,
  addCollection,
  editCollection,
  deleteCollection,
} from "./controllers/api/collection.js";
import {
  getInventory,
  getInventoryItem,
  addInventoryItem,
  editInventoryItem,
  deleteInventoryItem,
} from "./controllers/api/inventory.js";
import { getInventoryPage } from "./controllers/inventory.js";
import {
  getAllPlans,
  getSpecificPlan,
  addPlan,
  deletePlan,
} from "./controllers/api/plan.js";
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

app.get("/inkomend-aanvragen", jwtAuth, getIncommingReqPage);

app.get("/inkomend-plannen", jwtAuth, getIncommingPlanPage);

app.get("/groepen", jwtAuth, getGroupPage);

app.get("/beschikbaar-materiaal", jwtAuth, getInventoryPage);

app.get("/plan-opstellen", jwtAuth, getPlanPage);

app.get("/geschiedenis", jwtAuth, getHistoryPage);

app.get("/vraag-aan", jwtAuth, getRequestPage);

/* API routing */
app.get("/api/gebruikers", getAllUsers);
app.get("/api/gebruikers/:id", getSpecificUser);
app.put("/api/gebruikers/:id", editSpecificUser); // Thunder Client
app.post("/gebruikers/:id", jwtAuth, editUserInfo); // Form Input
app.delete("/api/gebruikers/:id", deleteSpecificUser);

app.get("/api/collecties", getAllCollections);
app.get("/api/collecties/:id", getSpecificCollection);
app.post("/api/collecties", addCollection);
app.put("/api/collecties/:id", editCollection);
app.delete("/api/collecties/:id", deleteCollection);

app.get("/api/inventaris", getInventory);
app.get("/api/inventaris/:id", getInventoryItem);
app.post("/api/inventaris", addInventoryItem);
app.put("/api/inventaris/:id", editInventoryItem);
app.delete("/api/inventaris/:id", deleteInventoryItem);

app.get("/api/plannen", getAllPlans);
app.get("/api/plannen/:id", getSpecificPlan);
app.post("/api/plannen", addPlan);
app.delete("/api/plannen/:id", deletePlan);

app.get("/api/aanvragen", getAllRequests);
app.get("/api/aanvragen/:id", getSpecificRequest);
app.post("/api/aanvragen", addRequest);
app.post("/aanvragen", jwtAuth, postRequest);
app.delete("/api/aanvragen/:id", deleteRequest);

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
