import DataSource from "../lib/DataSource.js";

const userRepo = DataSource.getRepository("User");
const requestRepo = DataSource.getRepository("Request");

export const getIncommingReqPage = async (req, res) => {
  try {
    const getLoggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: ["user_meta", "role"],
    });

    const getRequests = await requestRepo.find({
      relations: ["user", "user.user_meta"],
    });

    res.render("admin/requests-in", {
      user: getLoggedInUser,
      request: getRequests,
    });
  } catch (error) {
    console.log(error);
  }
};
