export const getPlan = (req, res, next) => {
  try {
    res.render("plan", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
