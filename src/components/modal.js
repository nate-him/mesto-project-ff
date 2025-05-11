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
  const closePopupButton = openedPopup.querySelector('.popup__close');

  openedPopup.classList.add('popup_is-animated');
  setTimeout(() => openedPopup.classList.add('popup_is-opened'), 0);

  openedPopup.addEventListener('click', closePopupOnOverlay);
  closePopupButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupOnEscape);
};

const closePopup = () => {
  const closePopupButton = openedPopup.querySelector('.popup__close');

  openedPopup.classList.remove('popup_is-opened');

  openedPopup.removeEventListener('click', closePopupOnOverlay);
  closePopupButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopupOnEscape);
};

export { openPopup, closePopup };
