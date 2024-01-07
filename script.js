const popup = document.getElementById("popup");
const editButton = document.getElementById("editButton");
const closeButton = document.getElementById("closeButton");
const saveButton = document.getElementById("saveButton");
const nameInput = document.getElementById("nameInput");
const aboutMeInput = document.getElementById("aboutMeInput");
const nameElement = document.querySelector(".profile__name");
const roleElement = document.querySelector(".profile__role");

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  aboutMeInput.value = roleElement.textContent;
  popup.classList.add("popup_opened");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

saveButton.addEventListener("click", () => {
  nameElement.textContent = nameInput.value;
  roleElement.textContent = aboutMeInput.value;
  popup.classList.remove("popup_opened");
});
