import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DataSource from "../lib/DataSource.js";

/* Repository instances */
const userRepo = await DataSource.getRepository("User");
const userMetaRepo = await DataSource.getRepository("UserMeta");
const roleRepo = await DataSource.getRepository("Role");

export const register = async (req, res) => {
  // errors
  const { formErrors } = req;

  // input fields
  const inputs = [
    {
      name: "name",
      label: "Groepnaam of gebruikersnaam",
      type: "text",
      value: req.body?.name ? req.body.name : "",
      error: req.formErrorFields?.name ? req.formErrorFields.name : null,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "phone",
      label: "Telefoon / GSM",
      type: "text",
      value: req.body?.phone ? req.body.phone : "",
      error: req.formErrorFields?.phone ? req.formErrorFields.phone : null,
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // get the roles
  const roles = await roleRepo.find();

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
    roles,
  });
};

export const login = async (req, res) => {
  // errors
  const { formErrors } = req;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render the login page
  res.render("login", {
    layout: "authentication",
    // add data to the view
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    }

    const userExists = await userRepo.findOne({
      where: {
        email: req.body.email,
      },
      relations: ["roles"],
    });

    const role = await roleRepo.findOne({
      where: {
        label: req.body.roles,
        // label: 'Admin',
      },
    });

    // check if role exists
    if (!role) {
      req.formErrors = [{ message: "Rol bestaat niet." }];
      return next();
    }

    // check if user already exists
    if (userExists) {
      req.formErrors = [{ message: "Gebruiker bestaat al." }];
      return next();
    }

    // encrypt (hash) password 10 times
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const emailLowercase = req.body.email.toLowerCase();

    const user = await userRepo.create({
      email: emailLowercase,
      password: hashedPassword,
      roles: role.id,
    });
    await userRepo.save(user);
    const userMeta = await userMetaRepo.create({
      ...req.body,
      users: user.id,
    });

    await userMetaRepo.save(userMeta);

    res.redirect("/login");
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    }
    const emailLowercase = req.body.email.toLowerCase();

    // get a user with a specific email
    const user = await userRepo.findOne({
      where: {
        email: emailLowercase,
      },
    });

    // authentication validation
    if (!user) {
      req.formErrors = [{ message: "Gebruiker bestaat niet." }];
      return next();
    }

    // compare hashed password with saved hashed password
    const givenPassword = req.body.password;
    const dbPassword = user.password;
    // true or false
    const isAMatch = bcrypt.compareSync(givenPassword, dbPassword);

    // password check
    if (!isAMatch) {
      req.formErrors = [{ message: "Wachtwoord is niet correct." }];
      return next();
    }

    // create the JWT web token, aka our identity card
    const token = jwt.sign(
      { id: user.id, email: req.body.email },
      process.env.TOKEN_SALT,
      { expiresIn: "24h" }
    );
    // create a cookie and add this to the response
    res.cookie("token", token, { httpOnly: true });

    // redirect to our root
    return res.redirect("/");
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.redirect("/login");
  } catch (error) {
    next(error.message);
  }
};
