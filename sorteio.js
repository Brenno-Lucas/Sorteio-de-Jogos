const addGameButton = document.querySelectorAll('.add-game');
const luckyButton = document.querySelectorAll(".lucky-button");
let gamesList = [];
const removedGame = [];
const inputGameName = document.querySelectorAll('.game-name');
const pranksPhrases = ['Can play this', 'I allow !', 'Try to play !', 
'Go there ! "Have a good time"','Do you really know how to play this?',
'I would have fun watching you lose', 'I doubt it!', 'You can !?'];
const images = {
    leagueoflegends: './img/lol.png',
    trine3: './img/trine.jpg',
    civilization6: './img/civilization.jpg',
    ageofempiresii: './img/ageofempiresII.jpg',
    ageofempiresiv: './img/ageofempiresIV.jpg',
    fallguys: './img/fallguys.jpg',
    heroesofstorm: './img/heroesofstorm.jpeg',
    rainbowsixsiege: './img/rainbowSixSiege.jpg',
    forzahorizon5: './img/forza5.jpg',
    haloinfinite: './img/haloinfinite.jpg',
    fortnite: './img/fortnite.jpg',
    csgo: './img/csgo.jpg',
    valorant: './img/valorant.jpg'
}

const removeElement = (elementClass, tagName, lengthSize, position) => {
    const parentElement = document.getElementById(elementClass);
    if(parentElement.getElementsByTagName(tagName).length === lengthSize)
    return parentElement.getElementsByTagName(tagName)[position].remove();
} // remove a elementos ao clicar para fazer o sorteio novamente.

const drawGames = (param) => {
    const luckyGame = param[Math.floor(Math.random() * param.length)];
    return luckyGame
} // sorteia os jogos adicionados.

const addLuckyGameToScreen = () => {
    loading()
    setTimeout(() => {
        removeElement('main', 'span', 1, 0)
        createElement('div', 'sweepstakes-winner', 'main');
        createElement('p', 'lucky-game', 'sweepstakes-winner');
        document.querySelector(".lucky-game").innerText = drawGames(gamesList);
        luckyGameImg();
        removeElement('main', 'div', 3, 2)
    }, 1000)
} // adiciona a string referente ao game sorteado.

const luckyGameImg = () => {
    removeElement('sweepstakes-winner', 'img', 1, 0)
    createElement('img', 'game-image', 'sweepstakes-winner')
    const imgElement = document.querySelector('.game-image');
    let gameName = document.querySelector(".lucky-game").innerHTML.toLowerCase().replaceAll(' ', '');
    if (Object.hasOwnProperty.call(images, gameName)) {
        imgElement.setAttribute('src', images[gameName])
        removeElement('sweepstakes-winner', 'p', 2, 0)
        document.querySelector(".lucky-game").innerText = drawGames(pranksPhrases);
    } else {
        imgElement.setAttribute('alt', 'Não foi possível encontrar a imagem!')
    }
} // vincula a string sorteada a uma imagem;

const addGameElement = () => { 
    const inputValue = document.querySelector('.game-name').value;
    getGameElements()
    document.querySelector(".lucky-button").disabled = false;
    const gameList = document.getElementsByClassName('game-list');
    const game = document.createElement('li');
    game.innerText = inputValue;
    game.className = 'game';
    gameList[0].appendChild(game);
    document.querySelector('.game-name').value = '';
    events(document.querySelectorAll('.game'), 'click',  removeLiElement)
    document.querySelector('.add-game').disabled = true;
} // Cria e adiciona uma li à gameList, quando criada, habilita o lucky-button. Obs. events excluindo li quando clicada.

function removeLiElement(event) {
    event.target.remove();
    const getClickedElement = event.target;
    removedGame.push(getClickedElement.textContent)
    const gameListAfterRemoval = gamesList.filter((item) => !removedGame.includes(item));
    gamesList = gameListAfterRemoval;
} // remove elemento e a string da gameList quando clicado.

const getGameElements = () => {
    const inputValue = document.querySelector('.game-name').value;
    gamesList.push(inputValue);
} // Pega o jogo digitado no inputText e adiciona à gameList;

const createElement = (element, classandID, elementParentId) => {
    const elementType = document.createElement(element);
    elementType.classList.add(classandID);
    elementType.setAttribute('id', classandID);
    const parent = document.getElementById(elementParentId);
    parent.appendChild(elementType);
}

const buttonUnable = () => {
    const inputValue2 = document.querySelector('.game-name').value;
    if (inputValue2.length !== 0) {
        document.querySelector('.add-game').disabled = false;
    } else {
        document.querySelector('.add-game').disabled = true;
    }
}

const events = (element, eventType, param) => {
    element.forEach(item => {
    item.addEventListener(eventType, param);
  }); 
}

const loading = () => {
    if (document.getElementsByTagName('div').length === 1) {
        createElement('span', 'loading', 'main');
    } else {
        removeElement('main', 'div', 2, 1)
        createElement('span', 'loading', 'main');
    }
}

events(luckyButton, 'click', addLuckyGameToScreen);
events(addGameButton,'click', addGameElement);
events(inputGameName, 'keyup', buttonUnable)
