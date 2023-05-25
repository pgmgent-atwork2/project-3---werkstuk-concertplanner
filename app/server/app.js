/* Import statements */
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";

import { VIEWS_PATH } from "./constants.js";

/* Setup express server */
const app = express();
app.use(express.static("client"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
