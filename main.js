import './style.css'
import ColorThief from 'colorthief/dist/color-thief.modern.mjs'


const container = document.querySelector('#app');
const colorThief = new ColorThief();
const img = new Image();

container.appendChild(img);

img.addEventListener('load', function() {
  const [r,g,b] = colorThief.getColor(img);
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`
});

img.crossOrigin = 'Anonymous';
img.src = 'https://picsum.photos/200/300'