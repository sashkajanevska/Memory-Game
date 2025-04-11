const albumCovers = [
  "images/_Aerosmith.png",
  "images/_DireStraits.png",
  "images/_FleetwoodMac.png",
  "images/_GreenDay.png",
  "images/_GunsNRoses.png",
  "images/_JeffersonAirplane.png",
  "images/_JimiHendrixExperience.png",
  "images/_LedZeppelin.png",
  "images/_Oasis.png",
  "images/_PinkFloyd.png",
  "images/_TheBeatles.png",
  "images/_TheDoors.png",
];

export function newCoversArray() {
  const coversFullList = [...albumCovers, ...albumCovers];
  const listLength = coversFullList.length;
  let newArray = [];

  for (let i = 0; i < listLength; i++) {
    let randomIndex = Math.floor(Math.random() * coversFullList.length);
    let splicedItem = coversFullList.splice(randomIndex, 1);
    newArray.push(splicedItem);
  }
  let result = newArray.flat();
  return result;
}
