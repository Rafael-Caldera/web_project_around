export default class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handlerDeleteCard, handlerAddLike, handlerRemoveLike },
    currentUser
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || 0;
    this._id = data._id;
    this._owner = data.owner;
    this._currentUser = currentUser;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlerDeleteCard = handlerDeleteCard;
    this._handlerAddLike = handlerAddLike;
    this._handlerRemoveLike = handlerRemoveLike;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return template;
  }

  _setEventListeners(cardElement) {
    const trashIcon = cardElement.querySelector(".element__trash");
    const likeButton = cardElement.querySelector(".element__button_liked");
    const imageNode = cardElement.querySelector(".element__image");

    trashIcon.addEventListener("click", () => {
      this._handlerDeleteCard(cardElement, this._id);
    });
    likeButton.addEventListener("click", () => {
      if (this._hasLikeOwner()) {
        this._handlerRemoveLike(this._id).then((card) => {
          this._likes = card.likes;
          cardElement.querySelector(".element__likes-count").textContent =
            this._likes.length;
          likeButton.classList.add("element__button_liked");
        });
      } else {
        this._handlerAddLike(this._id).then((card) => {
          this._likes = card.likes;
          cardElement.querySelector(".element__likes-count").textContent =
            this._likes.length;
          likeButton.classList.remove("element__button_liked");
        });
      }

      /*
      this._likes.length += 1; // Incrementa los "me gusta"
      cardElement.querySelector(".element__likes-count").textContent =
        this._likes.length;
      likeButton.classList.toggle("element__button_liked");
    */
    });
    imageNode.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _hasLikeOwner() {
    return this._likes.some((like) => like._id === this._currentUser._id);
  }

  _isMe() {
    return this._owner._id === this._currentUser._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__place").textContent = this._name;
    this._element.querySelector(".element__likes-count").textContent =
      this._likes.length;
    this._setEventListeners(this._element);
    if (this._hasLikeOwner()) {
      this._element
        .querySelector(".element__button_liked")
        .classList.remove("element__button_liked");
    }

    if (!this._isMe()) {
      this._element.querySelector(".element__trash").remove();
    }
    return this._element;
  }
}
