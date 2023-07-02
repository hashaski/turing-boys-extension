console.log("api.js loaded")

require('dotenv').config({ path: '../../../.env'});

const API_KEY = process.env.API_KEY;

const options = {
  headers: {
    "Authorization": API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "prompt":"Femicide or feminicide is a hate crime which is broadly defined as 'the intentional killing of women or girls because they are female', with definitions varying based on cultural context. In 1976, the feminist author Diana E. H. Russell first defined the term as 'the killing of females by males because they are female.' A spouse or partner is responsible in almost 40% of homicides involving a female victim.[1] Additionally, femicide may be underreported.[2] Femicide often includes domestic violence and forced or sex-selective abortions.[3]\n According to the text above, What is often included in femicide?",
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
}


fetch('https://api.ai21.com/studio/v1/j2-mid/complete', options)
  .then(response => response.json())
  .then(response => console.log(response.completions[0].data.text))
  .catch(err => console.error(err));