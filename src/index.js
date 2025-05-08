import './pages/index.css';

import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup } from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const loadInitialCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card, deleteCard, likeCard);
    cardsContainer.append(newCard);
  });
};

loadInitialCards(initialCards);

editProfileButton.addEventListener('click', () => openPopup(editPopup));
addCardButton.addEventListener('click', () => openPopup(newCardPopup));
