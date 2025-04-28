import './pages/index.css';

import { initialCards } from "./scripts/cards.js";

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

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