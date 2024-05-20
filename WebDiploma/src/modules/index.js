const productsContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
  const response = await fetch('./modules/products.json');

  const productsArray = await response.json();

  renderProducts(productsArray);
}

function renderProducts(productsArray) {
  productsArray.forEach(function(card) {

    let ratingStarsHTML = '';

    for (let i = 0; i < card.rating; i++) {
      ratingStarsHTML += `<img src="./img/filled_star.svg" alt="star">`;
    }
    for (let i = card.rating; i < 5; i++) {
      ratingStarsHTML += `<img src="./img/star_empty.svg" alt="star">`
    }

    const productHTML = `<article class="card" data-id="${card.id}">
    <div class="card__pic">
      <img class="card__img" src="./img/${card.imgSrc}" alt="ABBA">
        <div class="card__new">${card.status}</div>
        <div class="card__fave">
          <button class="btn-fav">
            <svg width="20" height="20" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0002 2.18159C9.02692 1.24762 7.70557 0.673615 6.25016 0.673615C3.25862 0.673615 0.833496 3.09874 0.833496 6.09028C0.833496 11.3972 6.64211 14.3278 9.01165 15.3025C9.6498 15.565 10.3505 15.565 10.9887 15.3025C13.3582 14.3278 19.1668 11.3972 19.1668 6.09028C19.1668 3.09874 16.7417 0.673615 13.7502 0.673615C12.2948 0.673615 10.9734 1.24762 10.0002 2.18159Z"/>
            </svg>
          </button>
        </div>
        <div class="card__btn">
          <button class="btn btn--small btn--wide" data-cart>Add to card</button>
        </div>
    </div>
    <div class="card__desc">
      <div class="card__rating" data-rating="${card.rating}">
        ${generateStarsIcons(card.rating)}
      </div>
      <h4 class="card__title card__title--elipsis">${card.title}</h4>
      <div class="card__price">${card.price} BYN</div>
    </div>
      
    <!-- <a href="#" class="card__link"></a> -->
                          </article>`;
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}

function generateStarsIcons(rating) {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHTML += '<img class="star" src="./img/filled_star.svg" alt="filled">';
    } else {
      starsHTML += '<img class="star" src="./img/star_empty.svg" alt="empty">';
    }
  }
  return starsHTML;
}

document.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('star')) {
    const stars = event.target.parentElement.children;
    const starIndex = Array.from(stars).indexOf(event.target);
    highlightStars(stars, starIndex);
  }
});

function highlightStars(stars, index) {
  for (let i = 0; i <= index; i++){
    stars[i].src = "./img/filled_star.svg";
  }
  for (let i = index + 1; i < stars.length; i++) {
    stars[i].src = "./img/star_empty.svg";
  }

}

// Закрыть модальное окно
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Получаем элемент крестика
const closeButton = document.querySelector(".close");

// Добавляем обработчик события для закрытия модального окна при клике на крестик
closeButton.addEventListener("click", closeModal);

// Открыть модальное окно с увеличенным изображением
function openModal(imgSrc) {
  const modalImg = document.getElementById("modalImg");
  modalImg.src = imgSrc;

  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

// Обработчик события для открытия модального окна при клике на изображение товара
function attachModalListeners() {
  const cardImgs = document.querySelectorAll(".card__img");
  cardImgs.forEach(img => {
    img.addEventListener("click", function() {
      openModal(img.src);
    });
  });
}

// После рендеринга всех товаров, добавляем обработчики для модального окна
async function getProducts() {
  const response = await fetch('./modules/products.json');
  const productsArray = await response.json();
  renderProducts(productsArray);
  attachModalListeners(); // Добавляем обработчики после рендеринга товаров
}

// Получаем элемент хедера
const header = document.getElementById(".header");

// Функция для установки стилей фона с размытием
function setBlurredBackground() {
    header.style.backgroundImage = "none"; // Удаляем фоновое изображение
    header.style.backgroundColor = "rgba($color: #000000a4, $alpha: 0.3)"; // Устанавливаем прозрачный цвет фона
    header.style.backdropFilter = "blur(10px)"; // Устанавливаем размытие фона
}

// Вызываем функцию для установки стилей фона с размытием
setBlurredBackground();