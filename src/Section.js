export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    this.container.appendChild(element);
  }
}
