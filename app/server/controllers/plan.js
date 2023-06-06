export const getPlanPage = (req, res, next) => {
  try {
    res.render("plan", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
