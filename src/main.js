import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';
import axios from 'axios';
// ============================================
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const refs = {
  formEl: document.querySelector('.search-form'),
  imgListEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('[data-action=load-more]'),
};
let currentPage = 1;
let maxPage = 0;
let search;
const pageSize = 15;
// ================================================
refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
// ====================================================================================
async function onFormSubmit(event) {
  event.preventDefault();
  refs.imgListEl.innerHTML = '';
  currentPage = 1;
  search = event.target.elements.query.value.trim();

  if (!search) {
    iziToast.error({
      title: 'Error',
      message: 'The search field is empty. Please try again!',
      position: 'bottomCenter',
    });
    hideLoadMoreBtn();
  } else {
    try {
      showLoader();
      
      const data = await getImages(search, currentPage);
      maxPage = Math.ceil(data.totalHits / pageSize);
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomCenter',
        });
        hideLoader();
        hideLoadMoreBtn();
      } else {
        const markup = imagesTemplate(data.hits);
        refs.imgListEl.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        hideLoader();
        checkBtnStatus();
      }
    } catch (error) {
      console.log(error);
    }
    refs.formEl.reset();
  }
}
// ===================================================================
async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImages(search, currentPage);
    const markup = imagesTemplate(data.hits);
    refs.imgListEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }

  scroll();
  hideLoader();
  checkBtnStatus();
}
// ====================== workspacefunction=========================
//=========================================================================
function showLoader() {
  refs.loaderEl.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loaderEl.classList.add('is-hidden');
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMoreBtn();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
  } else {
    showLoadMoreBtn();
  }
}
function scroll() {
  const height = refs.imgListEL.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
