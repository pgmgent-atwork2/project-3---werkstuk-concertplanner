import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const inventoryRepo = DataSource.getRepository("Inventory");
const collectionRepo = DataSource.getRepository("Collection");

export const getPlanPage = async (req, res, next) => {
  try {
    const getInventory = await inventoryRepo.find();
    const collections = await collectionRepo.find({
      relations: ["inventory"],
    });
    const getLoggedInUser = await userRepo.findOne({
        where: {
          id: req.user.id,
        },
        relations: ["user_meta", "role"],
      });

    res.render("plan", {
      layout: "authentication",
      user: req.user,
      inventory: getInventory,
      collection: collections,
      user: getLoggedInUser,
    });
  } catch (error) {
    console.log(error);
  }
};
