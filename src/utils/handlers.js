const data = require("../data.json");
const { MAX_AND_MIN, FILTER_KEYS } = require("./constants");

const getZipCodes = (max = MAX_AND_MIN.MAX) => {
  let finalData = [];
  for (let i = 0; i < max; i++) {
    finalData.push(data[i]);
  }
  return finalData;
};

const getPartialOrFullSearch = (key, text) => {
  return data.filter((record) => {
    if (key === FILTER_KEYS.zip) {
      const trimText = record[key].substr(0, text.length);
      return trimText.includes(text);
    }
    return record[key].includes(text);
  });
};

const getOnlyValidFilterKey = (queryParams) => {
  let validKeys = [];
  Object.keys(queryParams).forEach((queryParam) => {
    validKeys = Object.keys(FILTER_KEYS).filter((key) => queryParam === key);
  });
  return validKeys;
};

module.exports = {
  getZipCodes,
  getPartialOrFullSearch,
  getOnlyValidFilterKey,
};
