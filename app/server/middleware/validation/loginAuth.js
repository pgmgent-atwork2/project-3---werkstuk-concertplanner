import { body } from 'express-validator';

export default [
  body("email").isEmail().withMessage("Vul een geldig email in!"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Wachtwoord moet tussen 8 en 20 tekens bevatten!"),
];
