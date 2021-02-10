const dotenv = require("dotenv").config();

const axios = require("axios");
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

const getFilteredValues = (filteredObject) => {
  return data.filter((item) => {
    return Object.keys(filteredObject).every((key) => {
      return (
        item[key] &&
        item[key].toLowerCase() === filteredObject[key].toLowerCase()
      );
    });
  });
};

const getConditionsFromValidKeys = (filteredValidKeys, queryParams) => {
  return filteredValidKeys.reduce((acc, validKey) => {
    acc[validKey] = queryParams[validKey];
    return acc;
  }, {});
};

const isNumber = (value) => !Number.isNaN(+value);

const getDataFromApi = async (config) => {
  const API_URL = process.env.API_URL;

  return await axios({
    method: config.method || "get",
    url: `${API_URL}/${config.endpoint}`,
    timeout: config.timeout || "5000",
    headers: {
      "Access-Control-Allow-Headers": "Origin, Content-Type",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(({ data }) => {
    return data;
  });
};

module.exports = {
  getZipCodes,
  getPartialOrFullSearch,
  getOnlyValidFilterKey,
  isNumber,
  getClosestLatAndLng,
  getFilteredValues,
  getConditionsFromValidKeys,
  getDataFromApi,
};
