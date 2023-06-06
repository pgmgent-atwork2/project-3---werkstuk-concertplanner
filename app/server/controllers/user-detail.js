import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");

export const getUserDetailPage = async (req, res) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    console.log(user);

    res.render("detail", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
