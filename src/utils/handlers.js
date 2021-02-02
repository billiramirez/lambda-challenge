const data = require("../data.json");
const { MAX_AND_MIN } = require("./constants");

const getZipCodes = (max = MAX_AND_MIN.MAX) => {
  let finalData = [];
  for (let i = 0; i < max; i++) {
    finalData.push(data[i]);
  }
  return finalData;
};

module.exports = {
  getZipCodes,
};
