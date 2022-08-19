const getImage = (list, researchedGame) => {
  const gameSearch = list.find((gameObj) => gameObj.search
    .find((search) => search === researchedGame) === researchedGame);
  return gameSearch !== undefined && gameSearch.image;
}; // Recebe uma string com o nome do jogo, retorna uma string referente a sua imagem.

export default getImage;
