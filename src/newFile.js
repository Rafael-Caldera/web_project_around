import { section } from "./index.js";

/*
closeEditButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});
*/
/*
saveEditButton.addEventListener("click", () => {
  nameElement.textContent = nameInput.value;
  roleElement.textContent = aboutMeInput.value;
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapeKeyHandler);
});
*/
/*
saveCardButton.addEventListener("click", () => {
  const title = titleInput.value;
  const url = urlInput.value;

  if (title && url) {
    const card = new Card({ name: title, link: url }, ".template", {
      handleCardClick: showImagePopup,
    });
    const newCardElement = card.generateCard();
    elementsContainer.prepend(newCardElement);

    titleInput.value = "";
    urlInput.value = "";

    popupTarjeta.classList.remove("popup-tarjeta_opened");
  } else {
    alert("Por favor, complete ambos campos: título y enlace URL.");
  }
});
*/
/*
imagePopup
  .querySelector(".image-popup__close-button")
  .addEventListener("click", () => {
    closeImagePopup();
  });
*/
/*
closeCardButton.addEventListener("click", () => {
  popupTarjeta.classList.remove("popup-tarjeta_opened");
  document.removeEventListener("keydown", escapeKeyHandler);
});
*/
section.rendererItems();
