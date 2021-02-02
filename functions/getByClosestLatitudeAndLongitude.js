const { HTTP_METHODS } = require("../src/utils/constants");
const {
  getOnlyValidFilterKey,
  isNumber,
  getClosestLatAndLng,
} = require("../src/utils/handlers");

exports.handler = async function(event, context) {
  // your server-side functionality
  if (event.httpMethod !== HTTP_METHODS.GET)
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Http Method not Allowed" }),
    };

  const validFilteredKeys = getOnlyValidFilterKey(event.queryStringParameters);

  if (!validFilteredKeys.length) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Bad Request, not valid key filter was provided",
      }),
    };
  }

  const [longitude, latitude] = validFilteredKeys;

  if (
    !isNumber(event.queryStringParameters[longitude]) ||
    !isNumber(event.queryStringParameters[latitude])
  ) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Bad Request, lat/lon should be numbers",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: getClosestLatAndLng(
        event.queryStringParameters[latitude],
        event.queryStringParameters[longitude]
      ),
    }),
  };
};
