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

const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const editForm = document.forms['edit-profile'];
const nameInput = editForm['name'];
const jobInput = editForm['description'];

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm['place-name'];
const linkInput = newCardForm['link'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  if (nameInput.value !== '' && jobInput.value !== '') {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
    newCardForm.reset();
  }
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  if (placeNameInput.value !== '' && linkInput.value !== '') {
    const newCard = createCard(
      { name: placeNameInput.value, link: linkInput.value },
      deleteCard,
      likeCard,
      openFullImage
    );
    cardsContainer.prepend(newCard);

    closePopup();
    newCardForm.reset();
  }
};

const openFullImage = (card) => {
  openPopup(imagePopup);

  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageCaption.textContent = card.name;
};

const loadInitialCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card, deleteCard, likeCard, openFullImage);
    cardsContainer.append(newCard);
  });
};

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
});
addCardButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

loadInitialCards(initialCards);
