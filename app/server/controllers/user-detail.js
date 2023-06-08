import bcrypt from "bcrypt";
import DataSource from "../lib/DataSource.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const userRepo = await DataSource.getRepository("User");
const userMetaRepo = await DataSource.getRepository("UserMeta");

export const getUserDetailPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta"],
    });

    // console.log(getLoggedInUser);

    res.render("detail", {
      user: getLoggedInUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user_meta"],
    });

    if (user) {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
          ...user,
          ...req.body,
        };

        await userRepo.save(newUser);

        const userMeta = await userMetaRepo.findOne({
          where: {
            user: { id },
          },
        });

        if (userMeta) {
          const newUserMeta = {
            ...userMeta,
            ...req.body,
          };

          await userMetaRepo.save(newUserMeta);

          res.redirect(`/detail-gebruiker/${id}`);
        }
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
