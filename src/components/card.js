const cardTemplate = document.querySelector('#card-template').content;

const createCard = (
  card,
  deleteCard,
  likeCard,
  unlikeCard,
  openFullImage,
  ownerId
) => {
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
      const deleteButton = evt.currentTarget;
      const deletedCard = deleteButton.closest('.card');

      deleteCard(card._id)
        .then((data) => {
          if ((data.message = 'Пост удалён')) {
            deletedCard.remove();
          }
        })
        .catch((err) => console.log(err));
    });
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardHeader.textContent = card.name;
  updateLikes(card, likeButton, likeCounter, ownerId);

  cardImage.addEventListener('click', () => openFullImage(card));
  likeButton.addEventListener('click', (evt) => {
    const likeButton = evt.currentTarget;
    if (likeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(card._id)
        .then((data) => {
          updateLikes(data, likeButton, likeCounter, ownerId);
        })
        .catch((err) => console.log(err));
    } else {
      likeCard(card._id)
        .then((data) => {
          updateLikes(data, likeButton, likeCounter, ownerId);
        })
        .catch((err) => console.log(err));
    }
  });

  return cardElement;
};

const updateLikes = (card, likeButton, likeCounter, ownerId) => {
  likeCounter.textContent = card.likes.length;
  if (card.likes.map((like) => like._id).includes(ownerId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
};

export { createCard };
