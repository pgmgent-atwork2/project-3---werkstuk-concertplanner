import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");
const planRepo = await DataSource.getRepository("Plan");

export const getHistoryPage = async (req, res) => {
  try {
    const loggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["plans"],
    });

    const plan = await planRepo.find({
      where: {
        user: loggedInUser,
      },
    });

    res.render("user/history", {
      user: loggedInUser,
      plan: plan,
    });
  } catch (error) {
    console.log(error);
  }
};
