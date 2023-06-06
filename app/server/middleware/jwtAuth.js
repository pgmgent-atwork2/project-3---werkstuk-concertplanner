import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";

export const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const userRepo = DataSource.getRepository("User");
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);

    // get user out of the database
    const user = await userRepo.findOne({
      where: { id },
      relations: ["role"],
    });

    user.password = "";

    // check if user exists
    req.user = user;

    next();
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};
