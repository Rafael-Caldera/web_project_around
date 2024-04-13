export const popupTarjeta = document.getElementById("popup-tarjeta");

export function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    popupTarjeta.classList.remove("popup-tarjeta_opened");
    popup.classList.remove("popup_opened");
    imagePopup.style.display = "none";
    document.removeEventListener("keydown", escapeKeyHandler);
  }
}

export function openImagePopup(element) {
  const imageUrl = element.src;
  const imageTitle = element.alt;
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  popupImage.src = imageUrl;
  popupImage.alt = "La imagen de : " + imageTitle;
  popupTitle.textContent = imageTitle;
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.style.display = "block";
  document.addEventListener("keydown", escapeKeyHandler);
}

export function closeImagePopup() {
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.style.display = "none";
  document.removeEventListener("keydown", escapeKeyHandler);
}

// Función para cerrar las ventanas emergentes de las imagenes
export function closeImagePopupOnOverlayClick(event) {
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
