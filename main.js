import ColorThief from 'colorthief/dist/color-thief.modern.mjs';
import './style.css';

const container = document.querySelector('#app');
const colorThief = new ColorThief();

const num = () => Math.floor(Math.random() * 1084 + 1)

const getImage = () => {
  container.innerHTML = ''


  const div = document.createElement('div')

  // crea la imagen
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = `https://picsum.photos/id/${num()}/400`;
  img.classList.add('imagen');

  div.append(img);
  container.append(div);

  // Escucha si la imagen no se carga y obtiene una nueva imagen
  img.addEventListener('error', getImage)

  // Inicia proceso colorThief con la imagen cargada correctamente
  img.addEventListener('load', () => {

    // obtiene el color dominante y cambia el background del body
    const [r, g, b] = colorThief.getColor(img);
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

    // obtiene los colores de la paleta
    const palette = colorThief.getPalette(img);

    const boxContainer = document.createElement('div');
    boxContainer.classList.add('box-container');

    container.append(boxContainer);

    // crea los cuadros de la paleta de colores
    palette.map(box => {
      const div = document.createElement('div');
      div.classList.add('box');

      const [r, g, b] = box;
      div.style.backgroundColor = `rgb(${r},${g},${b})`;

      boxContainer.append(div);

      // detecta cuando el puntero del mouse entra a los cuadros
      // de la paleta y cambia el background del body
      div.addEventListener('mouseenter', () => {
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
      });
      div.addEventListener('click', () => {
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
      });
    });

  });

  // detecta el click en la imagen y genera una nueva
  img.addEventListener('click', getImage)
}

// Carga la primera imagen cuando la carga del DOM esta compeltada
document.addEventListener('DOMContentLoaded', getImage)