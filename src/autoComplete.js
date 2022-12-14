import { listGames } from './gamesList.js';
import { events, createElement, buttonUnable } from '../sorteio.js';

const addGameTabSearchOnInput = (event) => {
  const getClickedElement = event.target;
  const gameResearched = getClickedElement.textContent;
  const inputGameName = document.getElementById('game-name');
  inputGameName.value = gameResearched;
  document.getElementById('searchTab').remove();
  buttonUnable();
}; // Preenche o campo de pesquisa com a string clicada.

const createSearchTab = (obj) => {
  if (document.getElementById('searchTab') !== null) {
    document.getElementById('searchTab').remove();
  }
  createElement('ul', 'searchTab', 'section-addgame');
  obj.map(({ name }) => {
    createElement('li', 'researchedGame', 'searchTab');
    const gamesElement = document.querySelectorAll('#researchedGame');
    const lastGameElement = [...gamesElement].slice(-1)[0];
    lastGameElement.innerText = name;
    return lastGameElement;
  });
  events(document.querySelectorAll('#researchedGame'), 'click', addGameTabSearchOnInput);
}; // Recebe um objeto e retorna uma lista com os nomes.

const whenType = ({ target }) => {
  const { value } = target;
  if (value.length !== 0) {
    const gameName = listGames.filter((item) => {
      const names = item.name.toLowerCase().replaceAll(' ', '');
      return names.includes(value.toLowerCase().replaceAll(' ', ''));
    });
    createSearchTab(gameName);
  } else {
    return document.getElementById('searchTab').remove();
  }
}; // captura o valor do input quando digitado e compara com os nomes dos jogos.

const buttonListGame = ({target}) => {
  const inputValue = document.getElementById('game-name').value;
  const searchTab = document.getElementById('searchTab');
  if ( target !== document.getElementById('listed-games')) {
    searchTab !== null && (searchTab.remove());
} else {
  if (searchTab === null) {
    const gameName = listGames.filter((item) => {
      const names = item.name.toLowerCase().replaceAll(' ', '');
      return names.includes(inputValue.toLowerCase().replaceAll(' ', ''));
    });
    createSearchTab(gameName);
    } else {
      return searchTab.remove();
    }
}
};

export { whenType, buttonListGame };
