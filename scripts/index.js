import { initialCards } from "./cards.js";

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const createCard = (card) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardHeader = cardElement.querySelector('.card__title');
  cardHeader.textContent = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

const deleteCard = (evt) => {
  const deleteButton = evt.currentTarget;
  const card = deleteButton.closest('.card');
  card.remove();
}

const loadInitialCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card);
    cardsContainer.append(newCard);
  })
}

loadInitialCards(initialCards);