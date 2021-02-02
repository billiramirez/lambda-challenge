# Aura Code Challenge

This challenge will allow you demostrate your knowledge and understanding of node.js.
It is intended to be familar, much like a development story that could come up on the job.
After you submit the completed project, we will schedule a follow-up code-review.

## The Story

**Create a lambda-like handler function that can query zip code data in various ways**

- handler function is already bootstrapped in `src/index.js`
- handler is invoked with events (see below) as would come from API Gateway
- it is `async` and should return an array or throw an error
- the dataset to be searched is included in the `src/data.json` file
- look at the data and decide how best to utilize it

### Acceptance Criteria

- design and define zipcode api
- implement zipcode api handler
- search by full or partial zipcode
- search by full or partial city name
- search by closest latitude/longitude
- filter by additional attributes

### Sample Zipcode Object

```json
{
  "zip": "01230",
  "type": "STANDARD",
  "primary_city": "Great Barrington",
  "acceptable_cities": "Egremont, Gt Barrington, N Egremont, New Marlboro, New Marlborou, New Marlborough, North Egremont, Simons Rock",
  "unacceptable_cities": "Alford, Berkshire Heights, Hartsville, Risingdale, Van Deusenville",
  "state": "MA",
  "county": "Berkshire County",
  "timezone": "America/New_York",
  "area_codes": "413",
  "latitude": "42.19",
  "longitude": "-73.35",
  "country": "US",
  "estimated_population": "5873"
}
```

### Sample Events

```json
{
  "httpMethod": "GET",
  "path": "/resource",
  "headers": {},
  "queryStringParameters": {
    "date": "2020-11-13"
  }
}
```

```json
{
  "httpMethod": "POST",
  "path": "/resouce",
  "headers": {
    "content-type": "application/json"
  },
  "body": "{\"title\":\"hello world\"}"
}
```

## Suggestions

- Spend as much or as little time as you wish on this challenge.
- Many implementation details are up to you, be prepared to explain your decisions.
- Details matter, but you should strive to provide a complete feature.
- Use any node packages you want, just remember we want to know what _you_ can do.
- Consider how you can show how your feature should work, and prove that it does work.

## Getting started

- this bundle contains a git repository
- work locally, commit changes
- push to your own git service
- share the repository link with us

## Package Scripts

| command              | description                  |
| :------------------- | :--------------------------- |
| `npm run format:fix` | format files with "prettier" |
| `npm run test`       | execute tests with "jest"    |

---

# Docs for the Solutions - Billi Ramirez

### Run This Locally

If you want to run this local, you can install the dependencies:

- `npm install`
- Install `Netlify-CLI` to run it locally: `npm install netlify-cli -g`

#### Run the API:

- Run: `netlify dev` and check the PORT for the app
- Go to `http://localhost:PORT/api/{endpoint}`

#### Avilable Endpoints:

| endpoint description                 | URL                                                                                       | Additional Notes      |
| :----------------------------------- | :---------------------------------------------------------------------------------------- | :-------------------- |
| Get all the data                     | `/api/zipcodes`                                                                           | -                     |
| search by full or partial zipcode    | `/api/getByPartialZipCode?zip=zip_value`                                                  | -                     |
| search by full or partial city name  | `/api/getByPartialCityName?primary_city=primary_city_value`                               | -                     |
| search by closest latitude/longitude | `/api/getByClosestLatitudeAndLongitude?latitude=latitude_value&longitude=longitude_value` | -                     |
| filter by additional attributes      | `/api/filter?country=country_value&type=type_value`                                       | All Field if you want |

### Run in Production

You can try this in production with Netlify Functions, the URL is this one: `https://lambda-excercise-solidlogix.netlify.app/api/zipcodes`
