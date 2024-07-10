const TOKEN = process.env.TOKEN;

const START_MESSAGE = "Всем привет, я ваш помощник для игры в Жаба Бота";

const DB_EXT = "db";

const DB_FIELDS = {
  DB_STORE: "$DB_STORE",
  DB_SET_FN: "DB_SET_FN",
  DB_PATH: "DB_PATH",
  DB_DOMAIN: "DB_DOMAIN",
};

module.exports = { TOKEN, START_MESSAGE, DB_EXT, DB_FIELDS };
