import DataSource from "../lib/DataSource.js";

const userRepo = await DataSource.getRepository("User");
const collectionRepo = await DataSource.getRepository("Collection");
const requestRepo = DataSource.getRepository("Request");

export const home = async (req, res) => {
  const loggedInUser = await userRepo.findOne({
    where: { id: req.user.id },
    relations: ["user_meta", "role"],
  });

  const getRequests = await requestRepo.find({
    relations: ["user", "user.user_meta"],
  });

  try {
    const collections = await collectionRepo.find({
      relations: ["inventory"],
    });

    if (loggedInUser.role.label === "admin") {
      res.render("admin/requests-in", {
        user: loggedInUser,
        request: getRequests,
      });
    } else {
      res.render("inventory", {
        user: loggedInUser,
        collection: collections,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
