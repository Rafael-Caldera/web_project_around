// habilitar la validación llamando a enableValidation()
// pasar todas las configuraciones en la llamada
enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__container-nombre, .popup__container-role",
  submitButtonSelector: ".popup__container-save-button",
  inactiveButtonClass: "popup__container-save-button_disabled",
  inputErrorClass: "popup__container-input_type_error",
  errorClass: "popup__container-error_visible",
});

// habilitar la validación llamando a enablePlaceValidation()
// pasar todas las configuraciones en la llamada
enablePlaceValidation({
  formSelector: ".popup-tarjeta__container",
  inputSelector:
    ".popup-tarjeta__container-title, .popup-tarjeta__container-url",
  submitButtonSelector: ".popup-tarjeta__container-save-button",
  inactiveButtonClass: "popup-tarjeta__container-save-button_disabled",
  inputErrorClass: "popup-tarjeta__container-input_type_error",
  errorClass: "popup-tarjeta__container-error_visible",
});
