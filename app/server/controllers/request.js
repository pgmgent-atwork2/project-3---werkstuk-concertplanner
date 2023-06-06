import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");
const requestRepo = await DataSource.getRepository("Request");

export const getUserDetails = async (req, res) => {
  try {
    res.render("user/request", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const request = async (req, res) => {
//   const val = validationResult(req);

//   const helperError = (errors) => {
//     return val.errors.find((error) => error.path === errors)?.msg ?? null;
//   };

//   // errors
//   const { formErrors } = req;

//   // input fields
//   const inputs = [
//     {
//       name: "subject",
//       label: "Onderwerp",
//       type: "text",
//       value: req.body?.subject ? req.body.subject : "",
//       error: helperError("subject"),
//     },
//     {
//       name: "description",
//       label: "Beschrijving",
//       type: "text",
//       value: req.body?.description ? req.body.description : "",
//       error: helperError("description"),
//     },
//   ];

//   // render the login page
//   res.render("user/request", {
//     layout: "main",
//     // add data to the view
//     inputs,
//     formErrors,
//   });
// };

// export const postRequest = async (req, res, next) => {
//   try {
//     const requestRepo = DataSource.getRepository("Request");

//     const result = await requestRepo.save({
//       subject: req.body.subject,
//       description: req.body.description,
//       user: {
//         id: 2,
//       },
//       relations: ["user"],
//     });

//     res.redirect("user/request");
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = req.user;

//     res.render("user/request", {
//       user: req.user,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
