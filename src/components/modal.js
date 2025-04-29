const closePopupButton = document.querySelector('.popup__close');
const anyPopup = document.querySelector('.popup');

const closePopupOnEscape = (evt, popup = anyPopup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

const closePopupOnOverlay = (evt, popup = anyPopup) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupOnOverlay);
  closePopupButton.addEventListener('click', () => closePopup(popup));
  document.addEventListener('keydown', closePopupOnEscape);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

export { openPopup };
