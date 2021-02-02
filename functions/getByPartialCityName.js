const { HTTP_METHODS } = require("../src/utils/constants");
const {
  getPartialOrFullSearch,
  getOnlyValidFilterKey
} = require("../src/utils/handlers");

exports.handler = async function(event, context) {
  // your server-side functionality
  if (event.httpMethod !== HTTP_METHODS.GET)
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Http Method not Allowed" })
    };

  const response = getOnlyValidFilterKey(event.queryStringParameters);

  if (!response.length) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Bad Request, not valid key filter was provided"
      })
    };
  }

  const [primary_city, _] = response;

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: getPartialOrFullSearch(
        primary_city,
        event.queryStringParameters[primary_city]
      )
    })
  };
};
