import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const collectionRepo = await DataSource.getRepository("Collection");

export const getInventoryPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    const collections = await collectionRepo.find({
      relations: ["inventory"],
    });

    res.render("inventory", {
      user: getLoggedInUser,
      collection: collections,
    });
  } catch (error) {
    console.log(error);
  }
};
