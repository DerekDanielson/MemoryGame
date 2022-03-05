const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCard = 0;
let clickShallNot = false;

const COLORS = [
  "lime",
  "blue",
  "fuchsia",
  "cyan",
  "indigo",
  "lime",
  "blue",
  "fuchsia",
  "cyan",
  "indigo"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if(clickShallNot) return;
  if(e.target.classList.contains('flipped')) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if(card1 && card2) {
    clickShallNot = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if(gif1 === gif2) {
      flippedCard += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      clickShallNot = false;
    } else{
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        clickShallNot = false;
      }, 500);
    }
  }

  if(flippedCard === COLORS.length) 
  setTimeout(function() { 
    alert('Awesome!'); }, 250);
}

createDivsForColors(shuffledColors);


