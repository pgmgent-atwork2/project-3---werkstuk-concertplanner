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

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const editCurrentUser = async (req, res) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    if (user) {
      const protectedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = {
        ...user,
        ...req.body,
        password: protectedPassword,
      };
      await userRepo.save(newUser);

      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
