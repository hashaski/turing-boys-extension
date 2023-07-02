require('dotenv').config();

const API_KEY = process.env.API_KEY;

const makePrompt = (textTop, textBottom) => {
  return textTop + '\n Considering the text above, answer the following question:\n' + textBottom;
};


//TODO: get text from placeholder or any other way
function getTextByPlaceholder(textWithin) {
  const elements = document.querySelectorAll('[placeholder="' + textWithin + '"]');
  if (elements.length > 0) {
    return elements[0].textContent;
  }
  return null;
}

// makePrompt(getTextByPlaceholder('Write a text or simply take an Screenshot!'), getTextByPlaceholder('Ask your question here!'))

async function getIAResponse() {
  const response = await fetch("https://api.ai21.com/studio/v1/j2-mid/complete", {
    headers: {
      "Authorization": "Bearer " + API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "prompt": '"Objetivo e a importância da Lei do Feminicídio Em razão dos altíssimos índices de crimes cometidos contra as mulheres que fazem o Brasil assumir o quinto lugar no ranking mundial da violência contra a mulher, há a necessidade urgente de leis que tratem com rigidez tal tipo de crime. Dados do Mapa da Violência revelam que, somente em 2017, ocorreram mais de 60 mil estupros no Brasil. Além disso, a nossa cultura ainda se conforma com a discriminação da mulher por meio da prática, expressa ou velada, da misoginia e do patriarcalismo. Isso causa a objetificação da mulher, o que resulta, em casos mais graves, no feminicídio. A imensa quantidade de crimes cometidos contra as mulheres e os altos índices de feminicídio apresentam justificativas suficientes para a implantação da lei 13.104/15. Além disso, são necessárias políticas públicas que promovam a igualdade de gênero por meio da educação, da valorização da mulher e da fiscalização das leis vigentes." \n Me explique o texto acima.',
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
  
  const jsonData = await response.json();
  const aiResponse = jsonData.completions[0].data.text;
  return aiResponse;
}

