enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});

// Función para los formularios de Editar Perfil y Nuevo Lugar:
function enableValidation(config) {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formElements.forEach(function (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    function showInputError(inputElement, errorMessage) {
      const errorElement = formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(config.errorClass);
    }

    function hideInputError(inputElement) {
      const errorElement = formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }

    function checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
      } else {
        hideInputError(inputElement);
      }
    }

    function toggleButtonState() {
      const isFormValid = inputList.every(
        (inputElement) => inputElement.validity.valid
      );

      const isAnyFieldFilled = inputList.some(
        (inputElement) => inputElement.value.trim() !== ""
      );

      if (isFormValid && isAnyFieldFilled) {
        submitButton.classList.remove("popup__container-save-button_disabled");
        submitButton.disabled = false;
      } else {
        submitButton.classList.add("popup__container-save-button_disabled");
        submitButton.disabled = true;
      }
    }

    function setEventListeners() {
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
          checkInputValidity(inputElement);
          toggleButtonState();
        });
      });

      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      toggleButtonState();
    }

    setEventListeners();
  });
}
