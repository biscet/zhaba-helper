const { Markup } = require("telegraf");

const listenMsgTexts = (msg, text) => {
  const result = msg.toLowerCase().includes(text.toLowerCase());
  return result;
};

const disheButtonsRender = (dishe) => {
  const buttons = [];

  dishe.forEach((command, i) => {
    if (i !== dishe.length - 1) {
      buttons.push([Markup.button.switchToCurrentChat(command, command)]);
    }
  });

  return buttons;
};

module.exports = { listenMsgTexts, disheButtonsRender };
