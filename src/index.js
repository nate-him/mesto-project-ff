import './pages/index.css';

import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import {
  getProfileInfo,
  getInitialCards,
  updateProfileInfo,
} from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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
const profileAvatar = document.querySelector('.profile__image');

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  if (name !== '' && about !== '') {
    profileTitle.textContent = name;
    profileDescription.textContent = about;

    updateProfileInfo({ name, about });
    closePopup();
    editForm.reset();
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

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getInitialCards()]).then((data) => {
  profileTitle.textContent = data[0].name;
  profileDescription.textContent = data[0].about;
  profileAvatar.style.backgroundImage = `url('${data[0].avatar}')`;

  data[1].forEach((card) => {
    const newCard = createCard(card, deleteCard, likeCard, openFullImage);
    cardsContainer.append(newCard);
  });
});
