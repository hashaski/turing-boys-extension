import getAiResponse from "./api.js";

/* const screenshotButton = document.getElementById('screenshot-button');

screenshotButton.addEventListener('click', () => {
  html2canvas(document.body).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    document.body.appendChild(img);
  });
}); */

/* const takescreenshot = function() {
    const injectElement = document.createElement('div');
    injectElement.classname = 'select_area'
    injectElement.innerHTML = {/* <img id="full-image" src="x.png" alt="Full Image" class="select_area">
    <canvas id="canvas" ></canvas>
    <input type="hidden" id="thb_left">
    <input type="hidden" id="thb_top">
    <input type="hidden" id="thb_right">
    <input type="hidden" id="thb_bottom">
    <script src="screenshot.js"></script> };
    document.body.appendChild(injectElement);
  }  */

// script.js (service worker)
const screenshotButton = document.getElementById('screenshot-button');

screenshotButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const tabId = activeTab.id;

    // Inject HTML and CSS
    chrome.scripting.executeScript({
      target: { tabId },
      function: () => {
        const injectElement = document.createElement('div');
        injectElement.id = 'select-area';
        injectElement.className = 'select-area';
        injectElement.innerHTML = `
          <img id="full-image" src="capture.png" alt="Full Image" class="select_area">
          <canvas id="canvas"></canvas>
          <input type="hidden" id="thb_left">
          <input type="hidden" id="thb_top">
          <input type="hidden" id="thb_right">
          <input type="hidden" id="thb_bottom">
        `;
        document.body.appendChild(injectElement);

        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
          .select_area {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9998;
            
          }
        
          .full-image {
            opacity: 0.2;
          }
        
          #canvas {
            opacity: 0.7;
            z-index: 9999;
          }
        `;
        document.head.appendChild(styleElement);
      },
    });

    // Execute screenshot.js
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['pages/scripts/screenshot.js'],
    });
  });
});







/* <img id="full-image" src="x.png" alt="Full Image" class="select_area">
  <canvas id="canvas" ></canvas>
  <input type="hidden" id="thb_left">
  <input type="hidden" id="thb_top">
  <input type="hidden" id="thb_right">
  <input type="hidden" id="thb_bottom">
  <script src="screenshot.js"></script> */

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
