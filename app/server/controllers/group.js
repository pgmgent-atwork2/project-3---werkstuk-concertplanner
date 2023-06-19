import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");

export const getGroupPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    res.render("admin/groups", {
      user: getLoggedInUser,
    });
  } catch (error) {
    console.log(error);
  }
};
