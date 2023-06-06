import DataSource from "../lib/DataSource.js";

export const getInventory = (req, res, next) => {
  try {
    res.render("inventory", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
