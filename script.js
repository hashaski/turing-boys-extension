/* const screenshotButton = document.getElementById('screenshot-button');

screenshotButton.addEventListener('click', () => {
  html2canvas(document.body).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    document.body.appendChild(img);
  });
}); */


var image = document.getElementById('full-image');
var canvas = document.getElementById('canvas')

//hidden or text inputs
var h_th_left = document.getElementById('thb_left')
var h_th_top = document.getElementById('thb_top')
var h_th_right = document.getElementById('thb_right')
var h_th_bottom = document.getElementById('thb_bottom')

var handleRadius = 10

var dragTL = dragBL = dragTR = dragBR = false;
var dragWholeRect = false;

var rect={}
var current_canvas_rect={}

var mouseX, mouseY
var startX, startY

var th_left = 504;
var th_top = 0;
var th_right = 3528;
var th_bottom = 3024;

var th_width = th_right - th_left;
var th_height = th_bottom - th_top;

var effective_image_width = 4032;
var effective_image_height = 3024;

//drawRectInCanvas() connected functions -- START
function updateHiddenInputs(){
  var inverse_ratio_w =  effective_image_width / canvas.width;
  var inverse_ratio_h = effective_image_height / canvas.height ;
  h_th_left.value = Math.round(rect.left * inverse_ratio_w)
  h_th_top.value = Math.round(rect.top * inverse_ratio_h)
  h_th_right.value = Math.round((rect.left + rect.width) * inverse_ratio_w)
  h_th_bottom.value = Math.round((rect.top + rect.height) * inverse_ratio_h)
}

function drawCircle(x, y, radius) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#c757e7";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawHandles() {
  drawCircle(rect.left, rect.top, handleRadius);
  drawCircle(rect.left + rect.width, rect.top, handleRadius);
  drawCircle(rect.left + rect.width, rect.top + rect.height, handleRadius);
  drawCircle(rect.left, rect.top + rect.height, handleRadius);
}


function drawRectInCanvas()
{
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = "6";
  ctx.fillStyle = "rgba(199, 87, 231, 0.2)";
  ctx.strokeStyle = "#c757e7";
  ctx.rect(rect.left, rect.top, rect.width, rect.height);
  ctx.fill();
  ctx.stroke();
  drawHandles();
  updateHiddenInputs()
}
//drawRectInCanvas() connected functions -- END

function mouseUp(e) {
  dragTL = dragTR = dragBL = dragBR = false;
  dragWholeRect = false;
}

//mousedown connected functions -- START
function checkInRect(x, y, r) {
  return (x>r.left && x<(r.width+r.left)) && (y>r.top && y<(r.top+r.height));
}

function checkCloseEnough(p1, p2) {
  return Math.abs(p1 - p2) < handleRadius;
}

function getMousePos(canvas, evt) {
  var clx, cly
  if (evt.type == "touchstart" || evt.type == "touchmove") {
    clx = evt.touches[0].clientX;
    cly = evt.touches[0].clientY;
  } else {
    clx = evt.clientX;
    cly = evt.clientY;
  }
  var boundingRect = canvas.getBoundingClientRect();
  return {
    x: clx - boundingRect.left,
    y: cly - boundingRect.top
  };
}

function mouseDown(e) {
  var pos = getMousePos(this,e);
  mouseX = pos.x;
  mouseY = pos.y;
  // 0. inside movable rectangle
  if (checkInRect(mouseX, mouseY, rect)){
      dragWholeRect=true;
      startX = mouseX;
      startY = mouseY;
  }
  // 1. top left
  else if (checkCloseEnough(mouseX, rect.left) && checkCloseEnough(mouseY, rect.top)) {
      dragTL = true;
  }
  // 2. top right
  else if (checkCloseEnough(mouseX, rect.left + rect.width) && checkCloseEnough(mouseY, rect.top)) {
      dragTR = true;
  }
  // 3. bottom left
  else if (checkCloseEnough(mouseX, rect.left) && checkCloseEnough(mouseY, rect.top + rect.height)) {
      dragBL = true;
  }
  // 4. bottom right
  else if (checkCloseEnough(mouseX, rect.left + rect.width) && checkCloseEnough(mouseY, rect.top + rect.height)) {
      dragBR = true;
  }
  // (5.) none of them
  else {
      // handle not resizing
  }
  drawRectInCanvas();
}
//mousedown connected functions -- END

