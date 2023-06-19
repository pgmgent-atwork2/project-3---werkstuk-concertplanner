import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const inventoryRepo = DataSource.getRepository("Inventory");
const collectionRepo = DataSource.getRepository("Collection");

export const getPlanPage = async (req, res, next) => {
  try {
    const getInventory = await inventoryRepo.find();
    const getCollections = await collectionRepo.find();

    res.render("plan", {
        layout: "authentication",
      user: req.user,
      inventory: getInventory,
      collections: getCollections,
    });
  } catch (error) {
    console.log(error);
  }
};
