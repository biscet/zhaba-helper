/// ///////////////////////////////////////////////////////////
// ======================== EXPORTS ======================== //
/// ///////////////////////////////////////////////////////////

const { Telegraf } = require("telegraf");
const { TOKEN } = require("../dict/config");
const { Markup } = require("telegraf");
const { DEFAULT_PLACE_AN_EGG_TEXT } = require("../dict/eat");

/// ///////////////////////////////////////////////////////////
// ======================= UTILS =========================== //
/// ///////////////////////////////////////////////////////////

const bot = new Telegraf(TOKEN);

const listenMsgTexts = (msg, text) => {
  const result = msg?.toLowerCase().includes(text.toLowerCase());
  return result;
};

const disheButtonsRender = (dishe) => {
  const buttons = [];

  dishe.forEach((command, i) => {
    if (i !== dishe.length - 1) {
      const commandText = `${DEFAULT_PLACE_AN_EGG_TEXT} ${command}`;

      buttons.push([
        Markup.button.switchToCurrentChat(commandText, commandText),
      ]);
    }
  });

  return buttons;
};

const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  Object.entries(obj || {}).length === 0;

const difference = (a, b) => a.filter((value) => !b.includes(value));

module.exports = {
  bot,
  listenMsgTexts,
  disheButtonsRender,
  isEmpty,
  difference,
};
