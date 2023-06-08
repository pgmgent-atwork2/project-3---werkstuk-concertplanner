import bcrypt from "bcrypt";
import DataSource from "../../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const metaRepo = DataSource.getRepository("UserMeta");
const roleRepo = DataSource.getRepository("Role");

export const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.find({
      relations: ["user_meta", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user_meta", "role"],
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const editSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user_meta", "role"],
    });

    if (user) {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }

      const newUser = {
        ...user,
        ...req.body,
      };

      await userRepo.save(newUser);

      res.status(200).json({
        status: "User updated succesfully!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).json({
        status: "User not found, try another id!",
      });
    }
    await userRepo.delete(user);

    res.status(200).json({
      status: "User deleted succesfully!",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
