import Handlebars from "handlebars";

export default {
  eq: function (optionOne, optionTwo, options) {
    if (optionOne === optionTwo) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
