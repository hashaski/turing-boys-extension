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

function getSelected(info) {
  console.log(info.selectionText + " is being explored.");
  document.getElementById("prompt-cima").value = info.selectionText;
}

chrome.contextMenus.create({
  title: "Explore: \"%s\"", 
  contexts:["selection"], 
  onclick: getSelected
});

var input = document.getElementById("prompt");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("sendPrompt").click();
  }
});

window.onload = init();
