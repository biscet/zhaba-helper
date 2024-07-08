const { bot } = require("./utils/utils");

bot.launch();

require("./commands/index");

console.log("Бот запустился");
