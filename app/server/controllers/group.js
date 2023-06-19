import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const groupRepo = DataSource.getRepository("User");

export const getGroupPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    const getGroups = await groupRepo.find({
      relations: ["user_meta"],
    });
    
    res.render("admin/groups", {
      user: getLoggedInUser,
      group: getGroups,
    });
  } catch (error) {
    console.log(error);
  }
};
