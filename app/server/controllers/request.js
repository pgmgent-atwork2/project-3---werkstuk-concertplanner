import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");
const requestRepo = await DataSource.getRepository("Request");

export const getRequestPage = async (req, res) => {
  try {
    res.render("user/request", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async (req, res) => {
  try {
    const loggedInUser = await userRepo.findOne({
      where: {
        id: req.user.id,
      },
    });

    const newRequest = {
      ...req.body,
      user: loggedInUser,
    };

    await requestRepo.save(newRequest);

    res.render("user/request", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
