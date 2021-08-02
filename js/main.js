const btnNext = document.querySelectorAll('[data-btn="next"]');
const btnPrev = document.querySelectorAll('[data-btn="back"]');


btnNext.forEach(function(button) {
  button.addEventListener('click', function() {
    const currentCard = button.closest('[data-card]');
    
    navigate('next', currentCard)
  })
})

btnPrev.forEach(function(button) {
  button.addEventListener('click', function() {
    const currentCard = button.closest('[data-card]');
    
    navigate('back', currentCard)
  })
})


function navigate(route, currentCard) {
  const currentCardNum = +currentCard.getAttribute('data-card');
  let navCard;

  if(route == 'next') {
    navCard = currentCardNum + 1;
  } else {
    navCard = currentCardNum - 1;
  }

  currentCard.classList.add('hidden');

  document.querySelector(`[data-card='${navCard}']`).classList.remove('hidden');
}