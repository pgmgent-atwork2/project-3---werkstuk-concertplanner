import bcrypt from "bcrypt";
import DataSource from "../../lib/DataSource.js";

const inventoryRepo = DataSource.getRepository("Inventory");

export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryRepo.find();

    res.status(200).json(inventory);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItem = await inventoryRepo.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json(inventoryItem);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await inventoryRepo.findOne({
      where: {
        label: req.body.label,
      },
    });

    if (inventoryItem) {
      return res.status(409).json({
        status: "Inventory item already exists!",
      });
    } else {
      const newInventoryItem = {
        ...req.body,
      };

      await inventoryRepo.save(newInventoryItem);
    }

    return res.status(200).json({
      status: "Inventory item added succesfully!",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const editInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItem = await inventoryRepo.findOne({
      where: {
        id: id,
      },
    });

    if (inventoryItem) {
      const newInventoryItem = {
        ...inventoryItem,
        ...req.body,
      };

      await inventoryRepo.save(newInventoryItem);

      return res.status(200).json({
        status: "Inventory item updated succesfully!",
      });
    } else {
      return res.status(409).json({
        status: "Inventory item does not exist!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteInventoryItem = async (req, res) => {
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

      return res.status(200).json({
        status: "Inventory item deleted succesfully!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
