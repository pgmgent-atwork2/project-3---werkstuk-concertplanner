import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const inventoryRepo = DataSource.getRepository("Inventory");

export const getPlanPage = async (req, res, next) => {
  try {
       
    const getInventory = await inventoryRepo.find(); 
    console.log(getInventory);

    res.render("plan", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
