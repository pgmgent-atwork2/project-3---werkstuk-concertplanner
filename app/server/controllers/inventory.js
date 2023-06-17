import DataSource from "../lib/DataSource.js";

const collectionRepo = await DataSource.getRepository("Collection");
const inventoryRepo = await DataSource.getRepository("Inventory");

export const getInventoryPage = async (req, res) => {
  const inventory = await inventoryRepo.find({
    relations: ["collection"],
  });
  const collections = await collectionRepo.find();
  try {
    res.render("inventory", {
      user: req.user,
      inventory: inventory,
      collections: collections,
    });
  } catch (error) {
    console.log(error);
  }
};
