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
      <h4 class="card__title">${card.title}</h4>
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

};


function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

const closeButton = document.querySelector(".close");

closeButton.addEventListener("click", closeModal);

function openModal(imgSrc) {
  const modalImg = document.getElementById("modalImg");
  modalImg.src = imgSrc;

  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function attachModalListeners() {
  const cardImgs = document.querySelectorAll(".card__img");
  cardImgs.forEach(img => {
    img.addEventListener("click", function() {
      openModal(img.src);
    });
  });
}

async function getProducts() {
  const response = await fetch('./modules/products.json');
  const productsArray = await response.json();
  renderProducts(productsArray);
  attachModalListeners();
}


const header = document.getElementById("header");

function setBlurredBackground() {
    header.style.backdropFilter = "blur(10px)";
}

setBlurredBackground();


window.onload = function() {
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");

  if (searchIcon && searchInput) {
      searchIcon.addEventListener("click", function(event) {
          event.preventDefault();
          searchInput.classList.toggle("active");
          if (searchInput.classList.contains("active")) {
              searchInput.focus();
          } else {
              searchInput.value = "";
          }
      });

      searchInput.addEventListener("input", function() {
          const searchText = searchInput.value.toLowerCase(); 
          const itemsToSearch = document.querySelectorAll(".card");
          itemsToSearch.forEach(item => {
              const itemTitle = item.querySelector(".card__title").textContent.toLowerCase();
              if (itemTitle.includes(searchText)) {
                  item.style.display = "";
                  item.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                  item.style.display = "none";
              }
          });
      });
  }
};
