const buttonAdded = document.querySelector('#added');
const counter = document.querySelector('.header__icon-number');

buttonAdded.addEventListener('click', function(){
  counter.innerText = ++counter.innerText;
})