import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const SimpleLightboxGallery = {
  gallery: document.querySelector(".gallery"),
  createGalleryMarkUpFrom(galleryItems) {
    return galleryItems
      .map(
        ({ preview, original, description }) => `<li class="gallery__li">
  <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</li> `
      )
      .join("");
  },
};

const newGallery = SimpleLightboxGallery.createGalleryMarkUpFrom(galleryItems);
// новая галлерея === запуск функции создания разметки
SimpleLightboxGallery.gallery.insertAdjacentHTML("beforeend", newGallery);

const lightbox = new SimpleLightbox(".gallery a", {
  captionType: "alt",
  captionsData: "alt",
  captionDelay: 200,
  showCounter: false,
  maxZoom: 2,
  scrollZoomFactor: 0.1,
});
// создаем lightbox (экземпляр объекта SimpleLightbox из библиотеки которую мы подключили) + изменяем некоторые параметры
