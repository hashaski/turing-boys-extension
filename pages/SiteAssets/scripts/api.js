const getAiResponse = async (prompt) => {
  console.log("api.js loaded");
  let aiResponse = "";
  // require("dotenv").config({ path: "../../../.env" });

  // const API_KEY = process.env.API_KEY;

  const options = {
    headers: {
      Authorization: "Bearer <API_key>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      numResults: 1,
      maxTokens: 200,
      temperature: 0.7,
      topKReturn: 0,
      topP: 1,
      countPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      frequencyPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      presencePenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      stopSequences: [],
    }),
    method: "POST",
  };

  await fetch("https://api.ai21.com/studio/v1/j2-mid/complete", options)
    .then((response) => response.json())
    .then((response) => (aiResponse = response.completions[0].data.text))
    .catch((err) => console.error(err));

  return aiResponse;
};

export default getAiResponse;
