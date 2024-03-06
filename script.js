const popup = document.getElementById("popup");
const popup_tarjeta = document.getElementById("popup-tarjeta");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton"); // Agregar el botón de añadir
const closeEditButton = document.getElementById("closeEditButton");
const saveEditButton = document.getElementById("saveEditButton");
const closeCardButton = document.getElementById("closeCardButton");
const saveCardButton = document.getElementById("saveCardButton");
const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const aboutMeInput = document.getElementById("aboutMeInput");
const nameElement = document.querySelector(".profile__name");
const roleElement = document.querySelector(".profile__role");
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

function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    popup_tarjeta.classList.remove("popup-tarjeta_opened");
    popup.classList.remove("popup_opened");
    imagePopup.style.display = "none";
    document.removeEventListener("keydown", escapeKeyHandler);
  }
}

// Crear y añadir las tarjetas al contenedor usando cloneNode
initialCards.forEach((card) => {
  const cardElement = createCardElement(card.name, card.link);
  elementsContainer.appendChild(cardElement);
});

function createCardElement(name, link) {
  const template = document.querySelector(".template");
  const cardElement = template.content
    .cloneNode(true)
    .querySelector(".element");
  const imgElement = cardElement.querySelector(".element__image");
  const titleElement = cardElement.querySelector(".element__place");
  const likeButton = cardElement.querySelector(".element__button-corazon");
  const trashIcon = cardElement.querySelector(".element__trash"); // Seleccionamos el icono de la papelera

  imgElement.src = link;
  imgElement.alt = name;
  titleElement.textContent = name;

  // Añadimos un event listener para el clic en el icono de la papelera
  trashIcon.addEventListener("click", () => {
    cardElement.remove(); // Eliminamos la tarjeta del DOM al hacer clic en la papelera
  });

  return cardElement;
}

addButton.addEventListener("click", () => {
  // Asigna valores predeterminados vacíos a los campos de entrada de la ventana Lugares
  titleInput.value = "";
  urlInput.value = "";

  // Abre la ventana emergente para agregar una tarjeta
  popup_tarjeta.classList.add("popup-tarjeta_opened");
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

addButton.addEventListener("click", () => {
  titleInput.value = "";
  urlInput.value = "";
  popup_tarjeta.classList.add("popup-tarjeta_opened");
});

closeCardButton.addEventListener("click", () => {
  popup_tarjeta.classList.remove("popup-tarjeta_opened");
  document.removeEventListener("keydown", escapeKeyHandler);
});

saveCardButton.addEventListener("click", () => {
  const title = titleInput.value;
  const url = urlInput.value;

  if (title && url) {
    const newCardElement = createCardElement(title, url);
    elementsContainer.appendChild(newCardElement);

    titleInput.value = "";
    urlInput.value = "";

    popup_tarjeta.classList.remove("popup-tarjeta_opened");
  } else {
    alert("Por favor, complete ambos campos: título y enlace URL.");
  }
});

//Like corazon
// Modifica la función toggleHeart para recibir el botón como argumento
function toggleHeart(button) {
  button.classList.toggle("element__button_liked");
}

// Función para abrir la ventana emergente de la imagen
function openImagePopup(element) {
  const imageUrl = element.src;
  const imageTitle = element.alt;
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  popupImage.src = imageUrl;
  popupTitle.textContent = imageTitle;
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.style.display = "block";
  document.addEventListener("keydown", escapeKeyHandler);
}

// Función para cerrar la ventana emergente de la imagen
function closeImagePopup() {
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.style.display = "none";
  document.removeEventListener("keydown", escapeKeyHandler);
}

saveEditButton.addEventListener("click", () => {
  // Obtener el valor de los campos de entrada
  const nameValue = nameInput.value.trim();
  const aboutMeValue = aboutMeInput.value.trim();

  // Verificar si los campos están vacíos
  if (nameValue === "" || aboutMeValue === "") {
    alert("Por favor, complete ambos campos: Nombre y Acerca de Mí.");
  } else {
    // Si los campos no están vacíos, guardar la información del perfil
    nameElement.textContent = nameValue;
    roleElement.textContent = aboutMeValue;
    popup.classList.remove("popup_opened");
  }
});

// Función para el formulario de Editar Perfil:
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  function showInputError(inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  function hideInputError(inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
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
}

// Función para el formulario de Nuevo Lugar:
function enablePlaceValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  function showInputError(inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  function hideInputError(inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
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
    const isValid = inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    if (isValid) {
      submitButton.classList.remove(config.inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(config.inactiveButtonClass);
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
}

// Función para cerrar las ventanas emergentes con el click del mouse
function closePopupOnOverlayClick() {
  const popups = document.querySelectorAll(".popup, .popup-tarjeta");

  popups.forEach((popup) => {
    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.classList.remove("popup_opened");
        popup.classList.remove("popup-tarjeta_opened");
      }
    });
  });
}

closePopupOnOverlayClick();

// Función para cerrar las ventanas emergentes de las imagenes
function closeImagePopupOnOverlayClick(event) {
  const imagePopup = document.getElementById("imagePopup");
  const imageContainer = document.querySelector(".image-popup__content");
  if (event.target === imageContainer) {
    imagePopup.style.display = "none";
  }

  if (event.target === imagePopup) {
    imagePopup.style.display = "none";
  }
}

// Asociar evento de clic a la superposición para cerrar la ventana emergente de las imágenes
document.addEventListener("click", closeImagePopupOnOverlayClick);
