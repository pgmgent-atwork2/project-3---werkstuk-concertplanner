import Handlebars from "handlebars";

export default {
  eq: function (optionOne, optionTwo, options) {
    if (optionOne === optionTwo) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  getDate: () => {
    const currentDate = new Date();
    // padStart is for the desired length of the string
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  },
};
