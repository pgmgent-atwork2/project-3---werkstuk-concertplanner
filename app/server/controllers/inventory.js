import DataSource from "../lib/DataSource.js";

const collectionRepo = await DataSource.getRepository("Collection");

export const getInventoryPage = async (req, res) => {
  try {
    const collections = await collectionRepo.find({
      relations: ["inventory"],
    });

    res.render("inventory", {
      user: req.user,
      collection: collections,
    });
  } catch (error) {
    console.log(error);
  }
};
