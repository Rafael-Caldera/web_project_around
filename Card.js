import { openImagePopup } from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return template;
  }

  _setEventListeners(cardElement) {
    const trashIcon = cardElement.querySelector(".element__trash");
    const likeButton = cardElement.querySelector(".element__button_liked");
    const imageNode = cardElement.querySelector(".element__image");

    trashIcon.addEventListener("click", () => {
      cardElement.remove();
    });
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("element__button_liked");
    });
    imageNode.addEventListener("click", () => {
      openImagePopup(imageNode);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__place").textContent = this._name;
    this._setEventListeners(this._element);
    return this._element;
  }
}
