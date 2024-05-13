export default class UserInfo {
  constructor({ nameSelector, roleSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._roleElement = document.querySelector(roleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      role: this._roleElement.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._roleElement.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
