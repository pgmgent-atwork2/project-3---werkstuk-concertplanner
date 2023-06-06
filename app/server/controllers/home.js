import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  const userRepo = await DataSource.getRepository("User").findOne({
    where: { id: req.user.id },
    relations: ["user_meta", "role"],
  });
  const userMetaRepo = await DataSource.getRepository("UserMeta");
  const roleRepo = await DataSource.getRepository("Role");

  try {
    res.render("home", {
      user: userRepo,
    });
  } catch (error) {
    console.log(error);
  }
};
