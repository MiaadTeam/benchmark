POST http://localhost:1366/lesan

{
  "service": "main",
  "model": "country",
  "act": "getCountries",
  "details": {
    "get": {
      "_id": 1,
      "name": 1,
      "population": 1,
      "abb": 1,
      "provinces": {
        "_id": 1,
        "name": 1,
        "population": 1,
        "abb": 1,
        "cities": {
          "_id": 1,
          "name": 1,
          "population": 1,
          "abb": 1
        }
      }
    },
    "set": {
      "page": 1,
      "take": 50
    }
  }
}



 
