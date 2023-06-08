import DataSource from "../../lib/DataSource.js";

const collectionRepo = DataSource.getRepository("Collection");

export const getAllCollections = async (req, res) => {
  try {
    const collections = await collectionRepo.find();

    res.status(200).json(collections);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getSpecificCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await collectionRepo.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json(collection);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addCollection = async (req, res) => {
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

    return res.status(200).json({
      status: "Collection item added succesfully!",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const editCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await collectionRepo.findOne({
      where: {
        id: id,
      },
    });

    if (collection) {
      const newCollection = {
        ...collection,
        ...req.body,
      };

      await collectionRepo.save(newCollection);

      return res.status(200).json({
        status: "Collection updated succesfully!",
      });
    } else {
      return res.status(409).json({
        status: "Collection does not exist!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await collectionRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!collection) {
      res.status(404).json({
        status: "Collection not found, try another id",
      });
    } else {
      await collectionRepo.delete(collection);

      return res.status(200).json({
        status: "Collection deleted succesfully!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
