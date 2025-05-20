let openedPopup;

const closePopupOnEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

const closePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
};

const openPopup = (popup) => {
  openedPopup = popup;
  openedPopup.classList.add('popup_is-opened');

  openedPopup.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEscape);
};

const closePopup = () => {
  openedPopup.classList.remove('popup_is-opened');

  openedPopup.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEscape);
};

export { openPopup, closePopup };
