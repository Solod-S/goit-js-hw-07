import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const basicLightboxGallery = {
  gallery: document.querySelector(".gallery"),
  instance: "",
  createGalleryMarkUpFrom(galleryItems) {
    return galleryItems
      .map(
        ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div> `
      )
      .join("");
  },
  //функция динамической разметки (перебор входящего массива с объектами map-ом + на результат [] всего применим .join("") === строка с разметкой)
  choseImg(event) {
    event.preventDefault();
    //запрещаем открытие ссылки по умолчанию

    if (event.target.nodeName !== "IMG") {
      //можно и по классу сделать event.target.classList.contains !== 'gallery__image'
      console.log("!");
      return;
    }
    // мы не слушаем событие, если nodeName выбранного таргета не IMG

    basicLightboxGallery.openOriginalImg(event.target.dataset.source);
    //запускаем функцию и передаем туда атрибут === ссылку на дата атрибут data-source
  },
  openOriginalImg(source) {
    // как открыли окно

    const instance = basicLightbox.create(
      `
    <img src="${source}">
`,
      {
        onShow: (instance) => {
          document.addEventListener(
            "keydown",
            basicLightboxGallery.onKeyPresEsq
          );
          //запускаем слушателя события клацанья клавиатуры
        },
        onClose: () => {
          document.removeEventListener(
            "keydown",
            basicLightboxGallery.onKeyPresEsq
          );
          //выключаем слушателя события клацанья клавиатуры
        },
      }
    );
    instance.show();
    this.instance = instance;
    //в ключ instance записываем ссылку на эту переменную
    // window.addEventListener("keydown", this.onKeyPresEsq);
    //запускаем слушателя события клацанья клавиатуры
  },
  // метод внешней библиотеки basiclightbox который создает нам всплывающее окно + запуск-выключает евент листнера + запись в ключ ссылку на переменную
  onKeyPresEsq(event) {
    console.log(event);
    if (event.code === "Escape") {
      basicLightboxGallery.instance.close();
      // если нажали Esc то закрываем окно
      window.removeEventListener("keydown", basicLightboxGallery.onKeyPresEsq);
      // снимаем слушателя событий
    }
  },
};

const newGallery = basicLightboxGallery.createGalleryMarkUpFrom(galleryItems);
// новая галлерея === запуск функции создания разметки
basicLightboxGallery.gallery.insertAdjacentHTML("beforeend", newGallery);

basicLightboxGallery.gallery.addEventListener(
  "click",
  basicLightboxGallery.choseImg
);
// basicLightboxGallery.gallery.addEventListener("click");
