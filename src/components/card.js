const cardTemplate = document.querySelector('#card-template').content;

const createCard = (card, removeCard, likeCard, openFullImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeader = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardHeader.textContent = card.name;

  cardImage.addEventListener('click', () => openFullImage(card));
  deleteButton.addEventListener('click', removeCard);
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
