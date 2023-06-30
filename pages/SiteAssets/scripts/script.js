// const screenshotButton = document.getElementById('screenshot-button');

// screenshotButton.addEventListener('click', () => {
//   html2canvas(document.body).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const img = new Image();
//     img.src = imgData;
//     document.body.appendChild(img);
//   });
// });


const teste=()=>{
  const teste = document.getElementById('teste');

  teste.addEventListener('click',()=>{
  console.log("aaaaaaaaa")
  })

}


const init = () => {
  teste()
}


window.addEventListener('load',()=>{init()})


  