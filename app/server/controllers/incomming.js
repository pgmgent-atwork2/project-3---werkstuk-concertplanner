import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");

export const getIncommingPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    res.render("admin/requests-in", {
      user: getLoggedInUser,
    });
  } catch (error) {
    console.log(error);
  }
};
