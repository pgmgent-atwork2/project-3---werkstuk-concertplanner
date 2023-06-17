import handlebars from "handlebars";
const { SafeString } = handlebars;

export default {
  isUnique: function (label, array) {
    return !array.find(function (item) {
      return item.collection.label === label;
    });
  },
};
