import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".image-popup__image");
    this._popupTitle = this._popup.querySelector(".image-popup__title");
  }

  open(imageSrc, imageAlt) {
    super.open();
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageAlt;
    this._popupTitle.textContent = imageAlt;
    this._popup.style.display = "block";
  }

  close() {
    super.close();
    this._popup.style.display = "none";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("image-popup") ||
        event.target.classList.contains("image-popup__content") ||
        event.target.classList.contains("image-popup__close-button-icon")
      ) {
        this.close();
      }
    });
  }
}
