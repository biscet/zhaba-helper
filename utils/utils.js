const { Telegraf } = require("telegraf");
const { TOKEN } = require("../dict/config");

const bot = new Telegraf(TOKEN);

module.exports = { bot };
