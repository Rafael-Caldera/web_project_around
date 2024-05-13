import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import api from "./components/Api.js";

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
const avatarNode = document.querySelector(".profile__avatar");

const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Contenido de las tarjetas
/*
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    likes: 0,
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
*/

let section = null;
let currentUser = null;
let initialCards = null;

api
  .getUserInfo()
  .then((user) => {
    currentUser = user;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    return api.getInitialCards();
  })
  .then((cards) => {
    initialCards = cards;
    // Crear instancia de la clase Section
    section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item,
            ".template",
            {
              handleCardClick: showImagePopup,
              handlerDeleteCard: (cardElement, _id) => {
                currentCard = { cardElement, _id };
                confirmPopup.open();
              },
              handlerAddLike: (cardId) => {
                return api.addLike(cardId);
              },
              handlerRemoveLike: (cardId) => {
                return api.removeLike(cardId);
              },
            },
            currentUser
          );
          const cardElement = card.generateCard();
          section.addItem(cardElement);
        },
      },
      ".elements"
    );
    section.rendererItems();
  });

function showImagePopup(name, link) {
  popupWithImage.open(link, name);
}

// Crear instancia de la clase FormValidator para cada formulario
const editProfileForm = document.getElementById("form-profile");
const newCardForm = document.querySelector(".popup_tarjeta form");
const avatarForm = document.querySelector(".popup_avatar form");

const editProfileFormValidator = new FormValidator(configForm, editProfileForm);

const newCardFormValidator = new FormValidator(configForm, newCardForm);

const newAvatarFormValidator = new FormValidator(configForm, avatarForm);

editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();

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
  return api.updateUserInfo({ name, about }).then((data) => {
    userInfo.setUserInfo({ name, about });
  });
});
popupProfile.setEventListeners();

const popupTarjeta = new PopupWithForm(".popup_tarjeta", ({ title, url }) => {
  return api.addCard({ name: title, link: url }).then((data) => {
    const card = new Card(
      data,
      ".template",
      {
        handleCardClick: showImagePopup,
        handlerDeleteCard: (cardElement, _id) => {
          currentCard = { cardElement, _id };
          confirmPopup.open();
        },
        handlerAddLike: (cardId) => {
          return api.addLike(cardId);
        },
        handlerRemoveLike: (cardId) => {
          return api.removeLike(cardId);
        },
      },
      currentUser
    );
    const newCardElement = card.generateCard();
    elementsContainer.prepend(newCardElement);
  });
});
popupTarjeta.setEventListeners();

// Crear instancia de la clase UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  roleSelector: ".profile__role",
  avatarSelector: ".profile__avatar-image",
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

let currentCard = null;
// Crear instancia de la clase PopupWithConfirmation
const confirmPopup = new PopupWithConfirmation("#confirmPopup", () => {
  // Aquí agregarías el código para eliminar la tarjeta
  if (currentCard) {
    api.deleteCard(currentCard._id).then(() => {
      currentCard.cardElement.remove();
      console.log("Tarjeta eliminada");
    });
  }
});

confirmPopup.setEventListeners();

// Agregar el event listener al ícono de la papelera
document.querySelectorAll(".element__trash").forEach((trashIcon) => {
  trashIcon.addEventListener("click", () => {
    confirmPopup.open();
  });
});

const popupAvatar = new PopupWithForm(".popup_avatar", ({ avatar }) => {
  return api.updateAvatar({ avatar }).then((data) => {
    userInfo.setUserAvatar(data.avatar);
  });
});

popupAvatar.setEventListeners();

avatarNode.addEventListener("click", () => {
  popupAvatar.open();
});
