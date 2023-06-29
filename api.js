require('dotenv').config();

const API_KEY = process.env.API_KEY;

fetch("https://api.ai21.com/studio/v1/j2-mid/complete", {
  headers: {
    "Authorization": API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "prompt": "",
      "numResults": 1,
      "maxTokens": 200,
      "temperature": 0.7,
      "topKReturn": 0,
      "topP":1,
      "countPenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "frequencyPenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "presencePenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "stopSequences":[]
    }),
  method: "POST"
});