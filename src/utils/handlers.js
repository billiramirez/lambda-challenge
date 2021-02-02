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
    Object.keys(FILTER_KEYS).forEach((key) => {
      if (queryParam === key) {
        validKeys.push(key);
      }
    });
  });
  return validKeys;
};

const getClosestLatAndLng = (lat, lng) => {
  return data.reduce((acc, item) => {
    if (acc.latitude && acc.longitude) {
      if (
        Math.abs(item.latitude - lat) <= Math.abs(acc.latitude - lat) &&
        Math.abs(item.longitude - lng) <= Math.abs(acc.longitude - lng)
      ) {
        acc = { ...item };
      }
    } else {
      acc = { ...item };
    }
    return acc;
  }, {});
};

const isNumber = (value) => !Number.isNaN(+value);

module.exports = {
  getZipCodes,
  getPartialOrFullSearch,
  getOnlyValidFilterKey,
  isNumber,
  getClosestLatAndLng,
};