function mouseMove(e) {    
  var pos = getMousePos(this,e);
  mouseX = pos.x;
  mouseY = pos.y;
  if (dragWholeRect) {
      e.preventDefault();
      e.stopPropagation();
      dx = mouseX - startX;
      dy = mouseY - startY;
      if ((rect.left+dx)>0 && (rect.left+dx+rect.width)<canvas.width){
        rect.left += dx;
      }
      if ((rect.top+dy)>0 && (rect.top+dy+rect.height)<canvas.height){
        rect.top += dy;
      }
      startX = mouseX;
      startY = mouseY;
  } else if (dragTL) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left+rect.width - mouseX)+Math.abs(rect.height + rect.top - mouseY))/2;
      if (newSide>150){
        rect.left = rect.left + rect.width - newSide;
        rect.top = rect.height + rect.top - newSide;
        rect.width = rect.height = newSide;
      }
  } else if (dragTR) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(mouseX-rect.left)+Math.abs(rect.height + rect.top - mouseY))/2;
      if (newSide>150){
          rect.top = rect.height + rect.top - newSide;
          rect.width = rect.height = newSide;
      }
  } else if (dragBL) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left+rect.width - mouseX)+Math.abs(rect.top - mouseY))/2;
      if (newSide>150)
      {
        rect.left = rect.left + rect.width - newSide;
        rect.width = rect.height = newSide;
      }
  } else if (dragBR) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left - mouseX)+Math.abs(rect.top - mouseY))/2;
      if (newSide>150)
      {
       rect.width = rect.height = newSide;
      }      
  }
  drawRectInCanvas();
}

function updateCurrentCanvasRect(){
  current_canvas_rect.height = canvas.height
  current_canvas_rect.width = canvas.width
  current_canvas_rect.top = image.offsetTop
  current_canvas_rect.left = image.offsetLeft
}

function repositionCanvas(){
  //make canvas same as image, which may have changed size and position
  canvas.height = image.height;
  canvas.width = image.width;
  canvas.style.top = image.offsetTop + "px";;
  canvas.style.left = image.offsetLeft + "px";
  //compute ratio comparing the NEW canvas rect with the OLD (current)
  var ratio_w = canvas.width / current_canvas_rect.width;
  var ratio_h = canvas.height / current_canvas_rect.height;
  //update rect coordinates
  rect.top = rect.top * ratio_h;
  rect.left = rect.left * ratio_w;
  rect.height = rect.height * ratio_h;
  rect.width = rect.width * ratio_w;
  updateCurrentCanvasRect();
  drawRectInCanvas();
}

function initCanvas(){
  canvas.height = image.height;
  canvas.width = image.width;
  canvas.style.top = image.offsetTop + "px";;
  canvas.style.left = image.offsetLeft + "px";
  updateCurrentCanvasRect();
}

function initRect(){
  var ratio_w = canvas.width / effective_image_width;
  var ratio_h = canvas.height / effective_image_height;
  //BORDER OF SIZE 6!
  rect.height = th_height*ratio_h-6
  rect.width = th_width*ratio_w-6
  rect.top = th_top*ratio_h+3
  rect.left = th_left*ratio_w+3
}

function init(){
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('touchstart', mouseDown);
  canvas.addEventListener('touchmove', mouseMove);
  canvas.addEventListener('touchend', mouseUp);
  initCanvas();
  initRect();
  drawRectInCanvas();
}

window.addEventListener('load',init)
window.addEventListener('resize',repositionCanvas)

//