import { listGames, pranksPhrases } from './src/gamesList.js';
import getImage from './src/getImage.js';
import { whenType, buttonListGame } from './src/autoComplete.js';

const addGameButton = document.querySelectorAll('.add-game');
const luckyButton = document.querySelectorAll('.lucky-button');
let gamesList = [];
const removedGame = [];
const inputGameName = document.querySelectorAll('.game-name');
const listedGames = document.querySelectorAll('#listed-games');
const body = document.getElementsByTagName('body');

const removeElement = (elementClass, tagName, lengthSize, position) => {
  const parentElement = document.getElementById(elementClass);
  if (parentElement.getElementsByTagName(tagName).length === lengthSize) {
    parentElement.getElementsByTagName(tagName)[position].remove();
  }
}; // Remove a elementos ao clicar.

const drawGames = (param) => {
  const luckyGame = param[Math.floor(Math.random() * param.length)];
  return luckyGame;
}; // Sorteia os jogos adicionados.

const addLuckyGameToScreen = () => {
  loading();
  setTimeout(() => {
    removeElement('main', 'span', 1, 0);
    createElement('div', 'sweepstakes-winner', 'main');
    createElement('p', 'lucky-game', 'sweepstakes-winner');
    document.querySelector('.lucky-game').innerText = drawGames(gamesList);
    luckyGameImg();
    removeElement('main', 'div', 3, 2);
  }, 1000);
}; // Adiciona a string referente ao game sorteado.

const luckyGameImg = () => {
  removeElement('sweepstakes-winner', 'img', 1, 0);
  createElement('img', 'game-image', 'sweepstakes-winner');
  const imgElement = document.querySelector('.game-image');
  const gameName = document.querySelector('.lucky-game').innerHTML.toLowerCase().replaceAll(' ', '');
  const gameImage = getImage(listGames, gameName);
  console.log(gameName);
  if (gameImage !== false) {
    imgElement.setAttribute('src', gameImage);
    removeElement('sweepstakes-winner', 'p', 2, 0);
    document.querySelector('.lucky-game').innerText = drawGames(pranksPhrases);
  } else {
    imgElement.setAttribute('alt', 'Não foi possível encontrar a imagem!');
  }
}; // Vincula a string sorteada a uma imagem;

const addGameElement = () => {
  const inputValue = document.querySelector('.game-name').value;
  getGameElements();
  document.querySelector('.lucky-button').disabled = false;
  const gameList = document.getElementsByClassName('game-list');
  const game = document.createElement('li');
  game.innerText = inputValue;
  game.className = 'game';
  gameList[0].appendChild(game);
  document.querySelector('.game-name').value = '';
  events(document.querySelectorAll('.game'), 'click', removeLiElement);
  document.querySelector('.add-game').disabled = true;
}; // Cria e adiciona uma li à gameList, quando criada, habilita o lucky-button.
// Obs. events excluindo li quando clicada.

function removeLiElement(event) {
  event.target.remove();
  const getClickedElement = event.target;
  removedGame.push(getClickedElement.textContent);
  const gameListAfterRemoval = gamesList.filter((item) => !removedGame.includes(item));
  gamesList = gameListAfterRemoval;
  if (document.querySelectorAll('.game').length === 0) {
    document.querySelector('.lucky-button').disabled = true;
  }
} // Remove elemento e a string da gameList quando clicado.

const getGameElements = () => {
  const inputValue = document.querySelector('.game-name').value;
  gamesList.push(inputValue);
}; // Pega o jogo digitado no inputText e adiciona à gameList;

const createElement = (element, classandID, elementParentId) => {
  const elementType = document.createElement(element);
  elementType.classList.add(classandID);
  elementType.setAttribute('id', classandID);
  const parent = document.getElementById(elementParentId);
  parent.appendChild(elementType);
};

const buttonUnable = () => {
  const inputValue2 = document.querySelector('.game-name').value;
  if (inputValue2.length !== 0) {
    document.querySelector('.add-game').disabled = false;
  } else {
    document.querySelector('.add-game').disabled = true;
  }
};

const events = (element, eventType, param) => {
  element.forEach((item) => {
    item.addEventListener(eventType, param);
  });
};

const loading = () => {
  if (document.getElementsByTagName('div').length === 1) {
    createElement('span', 'loading', 'main');
  } else {
    removeElement('main', 'div', 2, 1);
    createElement('span', 'loading', 'main');
  }
};

window.whenType = whenType;

events(luckyButton, 'click', addLuckyGameToScreen);
events(addGameButton, 'click', addGameElement);
events(inputGameName, 'keyup', buttonUnable);
events([...body], 'click', buttonListGame);

export { events, createElement, buttonUnable };
