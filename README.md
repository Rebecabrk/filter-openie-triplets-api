# Filter OpenIE Triplets API

## Overview
The **Filter OpenIE Triplets API** is a RESTful API that filters triplets (subject-relation-object) based on two criteria:
1. If the triplet's subject or object matches any entity in the provided Named Entity Recognition (NER) list.
2. If any word in the triplet (subject, relation, or object) has a frequency greater than 0.5 in the provided Term Frequency-Inverse Document Frequency (TF-IDF) list.

The API processes a JSON input and returns a list of filtered triplets representing the most important ones.

---

## Features
- Filters triplets based on NER matches.
- Filters triplets based on TF-IDF frequency thresholds.
- Returns only the most relevant triplets.

---

## Input Format
The API expects a JSON object with the following structure:

```json
{
  "triplets": [
    ["subject1", "relation1", "object1"],
    ["subject2", "relation2", "object2"]
  ],
  "ner": ["NER1", "NER2", "NER3"],
  "tfidf": [
    ["word1", 0.5],
    ["word2", 0.8]
  ]
}
```

Fields:
- **triplets**: An array of triplets, where each triplet is an array of three strings: `[subject, relation, object]`.
- **ner**: An array of strings representing named entities.
- **tfidf**: An array of `[word, frequency]` pairs, where `word` is a string and `frequency` is a number.

---

## Output Format
The API returns a JSON object with the filtered triplets:

```json
{
  "filteredTriplets": [
    ["subject1", "relation1", "object1"]
  ]
}
```

Field:
- **filteredTriplets**: An array of triplets that meet the filtering criteria.

---

## API Endpoint
**POST** `/filter`  
Filters triplets based on NER and TF-IDF criteria.  
- **Request Body**: JSON object as described in the input format.  
- **Response**: JSON object containing the filtered triplets.

---

## Example Usage
Request:
```json
POST /filter
Content-Type: application/json

{
  "triplets": [
    ["Apple", "is", "fruit"],
    ["Dog", "chases", "cat"]
  ],
  "ner": ["Apple", "Dog"],
  "tfidf": [
    ["Apple", 0.6],
    ["chases", 0.4]
  ]
}
```

Response:
```json
{
  "filteredTriplets": [
    ["Apple", "is", "fruit"],
    ["Dog", "chases", "cat"]
  ]
}
```

---

## Error Handling

If any required fields are missing, the API returns a `400 Bad Request` response with an error message specifying the missing fields.

Example:
Request:
```json
POST /filter
Content-Type: application/json

{
  "triplets": [
    ["Apple", "is", "fruit"]
  ]
}
```

Response:
```json
{
  "error": "Missing required fields: ner, tfidf"
}
```

---

## How to Run
1. Install dependencies:
```
npm install cors
npm install express
```
2. Start the server:
``` 
npm start 
```
3. The server will run on http://localhost:5001.

---

## Notes
- The filtering logic ensures that triplets are included if they match **either** the NER list or the TF-IDF frequency threshold.
- The TF-IDF threshold is set to 0.5 by default.

## License
This project is licensed under the MIT License.