import { handleEditForm, handleNewCardForm } from './form.js';
import { openFullImage } from './image.js';

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

const openPopup = (popup) => {
  const closePopupButton = popup.querySelector('.popup__close');

  if (popup.classList.contains('popup_type_edit')) {
    handleEditForm(popup);
  }

  if (popup.classList.contains('popup_type_new-card')) {
    handleNewCardForm(popup);
  }

  if (popup.classList.contains('popup_type_image')) {
    openFullImage(popup);
  }

  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', (event) => closePopupOnOverlay(event, popup));
  closePopupButton.addEventListener('click', () => closePopup(popup));
  document.addEventListener('keydown', (event) =>
    closePopupOnEscape(event, popup)
  );
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (event) =>
    closePopupOnEscape(event, popup)
  );
};

export { openPopup, closePopup };
