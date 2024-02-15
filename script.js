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
  // Asigna valores predeterminados vacíos a los campos de entrada
  titleInput.value = "";
  urlInput.value = "";

  // Abre la ventana emergente para agregar una tarjeta
  popup_tarjeta.classList.add("popup-tarjeta_opened");
});

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  aboutMeInput.value = roleElement.textContent;
  popup.classList.add("popup_opened");
});

closeEditButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

saveEditButton.addEventListener("click", () => {
  nameElement.textContent = nameInput.value;
  roleElement.textContent = aboutMeInput.value;
  popup.classList.remove("popup_opened");
});

addButton.addEventListener("click", () => {
  titleInput.value = titleElement.textContent;
  urlInput.value = urlElement.textContent;
  popup_tarjeta.classList.add("popup-tarjeta_opened");
});

closeCardButton.addEventListener("click", () => {
  popup_tarjeta.classList.remove("popup-tarjeta_opened");
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
}

// Función para cerrar la ventana emergente de la imagen
function closeImagePopup() {
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.style.display = "none";
}
