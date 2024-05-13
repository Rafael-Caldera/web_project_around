import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._form.querySelector(".form__submit").textContent = "Guardando...";
      this._submitCallback(this._getInputValues())
        .then(() => {
          this._form.querySelector(".form__submit").textContent = "Guardar";
        })
        .finally(() => {
          event.target.reset();
          this.close();
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
