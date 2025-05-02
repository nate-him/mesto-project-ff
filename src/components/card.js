const cardTemplate = document.querySelector('#card-template').content;

const createCard = (card, removeCard, likeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardHeader = cardElement.querySelector('.card__title');
  cardHeader.textContent = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  return cardElement;
};

const deleteCard = (evt) => {
  const deleteButton = evt.currentTarget;
  const card = deleteButton.closest('.card');
  card.remove();
};

const likeCard = (evt) => {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, likeCard };
