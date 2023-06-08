import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const inventoryRepo = DataSource.getRepository("Inventory");
const collectionRepo = DataSource.getRepository("Collection");

export const getPlanPage = async (req, res, next) => {
  try {
       
    const getInventory = await inventoryRepo.find(); 
    const getCollections = await collectionRepo.find();
    console.log(getInventory);
    console.log(getCollections);

    res.render("plan", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
