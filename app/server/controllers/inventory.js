import DataSource from "../lib/DataSource.js";

export const getInventoryPage = (req, res, next) => {
  try {
    res.render("inventory", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
