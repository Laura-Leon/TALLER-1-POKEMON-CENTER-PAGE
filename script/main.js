const current = document.querySelector('.gallery__current');
const thumbs = document.querySelectorAll('.gallery__thumb');

for(let i = 0; i < thumbs.length; i++) {
  const thumb = thumbs[i];

  function handleThumbClick () {
   
    const thumbSrc = thumb.getAttribute('data-src');
   
    current.setAttribute('src', thumbSrc);
  }

  thumb.addEventListener('click', handleThumbClick);

  
  if(i === 0) handleThumbClick();
}
//for interaction slider

const slider = document.querySelector(".interaction__slider");
const before = document.querySelector(".interaction__before");
const after = document.querySelector(".interaction__after");
const container = document.querySelector(".interaction__container");

const drags =(e)=>{
  let xPos = e.layerX;
  let size = container.offsetWidth;
  before.style.width = xPos + "px";
  slider.style.left = xPos + "px";

if(xPos < 50){
  before.style.width =0;
  slider.style.left = 0;
}

if(xPos + 30 >size){
  before.style.width =size + "px";
  slider.style.left = size + "px";
}

};

container.addEventListener("mousemove",drags);

