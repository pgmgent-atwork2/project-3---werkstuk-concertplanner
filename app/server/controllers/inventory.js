import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const collectionRepo = await DataSource.getRepository("Collection");
const inventoryRepo = await DataSource.getRepository("Inventory");

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

export const postCollection = async (req, res) => {
  try {
    const collection = await collectionRepo.findOne({
      where: {
        label: req.body.label,
      },
    });

    if (collection) {
      return res.status(409).json({
        status: "Collection item already exists!",
      });
    } else {
      const newCollection = {
        ...req.body,
      };

      await collectionRepo.save(newCollection);
    }

    res.redirect("beschikbaar-materiaal");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const postInventoryItem = async (req, res) => {
  try {
    const loggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
    });

    const collection = await collectionRepo.findOne({
      where: {
        id: req.body.collection,
      },
    });

    const newItem = {
      ...req.body,
      user: loggedInUser,
      collection: collection,
    };

    await inventoryRepo.save(newItem);

    res.redirect("beschikbaar-materiaal");
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvItem = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItem = await inventoryRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!inventoryItem) {
      res.status(404).json({
        status: "Item not found, try another id",
      });
    } else {
      await inventoryRepo.delete(inventoryItem);

      res.redirect("beschikbaar-materiaal/:id");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
