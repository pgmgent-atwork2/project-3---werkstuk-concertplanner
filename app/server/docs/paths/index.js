import Users from "./users.js";
import Collections from "./collections.js";
import Inventory from "./inventory.js";
import Plans from "./plans.js";
import Requests from "./requests.js";

export default {
  ...Users,
  ...Collections,
  ...Inventory,
  ...Plans,
  ...Requests,
};
