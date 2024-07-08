const DEFAULT_PLACE_AN_EGG_TEXT = "Положить в котелок";

const DEFAULT_DISHES_NAMES = {
  FRIED_EGGS: "Яичница",
};

const EAT_DISHES = {
  [DEFAULT_DISHES_NAMES.FRIED_EGGS]: [
    `${DEFAULT_PLACE_AN_EGG_TEXT} яйцо`,
    "Жарить",
  ],
};

module.exports = { EAT_DISHES, DEFAULT_DISHES_NAMES };
