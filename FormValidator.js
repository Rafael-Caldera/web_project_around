export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );

    const isAnyFieldFilled = this._inputList.some(
      (inputElement) => inputElement.value.trim() !== ""
    );

    const submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    if (isFormValid && isAnyFieldFilled) {
      submitButton.classList.remove(this._settings.inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(this._settings.inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
