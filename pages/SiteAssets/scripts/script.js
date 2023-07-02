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

const submitPrompt = async () => {
  const prompt = document.getElementById("prompt").value;
  const response = await getAiResponse(prompt);
  document.getElementById("AIResponse").value = response;
};

const submitHandler = () => {
  const sendButton = document.getElementById("sendPrompt");
  sendButton.addEventListener("click", async () => {
    await submitPrompt();
  });
};

const init = () => {
  submitHandler();
};

window.onload = init();
