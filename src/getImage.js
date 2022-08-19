const getImage = (list, researchedGame) => {
  const gameSearch = list.find((gameObj) => gameObj.search
    .find((search) => search === researchedGame) === researchedGame);
  return gameSearch !== undefined && gameSearch.image;
}; // Recebe uma string com o nome do jogo, retorna uma string referente a sua imagem.

const whenType = ({ target }, obj) => {
  const { value } = target;
  const gameName = obj.filter((item) => {
    const names = item.name.toLowerCase().replaceAll(' ', '');
    return names.includes(value.toLowerCase().replaceAll(' ', ''));
  });
  return gameName;
  // console.log(`Jogo Filtrado = ${gameName.map((item) => item.name)}`);
};// captura o valor do input quando digitado.

export { getImage, whenType };
