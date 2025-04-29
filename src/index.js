import './pages/index.css';

import { initialCards } from "./scripts/cards.js";

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editProfileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

const createCard = (card, removeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardHeader = cardElement.querySelector('.card__title');
  cardHeader.textContent = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);

  return cardElement;
}

const deleteCard = (evt) => {
  const deleteButton = evt.currentTarget;
  const card = deleteButton.closest('.card');
  card.remove();
}

const loadInitialCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card, deleteCard);
    cardsContainer.append(newCard);
  })
}

loadInitialCards(initialCards);

const closePopupOnEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
}

const closePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

const openPopup = () => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupOnOverlay);
  closePopupButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupOnEscape);
}

const closePopup = () => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

editProfileButton.addEventListener('click', openPopup);
