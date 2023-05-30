import { body } from "express-validator";

export default [
  body("name").isLength({ min: 2 }).withMessage("Vul een gebruikersnaam in"),
  body("email").isEmail().withMessage("Vul een geldig email in"),
  body("phone").isNumeric().withMessage("Vul een geldig telefoonnum in"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Wachtwoord moet tussen 8 en 20 tekens bevatten"),
];
