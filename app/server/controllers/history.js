import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");

export const getHistoryPage = async (req, res) => {
  try {
    const loggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["plans"],
    });

    console.log(loggedInUser);

    res.render("user/history", {
      user: loggedInUser,
    });
  } catch (error) {
    console.log(error);
  }
};
