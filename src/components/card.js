const cardTemplate = document.querySelector('#card-template').content;

const createCard = (card, deleteCard, likeCard, openFullImage, ownerId) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeader = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  if (ownerId !== card.owner._id) {
    deleteButton.classList.add('card__delete-button_hidden');
  } else {
    deleteButton.addEventListener('click', (evt) => {
      deleteCard(card._id);
      const deleteButton = evt.currentTarget;
      const deletedCard = deleteButton.closest('.card');
      deletedCard.remove();
    });
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardHeader.textContent = card.name;
  likeCounter.textContent = card.likes.length;
  if (card.likes.includes(ownerId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => openFullImage(card));
  likeButton.addEventListener('click', likeCard);

  return cardElement;
};

const likeCard = (evt) => {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, likeCard };
