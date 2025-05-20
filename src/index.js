import './pages/index.css';

import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';
import {
  getProfileInfo,
  getInitialCards,
  updateProfileInfo,
  updateProfileImage,
  postNewCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
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
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const imagePopup = document.querySelector('.popup_type_image');

const closePopupButtonsList = Array.from(
  document.querySelectorAll('.popup__close')
);

const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const editForm = document.forms['edit-profile'];
const nameInput = editForm['name'];
const jobInput = editForm['description'];

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm['place-name'];
const linkInput = newCardForm['link'];

const updateAvatarForm = document.forms['update-avatar'];
const avatarLinkInput = updateAvatarForm['avatar'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const renderLoadingButton = (isLoading, submitButton) => {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  renderLoadingButton(true, evt.submitter);
  updateProfileInfo({ name, about })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup();
      editForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoadingButton(false, evt.submitter));
};

const handleUpdateAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const avatar = avatarLinkInput.value;

  renderLoadingButton(true, evt.submitter);
  updateProfileImage({ avatar })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closePopup();
      updateAvatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoadingButton(false, evt.submitter));
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  renderLoadingButton(true, evt.submitter);
  postNewCard({ name, link })
    .then((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        addLikeCard,
        deleteLikeCard,
        openFullImage,
        card.owner._id
      );
      cardsContainer.prepend(newCard);
      closePopup();
      newCardForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoadingButton(false, evt.submitter));
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
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

addCardButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardPopup);
});

profileAvatar.addEventListener('click', () => {
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig);
  openPopup(updateAvatarPopup);
});

closePopupButtonsList.forEach((closePopupButton) =>
  closePopupButton.addEventListener('click', closePopup)
);
[newCardPopup, editPopup, imagePopup, updateAvatarPopup].forEach((popup) =>
  popup.classList.add('popup_is-animated')
);

editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
updateAvatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getInitialCards()])
  .then((data) => {
    profileTitle.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.style.backgroundImage = `url('${data[0].avatar}')`;

    data[1].forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        addLikeCard,
        deleteLikeCard,
        openFullImage,
        data[0]._id
      );
      cardsContainer.append(newCard);
    });
  })
  .catch((err) => console.log(err));
