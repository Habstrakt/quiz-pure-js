/*
1. Добавить дата атрибуты в размертке на кнопки.
2. Записать в переменные кнопки.
3. Перебрать циклом кнопки.
4. Атрибуты каждой карточки.
5. 
*/

const btnNext = document.querySelectorAll('[data-btn="next"]');
const btnPrev = document.querySelectorAll('[data-btn="back"]');


btnNext.forEach(function(button) {
  button.addEventListener('click', function() {
    const currentCard = button.closest('[data-card]');
    const currentCardNum = +currentCard.getAttribute('data-card');
    const nextCard = currentCardNum + 1;

    currentCard.classList.add('hidden');

    document.querySelector(`[data-card='${nextCard}']`).classList.remove('hidden');
    
  })
})

btnPrev.forEach(function(button) {
  button.addEventListener('click', function() {
    const currentCard = button.closest('[data-card]');
    const currentCardNum = +currentCard.getAttribute('data-card');
    const prevCard = currentCardNum - 1;

    currentCard.classList.add('hidden');

    document.querySelector(`[data-card='${prevCard}']`).classList.remove('hidden');
    
  })
})