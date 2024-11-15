import { newCoversArray } from "./newArrayGenerator.js";

const cardsArray = document.querySelectorAll("div .card");

export function displayCardBack() {
  cardsArray.forEach((card) => {
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    card.appendChild(cardBack);
  });
}

export function displayCardFront() {
  let albumCovers = newCoversArray();
  let index = 0;

  cardsArray.forEach((card) => {
    const cardFront = document.createElement("div");
    const frontImg = document.createElement("img");
    cardFront.classList.add("card-front");

    frontImg.src = albumCovers[index];
    cardFront.dataset.name = albumCovers[index];
    cardFront.appendChild(frontImg);
    card.appendChild(cardFront);

    index++;
  });
}
