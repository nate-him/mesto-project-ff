import './pages/index.css';

import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const imageAttributes = {};

const getImageAttributes = (evt) => {
  const image = evt.currentTarget;
  imageAttributes.name = image.alt;
  imageAttributes.link = image.src;
  openPopup(imagePopup);
};

const loadInitialCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card, deleteCard, likeCard, getImageAttributes);
    cardsContainer.append(newCard);
  });
};

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
        likeCard,
        getImageAttributes
      );
      cardsContainer.prepend(newCard);

      placeNameInput.value = '';
      linkInput.value = '';
    }
  };

  formElement.addEventListener('submit', handleFormSubmit);
};

const openFullImage = (popup) => {
  const imageElement = popup.querySelector('.popup__image');
  imageElement.src = imageAttributes.link;
  imageElement.alt = imageAttributes.name;

  const imageCaption = popup.querySelector('.popup__caption');
  imageCaption.textContent = imageAttributes.name;
};

editProfileButton.addEventListener('click', () => openPopup(editPopup));
addCardButton.addEventListener('click', () => openPopup(newCardPopup));

loadInitialCards(initialCards);

export { handleEditForm, handleNewCardForm, openFullImage };
