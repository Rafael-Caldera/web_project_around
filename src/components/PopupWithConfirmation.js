import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._confirmCallback = confirmCallback; // Función a ejecutar para eliminar la tarjeta
    this._yesButton = this._popup.querySelector(".popup__confirm-button_yes");
    this._noButton = this._popup.querySelector(".popup__confirm-button_no");
  }

  setEventListeners() {
    super.setEventListeners();
    // Agrega el evento click al botón 'Sí' para ejecutar la función de confirmación
    this._yesButton.addEventListener("click", () => {
      this._confirmCallback();
      this.close();
    });

    // Agrega el evento click al botón 'No' para simplemente cerrar el popup
    this._noButton.addEventListener("click", () => {
      this.close();
    });
  }
}
