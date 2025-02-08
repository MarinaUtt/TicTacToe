const gameZone = document.querySelector('.gamezone');
const tableZone = document.querySelector('.tablezone');
const cells = document.querySelectorAll('.cell');
const player1Title = document.querySelector('.player1');
const player2Title = document.querySelector('.player2');
const point1 = document.querySelector('.point1');
const point2 = document.querySelector('.point2');

const inputBlock = document.querySelector('.input-block');
const labelInput = document.querySelector('.label-input');
const inputName = document.querySelector('.input-name');
const buttonName = document.querySelector('.add-name');


let player = 'player1';
let winner = '';
let playerGame1 = '';
let playerGame2 = '';
let fillUp = [];
let line = 9;

const optionsWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

class Game{
  constructor(player){
    this.player = player;
  }

  renderSymbol() {
    if (this.player == 'player1') {
      element.textContent = 'X';
      player1Title.classList.remove('curret-player');
      player2Title.classList.add('curret-player');
      player = 'player2';
    } else {
      element.textContent = 'O';
      player2Title.classList.remove('curret-player');
      player1Title.classList.add('curret-player');
      player = 'player1'; 
    }
  }
    
  checkwin() {
    for (let i = 0; i < optionsWin.length; i++) {
      if (cells[optionsWin[i][0]].textContent == 'X' && cells[optionsWin[i][1]].textContent == 'X' && cells[optionsWin[i][2]].textContent == 'X') {
        winner = 'player1';
        line = i;
      }
      if (cells[optionsWin[i][0]].textContent == 'O' && cells[optionsWin[i][1]].textContent == 'O' && cells[optionsWin[i][2]].textContent == 'O') {
        winner = 'player2';
        line = i;
      }
    }

    for (let i = 0; i < cells.length; i++) {
      fillUp[i] = (!!cells[i].textContent);
    }
    let deadHeat = fillUp.every(elem =>{
      return elem == true;
    })
    if (!!deadHeat) {
      alert('Ничья');
      cells.forEach((item) => {
        item.textContent = '';
      })
    }   
  }
 
  renderline (){
    if (line < 2) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.add('line-gorizont'); 
      }
    }
    if (2 < line && line < 6) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.add('line-vertical'); 
      }
    }
    if (line == 6) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.add('line-diagonal1'); 
      }
    }
    if (line == 7) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.add('line-diagonal2'); 
      }
    }
  }

newRound() {
    if (winner == 'player1') {
      point1.textContent = parseInt (point1.textContent) + 1;
      player2Title.classList.remove('curret-player');
      player1Title.classList.add('curret-player');
    }
    if (winner == 'player2') {
      point2.textContent = parseInt (point2.textContent) + 1;
      player1Title.classList.remove('curret-player');
      player2Title.classList.add('curret-player');
    }
    cells.forEach((item) => {
        item.textContent = '';
      })
    player = winner;
    if (line < 2) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.remove('line-gorizont'); 
      }
    }
    if (2 < line && line < 6) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.remove('line-vertical'); 
      }
    }
    if (line == 6) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.remove('line-diagonal1'); 
      }
    }
    if (line == 7) {
      for (let j = 0; j < 3; j++) {
        cells[optionsWin[line][j]].classList.remove('line-diagonal2'); 
      }
    }
  }  
}

class Players {
  constructor(name) {
    this.name = name; 
  }
  
  messageVictory(){
    alert(`В этом раунде победил Игрок - ${this.name}`);
  }
}

buttonName.addEventListener('click', function(event) {
  event.preventDefault();
  if (!!player1Title.textContent) {
    playerGame2 = new Players(inputName.value)
    player2Title.textContent = inputName.value + '(O)';
    inputBlock.style.display = "none";
    gameZone.style.display = "flex";
  } else {
    playerGame1 = new Players(inputName.value)
    player1Title.textContent = inputName.value + '(X)';
    labelInput.textContent = 'Введите имя Игрока 2';
    inputName.value = '';
 }
})

tableZone.addEventListener('click', function(event) {
  element = event.target;
  if (element.textContent == '') {
    const step = new Game(player);
    step.renderSymbol();
    step.checkwin();
    if (!!winner) {
      step.renderline();
      setTimeout(() => 
        victory(),1000);
      }
  function victory() {
    if (winner == 'player1') {
      playerGame1.messageVictory();
    } 
    if (winner == 'player2') {
      playerGame2.messageVictory();
    }
    step.newRound();
    winner = '';
    line = 9;  
    }
  }
})


