import getAiResponse from "./api.js";

// script.js (service worker)
const screenshotButton = document.getElementById('screenshot-button');
const confirmButton = document.getElementById('confirm-button');
const capturedImage = document.getElementById('captured-image');
const trimmedImage = document.getElementById('trimmed-image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let captureDataUrl = '';

screenshotButton.addEventListener('click', () => {
  chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
    captureDataUrl = dataUrl;
    capturedImage.src = captureDataUrl;
    capturedImage.style.display = 'flex';
    canvas.style.display = 'none';
    confirmButton.style.display = 'none';
  });
});

capturedImage.addEventListener('load', () => {
  canvas.width = capturedImage.width;
  canvas.height = capturedImage.height;
  ctx.drawImage(capturedImage, 0, 0);

  screenshotButton.style.display = 'none';
  capturedImage.style.display = 'block';
  canvas.style.display = 'block';
  confirmButton.style.display = 'block';
});

confirmButton.addEventListener('click', () => {
  const trimDataUrl = canvas.toDataURL('image/png');
  trimmedImage.src = trimDataUrl;
  trimmedImage.style.display = 'block';
  capturedImage.style.display = 'none';
  canvas.style.display = 'none';
  confirmButton.style.display = 'none';

  // Further processing or sending the trimmed image
});

// IA Prompts 
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
