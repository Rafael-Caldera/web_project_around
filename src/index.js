import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

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

function showImagePopup(name, link) {
  popupWithImage.open(link, name);
}

// Crear instancia de la clase FormValidator para cada formulario
const editProfileForm = document.getElementById("form-profile");
const newCardForm = document.querySelector(".popup_tarjeta form");

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

// Crear instancia de la clase Section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template", {
        handleCardClick: showImagePopup,
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".elements"
);

// Crear instancia de la clase Popup
const popupInstance = new Popup(".popup");
popupInstance.setEventListeners();

// Abrir el popup
popupInstance.open();

// Cerrar el popup
popupInstance.close();

// Crear instancia de la clase PopupWithImage
const popupWithImage = new PopupWithImage(".image-popup");
popupWithImage.setEventListeners();

// Crear instancia de la clase PopupWithForm
const popupProfile = new PopupWithForm(".popup", ({ name, about }) => {
  // Lógica para manejar el envío del formulario
  userInfo.setUserInfo({ name, about });
});
popupProfile.setEventListeners();

const popupTarjeta = new PopupWithForm(".popup_tarjeta", ({ title, url }) => {
  const card = new Card({ name: title, link: url }, ".template", {
    handleCardClick: showImagePopup,
  });
  const newCardElement = card.generateCard();
  elementsContainer.prepend(newCardElement);
});
popupTarjeta.setEventListeners();

// Crear instancia de la clase UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  roleSelector: ".profile__role",
});

addButton.addEventListener("click", () => {
  titleInput.value = "";
  urlInput.value = "";
  popupTarjeta.open();
});

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  aboutMeInput.value = roleElement.textContent;
  popupProfile.open();
});

section.rendererItems();
