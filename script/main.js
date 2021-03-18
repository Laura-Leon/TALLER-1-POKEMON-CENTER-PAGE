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
  before.style.width = xPos + "px";



};

container.addEventListener("mousemove",drags);
