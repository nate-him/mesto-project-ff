import { closePopup } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';

const handleEditForm = (popup) => {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const formElement = document.forms['edit-profile'];
  const nameInput = formElement['name'];
  const jobInput = formElement['description'];

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (nameInput.value !== '' && jobInput.value !== '') {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;

      closePopup(popup);
    }
  };

  formElement.addEventListener('submit', handleFormSubmit);
};

const handleNewCardForm = (popup) => {
  const cardsContainer = document.querySelector('.places__list');

  const formElement = document.forms['new-place'];
  const placeNameInput = formElement['place-name'];
  const linkInput = formElement['link'];

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (placeNameInput.value !== '' && linkInput.value !== '') {
      closePopup(popup);
      const newCard = createCard(
        { name: placeNameInput.value, link: linkInput.value },
        deleteCard,
        likeCard
      );
      cardsContainer.append(newCard);

      placeNameInput.value = '';
      linkInput.value = '';

    }
  };

  formElement.addEventListener('submit', handleFormSubmit);
};

export { handleEditForm, handleNewCardForm };
