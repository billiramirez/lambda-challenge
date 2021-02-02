const { HTTP_METHODS } = require("../src/utils/constants");
const { getZipCodes } = require("../src/utils/handlers");

exports.handler = async function(event, context) {
  // your server-side functionality
  if (event.httpMethod !== HTTP_METHODS.GET)
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Http Method not Allowed" }),
    };

  return {
    statusCode: 200,
    body: JSON.stringify({ zipcodes: getZipCodes(10) }),
  };
};
