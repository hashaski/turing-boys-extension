import getAiResponse from "./api.js";

// const screenshotButton = document.getElementById('screenshot-button');

// screenshotButton.addEventListener('click', () => {
//   html2canvas(document.body).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const img = new Image();
//     img.src = imgData;
//     document.body.appendChild(img);
//   });
// });

const AIResponse = document.getElementById("AIResponse");
let undo = [];
let redo;
const sendButton = document.getElementById("sendPrompt");
const spinner = document.getElementById("spinner");
const sendImg = document.getElementById("sendImg");

const submitPrompt = async () => {
  const prompt = document.getElementById("prompt");
  sendImg.hidden = true;
  spinner.hidden = false;
  const response = await getAiResponse(prompt.value);
  sendImg.hidden = false;
  spinner.hidden = true;

  AIResponse.value = response;
  prompt.value = "";
  undo.push(response);
  undo.length > 2 ? undo.pop() : null;
};

const submitHandler = () => {
  sendButton.addEventListener("click", async () => {
    await submitPrompt();
  });
};

const copyHandler = () => {
  const copyButton = document.getElementById("copy");
  copyButton.addEventListener("click", () => copyText());
};

const copyText = () => {
  const text = document.getElementById("prompt-cima");

  text.select();

  navigator.clipboard.writeText(text.value);
};

const undoButtonHandler = () => {
  document.getElementById("undoButton").addEventListener("click", () => {
    if (!!undo.length) {
      redo = AIResponse.value;
      AIResponse.value = undo.shift();
    }
  });
};

const redoButtonHandler = () => {
  document.getElementById("redoButton").addEventListener("click", () => {
    undo.push(AIResponse.value);
    undo.length > 2 ? undo.pop() : null;
    AIResponse.value = redo;
  });
};

const init = () => {
  submitHandler();
  copyHandler();
  undoButtonHandler();
  redoButtonHandler();
};

window.onload = init();
