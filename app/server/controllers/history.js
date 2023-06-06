export const getHistoryPage = (req, res, next) => {
  try {
    res.render("user/history", {
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
