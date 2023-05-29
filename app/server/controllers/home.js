import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  try {
    res.render("home", {});
  } catch (error) {
    console.log(error);
  }
};
