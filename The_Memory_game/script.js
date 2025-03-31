const emojis = [
  "🐢", "🦉", "🐬", "🦘", "🦩",  
  "🍕", "🍉", "🍩", "🥑", "🍵",  
  "🚀", "🚲", "🚂", "🚁", "🛶",  
  "🎸", "🎨", "🎭", "🎷", "🎻",  
  "🔧", "💻", "📱", "🖨", "🔋",  
  "🏀", "⚽", "🎮", "🎯", "🏓",  
  "🌪", "🌈", "❄", "🔥", "🌊",  
  "🎩", "🕶", "⌚", "🎒", "💡",  
  "❤️", "☢", "⚡", "💲", "🔔"
];

let firstCard = null;
let secondCard = null;
const winMessage = document.querySelector('.win-message');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;
  const board = document.getElementById('board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${width}, 100px)`;
  board.style.gridTemplateRows = `repeat(${height}, 100px)`;
  const shuffledEmojis = shuffleArray(emojis).slice(0, (width * height) / 2);
  const duplicatedEmojis = shuffledEmojis.concat(shuffledEmojis);

  const gameEmojis = shuffleArray(duplicatedEmojis);

  duplicatedEmojis.forEach((emoji) => {
    const card = document.createElement('div');
    const emojiElement = document.createElement('span');
    emojiElement.textContent = emoji;
    emojiElement.style.visibility = 'hidden';
    card.appendChild(emojiElement);
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => {
      flipCard(card, emojiElement);
    });
    board.appendChild(card);
  });
  resetGame();
}


function flipCard(card, emoji) {
if (card === firstCard || card.classList.contains('flipped')) {
  return;
}
  card.classList.add('flipped');
setTimeout(() => {
  emoji.style.visibility = 'visible';
}, 300);

if (firstCard === null) {
  firstCard = card;
} else {
  secondCard = card;
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.style.backgroundColor = 'rgb(82, 171, 82)';
    secondCard.style.backgroundColor = 'rgb(82, 171, 82)';
    firstCard = null;
    secondCard = null;
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      setTimeout
      firstCard.querySelector('span').style.visibility = 'hidden';
      secondCard.querySelector('span').style.visibility = 'hidden';
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
}
winGameCheck();
}

function resetGame() {
  firstCard = null;
  secondCard = null;
  winMessage.classList.remove('show');
}

function winGameCheck() {
  const cards = document.querySelectorAll('.card');
  let won = true;
  cards.forEach((card) => {
    if (!card.classList.contains('flipped')) {
      won = false;
    }
  });
  if (won) {
    setTimeout(() => {
      winMessage.classList.add('show');
  }, 1000);
  }
}

document.getElementById('startButton').addEventListener('click', startGame);