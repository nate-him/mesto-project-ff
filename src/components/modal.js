const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const closePopupOnEscape = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

const closePopupOnOverlay = (evt, popup) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
};

const fillEditProfilePopup = (popup) => {
  const popupTypeName = popup.querySelector('.popup__input_type_name');
  popupTypeName.value = profileTitle.textContent;
  const popupTypeDescription = popup.querySelector('.popup__input_type_description');
  popupTypeDescription.value = profileDescription.textContent;
}

const openPopup = (popup) => {
  const closePopupButton = popup.querySelector('.popup__close');

  if (popup.classList.contains('popup_type_edit')) {
    fillEditProfilePopup(popup);
  }
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', (event) => closePopupOnOverlay(event, popup));
  closePopupButton.addEventListener('click', () => closePopup(popup));
  document.addEventListener('keydown', (event) => closePopupOnEscape(event, popup));
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (event) => closePopupOnEscape(event, popup));
};

export { openPopup };
