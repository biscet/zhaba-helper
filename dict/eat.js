const DEFAULT_PLACE_AN_EGG_TEXT = "Положить в котелок";

const DEFAULT_DISHES_NAMES = {
  FRIED_EGGS: "Яичница",
  CHICKEN_SOUP: "Куриный суп",
};

const DEFAULT_COOCKING_TYPES = {
  FRY: "Жарить",
  COOK: "Варить",
};

const EAT_DISHES = {
  [DEFAULT_DISHES_NAMES.FRIED_EGGS]: ["яйцо", DEFAULT_COOCKING_TYPES.FRY],
  [DEFAULT_DISHES_NAMES.CHICKEN_SOUP]: [
    "курица",
    "морковь",
    "макароны",
    DEFAULT_COOCKING_TYPES.COOK,
  ],
};

module.exports = {
  EAT_DISHES,
  DEFAULT_DISHES_NAMES,
  DEFAULT_COOCKING_TYPES,
  DEFAULT_PLACE_AN_EGG_TEXT,
};
