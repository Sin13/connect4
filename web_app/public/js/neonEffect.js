/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable implicit-arrow-linebreak */

// attribute: "Neon text flicker glow" by "Johan Girod" on https://codepen.io/ganceab/pen/YZvKLQ
const targets = window.document.getElementsByClassName('neon');

const flickerLetter = (letter) =>
  `<span style="animation: text-flicker-in-glow ${
    Math.random() * 4
  }s linear both ">${letter}</span>`;

const colorLetter = (letter) =>
  `<span style="color: hsla(${Math.random() * 360}, 100%, 80%, 1);">${letter}</span>`;

const flickerAndColorText = (text) => text.split('').map(flickerLetter).map(colorLetter).join('');

const neonGlory = (target) => (target.innerHTML = flickerAndColorText(target.textContent));

Array.from(targets).forEach((target) => {
  neonGlory(target);
  target.onclick = ({ target }) => neonGlory(target);
});
