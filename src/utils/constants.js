const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};

const MAX_AND_MIN = {
  MIN: 10,
  MAX: 20,
};

const FILTER_KEYS = {
  zip: "zip",
  type: "type",
  primary_city: "primary_city",
  acceptable_cities: "acceptable_cities",
  unacceptable_cities: "unacceptable_cities",
  state: "state",
  county: "county",
  timezone: "timezone",
  area_codes: "area_codes",
  latitude: "latitude",
  longitude: "longitude",
  country: "country",
  estimated_population: "estimated_population",
};

module.exports = {
  HTTP_METHODS,
  MAX_AND_MIN,
  FILTER_KEYS,
};
