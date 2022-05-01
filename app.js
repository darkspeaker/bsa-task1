const findBtn = document.querySelector('.btn-find-сharacters');
const сharacterContainer = document.querySelector('.сharacter-container');
const сharacterNameInput = document.querySelector('.сharacter-input');

const createCharacterNode = ({ fullName, title, imageUrl }) => {
  const container = document.createElement('div');
  container.classList.add('сharacter-card');

  const avatar = document.createElement('img');
  avatar.classList.add('сharacter-avatar');
  avatar.setAttribute('src', imageUrl);

  const bodyContainer = document.createElement('div');
  bodyContainer.classList.add('card-body');

  const fullNameItem = document.createElement('h4');
  fullNameItem.classList.add('сharacter-fullname');
  fullNameItem.innerText = `${fullName},`;

  const titleItem = document.createElement('h5');
  titleItem.classList.add('сharacter-title');
  titleItem.innerText = title;

  bodyContainer.append(fullNameItem);
  bodyContainer.append(titleItem);
  container.append(avatar, bodyContainer);
  return container;
}

const forwardRenderCharactersByFilter = async () => {
  сharacterContainer.replaceChildren();
  const сharacterNodes = [];
  const сharacters = await getCharacters(сharacterNameInput.value);
  for (const { fullName, imageUrl, title } of сharacters) {
    сharacterNodes.push(createCharacterNode({ fullName, imageUrl, title }));
  }
  сharacterContainer.append(...сharacterNodes);
}

findBtn.addEventListener('click', forwardRenderCharactersByFilter);

const getCharacters  = (сharacterNameInput = '') => {
  return fetch(`https://my-got-api.herokuapp.com/${сharacterNameInput}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

const renderAllHerous = async () =>{
  сharacterContainer.replaceChildren();
  const сharacterNodes = [];
  const сharacters = await getCharacters();
  for (const { fullName, imageUrl, title } of сharacters) {
    сharacterNodes.push(createCharacterNode({ fullName, imageUrl, title }));
  }
  сharacterContainer.append(...сharacterNodes);
}

const getAllCharacters  = () => {
  return fetch(`https://my-got-api.herokuapp.com/`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

window.addEventListener('DOMContentLoaded', () => {
  renderAllHerous();
});