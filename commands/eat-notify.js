const { Markup } = require("telegraf");
const { DEFAULT_DISHES_NAMES, EAT_DISHES } = require("../dict/eat");
const { listenMsgTexts, disheButtonsRender } = require("../utils/func");
const { bot } = require("../utils/utils");

bot.on("message", (ctx) => {
  const msg = ctx.message.text;
  const userName = ctx.message.from.first_name;

  Object.values(DEFAULT_DISHES_NAMES).forEach((disheName) => {
    if (listenMsgTexts(msg, disheName)) {
      const dishe = EAT_DISHES[disheName];
      const disheButtons = disheButtonsRender(dishe);

      ctx.reply(
        `Ваше блюдо ${userName}: ${disheName}\nЕго нужно: ${
          dishe[dishe.length - 1]
        }`,
        Markup.inlineKeyboard(disheButtons)
      );
    }
  });
});
