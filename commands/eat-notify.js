/// ///////////////////////////////////////////////////////////
// ======================== EXPORTS ======================== //
/// ///////////////////////////////////////////////////////////

const { Markup } = require("telegraf");
const { DEFAULT_DISHES_NAMES, EAT_DISHES } = require("../dict/eat");
const {
  bot,
  listenMsgTexts,
  disheButtonsRender,
  isEmpty,
  difference,
} = require("../utils/utils");
const { createDomain } = require("effector");
const path = require("path");
const { DB_EXT, DB_FIELDS } = require("../dict/config");
const { createDateBaseFb } = require("../utils/db");

/// ///////////////////////////////////////////////////////////
// ====================== DB LOGIC ========================= //
/// ///////////////////////////////////////////////////////////

const EAT_DB_FILE_PATH = path.join(__dirname, `../db/eat.${DB_EXT}`);
const EAT_NOTIFY_DOMAIN = createDomain("eat-notify-db");

const { [DB_FIELDS.DB_STORE]: $dbStore, [DB_FIELDS.DB_SET_FN]: setDbStoreFn } =
  createDateBaseFb({
    [DB_FIELDS.DB_PATH]: EAT_DB_FILE_PATH,
    [DB_FIELDS.DB_DOMAIN]: EAT_NOTIFY_DOMAIN,
  });

/// ///////////////////////////////////////////////////////////
// ======================== BOT LOGIC ====================== //
/// ///////////////////////////////////////////////////////////

bot.on("message", (ctx) => {
  const msg = ctx.message.text;
  const firstName = ctx.message.from.first_name;
  const lastName = ctx.message.from.last_name;

  Object.values(DEFAULT_DISHES_NAMES).forEach((disheName) => {
    if (listenMsgTexts(msg, disheName)) {
      let dishe = [];
      let disheButtons = [];

      const dbInfo = $dbStore.getState();
      const avaibleUser = dbInfo.includes(firstName + lastName);

      if (!avaibleUser) {
        dishe = EAT_DISHES[disheName];
        disheButtons = disheButtonsRender(dishe);

        setDbStoreFn(
          dbInfo +
            (isEmpty(dbInfo) ? "" : `\n`) +
            `${firstName + lastName}::${JSON.stringify(dishe)}::`
        );
      }

      if (avaibleUser) {
        const findInfoByUser = new RegExp(
          `${firstName + lastName}::(\\[.*?\\])::`,
          "g"
        );
        const findInfoByBot = new RegExp(`У вас в котелке: (\\[.*?\\])`, "g");
        const matchInfoByUser = findInfoByUser.exec(dbInfo);
        const matchInfoByBot = findInfoByBot.exec(msg);
        const dbDishes = JSON.parse(matchInfoByUser[1]);

        dishe = !matchInfoByBot
          ? dbDishes
          : difference(
              dbDishes.slice(0, dbDishes.length),
              matchInfoByBot[1].replace("[", "").replace("]", "").split(", ")
            );
        disheButtons = disheButtonsRender(dishe);
      }

      if (dishe.length > 1) {
        ctx.reply(
          `Ваше блюдо ${firstName}: ${disheName}\nСпособ приготовления: ${
            dishe[dishe.length - 1]
          }`,
          Markup.inlineKeyboard(disheButtons)
        );
      } else {
        ctx.reply(
          `Ваше блюдо ${firstName}: ${disheName}\nСпособ приготовления: ${
            dishe[dishe.length - 1]
          }`
        );

        setDbStoreFn(
          dbInfo.replace(
            new RegExp(`${firstName + lastName}::(\\[.*?\\])::`, "g"),
            ""
          )
        );
      }
    }
  });
});
