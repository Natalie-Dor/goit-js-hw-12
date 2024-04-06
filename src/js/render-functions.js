function imgTemplate(data) {
  const {
    id,
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;
  return `<li class="gallery-item data-id="${id}">
        <a class="gallery-link" href="${largeImageURL}">
          <img
          loading="lazy"
            class="gallery-image"
            width="360"
            height="200"
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
          <ul class="gallery-description">
            <li class="gallery-description-item"><span class="gallery-description-span">Likes</span>${likes}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Views</span>${views}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Comments</span>${comments}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Downloads</span>${downloads}</li>
          </ul>
        </a>
      </li>`;
}
// =========================================
export function imagesTemplate(arr) {
  return arr.map(imgTemplate).join('');
}
