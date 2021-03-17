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



