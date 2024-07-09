/// ///////////////////////////////////////////////////////////
// ======================== EXPORTS ======================== //
/// ///////////////////////////////////////////////////////////

const fs = require("fs");
const { DB_FIELDS } = require("../dict/config");
const { sample } = require("effector");

/// ///////////////////////////////////////////////////////////
// ======================= UTILS =========================== //
/// ///////////////////////////////////////////////////////////

const createFile = (filePath) => {
  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.log(`${filePath} - Ошибка при создании файла.`);
    }
  });
};

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(`${filePath} - Ошибка при чтении файла.`);
      } else {
        resolve(data);
      }
    });
  });
};

const updateFile = (filePath, newData) => {
  fs.writeFile(filePath, newData, (err) => {
    if (err) {
      console.log(`${filePath} - Ошибка при перезаписи файла.`);
    }
  });
};

const checkAndCreateFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    createFile(filePath);
  }
};

const processFile = async (filePath) => {
  const data = await readFile(filePath);
  return data;
};

const createDateBaseFb = ({
  [DB_FIELDS.DB_PATH]: path,
  [DB_FIELDS.DB_DOMAIN]: domain,
}) => {
  checkAndCreateFile(path);

  const renderDbFn = domain.createEvent();
  const setDbFn = domain.createEvent();

  const $dbInfo = domain.createStore("");

  $dbInfo.on(renderDbFn, (_, res) => res);

  (async () => {
    const data = await processFile(path);
    renderDbFn(data);
  })();

  sample({
    clock: setDbFn,
    fn: (data) => {
      (async () => {
        updateFile(path, data);
      })();

      return data;
    },
    target: renderDbFn,
  });

  return {
    [DB_FIELDS.DB_STORE]: $dbInfo,
    [DB_FIELDS.DB_SET_FN]: setDbFn,
  };
};

module.exports = {
  updateFile,
  readFile,
  createFile,
  checkAndCreateFile,
  processFile,
  createDateBaseFb,
};
