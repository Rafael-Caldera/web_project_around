import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  closeImagePopup,
  escapeKeyHandler,
  popupTarjeta,
  closeImagePopupOnOverlayClick,
} from "./utils.js";

const popup = document.getElementById("popup");
const nameElement = document.querySelector(".profile__name");
const roleElement = document.querySelector(".profile__role");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");
const closeEditButton = document.getElementById("closeEditButton");
const saveEditButton = document.getElementById("saveEditButton");
const closeCardButton = document.getElementById("closeCardButton");
const saveCardButton = document.getElementById("saveCardButton");
const elementsContainer = document.querySelector(".elements");

// Contenido de las tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Crear instancia de la clase Card para cada tarjeta
initialCards.forEach((cardData) => {
  const card = new Card(cardData, ".template");
  const cardElement = card.generateCard();
  elementsContainer.appendChild(cardElement);
});

// Crear instancia de la clase FormValidator para cada formulario
const editProfileForm = document.getElementById("form-profile");
const newCardForm = document.querySelector(".popup-tarjeta form");

const editProfileFormValidator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  editProfileForm
);

const newCardFormValidator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  newCardForm
);

editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

addButton.addEventListener("click", () => {
  titleInput.value = "";
  urlInput.value = "";
  popupTarjeta.classList.add("popup-tarjeta_opened");
  document.addEventListener("keydown", escapeKeyHandler);
});

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  aboutMeInput.value = roleElement.textContent;
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escapeKeyHandler);
});

closeEditButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

saveEditButton.addEventListener("click", () => {
  nameElement.textContent = nameInput.value;
  roleElement.textContent = aboutMeInput.value;
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapeKeyHandler);
});

saveCardButton.addEventListener("click", () => {
  const title = titleInput.value;
  const url = urlInput.value;

  if (title && url) {
    const card = new Card({ name: title, link: url }, ".template");
    const newCardElement = card.generateCard();
    elementsContainer.prepend(newCardElement);

    titleInput.value = "";
    urlInput.value = "";

    popupTarjeta.classList.remove("popup-tarjeta_opened");
  } else {
    alert("Por favor, complete ambos campos: título y enlace URL.");
  }
});

imagePopup
  .querySelector(".image-popup__close-button")
  .addEventListener("click", () => {
    closeImagePopup();
  });

closeCardButton.addEventListener("click", () => {
  popupTarjeta.classList.remove("popup-tarjeta_opened");
  document.removeEventListener("keydown", escapeKeyHandler);
});
