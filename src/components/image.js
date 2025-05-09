import { openPopup } from './modal.js';

const imagePopup = document.querySelector('.popup_type_image');

const imageAttributes = {};

const getImageAttributes = (evt) => {
  const image = evt.currentTarget;
  imageAttributes.name = image.alt;
  imageAttributes.link = image.src;
  openPopup(imagePopup);
};

const openFullImage = (popup) => {
  const imageElement = popup.querySelector('.popup__image');
  imageElement.src = imageAttributes.link;
  imageElement.alt = imageAttributes.name;

  const imageCaption = popup.querySelector('.popup__caption');
  imageCaption.textContent = imageAttributes.name;
};

export { getImageAttributes, openFullImage };
