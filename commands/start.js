const { bot } = require("../utils/utils");
const { START_MESSAGE } = require("../dict/config");

bot.start((ctx) => ctx.reply(START_MESSAGE));
