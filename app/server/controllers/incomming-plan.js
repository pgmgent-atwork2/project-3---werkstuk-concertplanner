import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const planRepo = DataSource.getRepository("Plan");

export const getIncommingPlanPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    const getPlans = await planRepo.find({
      relations: ["user", "user.user_meta"],
    });

    console.log(getPlans);

    res.render("admin/plans-in", {
      user: getLoggedInUser,
      plan: getPlans,
    });
  } catch (error) {
    console.log(error);
  }
};
