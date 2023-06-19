import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");
const userMetaRepo = await DataSource.getRepository("UserMeta");
const roleRepo = await DataSource.getRepository("Role");
const collectionRepo = await DataSource.getRepository("Collection");

export const home = async (req, res) => {
  const loggedInUser = await userRepo.findOne({
    where: { id: req.user.id },
    relations: ["user_meta", "role"],
  });

  try {
    const collections = await collectionRepo.find({
      relations: ["inventory"],
    });

    res.render("home", {
      user: loggedInUser,
    });

    // if (loggedInUser.role.label === "admin") {
    //   res.render("admin/requests-in", {
    //     user: loggedInUser,
    //   });
    // } else {
    //   res.render("user/inventory", {
    //     user: loggedInUser,
    //     collection: collections,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};
