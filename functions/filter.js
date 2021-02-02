const { HTTP_METHODS } = require("../src/utils/constants");
const {
  getOnlyValidFilterKey,
  getFilteredValues,
  getConditionsFromValidKeys,
} = require("../src/utils/handlers");

exports.handler = async function(event, context) {
  // your server-side functionality
  if (event.httpMethod !== HTTP_METHODS.GET)
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Http Method not Allowed" }),
    };

  const filteredValidKeys = getOnlyValidFilterKey(event.queryStringParameters);

  if (!filteredValidKeys.length) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Bad Request, not valid key filter was provided",
      }),
    };
  }

  let filterObjet = {};

  filterObjet = getConditionsFromValidKeys(
    filteredValidKeys,
    event.queryStringParameters
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: getFilteredValues(filterObjet),
    }),
  };
};
