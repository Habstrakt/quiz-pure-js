const btnNext = document.querySelectorAll('[data-btn="next"]');
const btnPrev = document.querySelectorAll('[data-btn="back"]');

const answers = {
  2: null,
  3: null,
  4: null,
  5: null,
};


btnNext.forEach(function(button) {
  button.addEventListener('click', function() {
    const thisCard = button.closest('[data-card]');

    if(thisCard.dataset.validate == 'novalidate') {
      navigate('next', thisCard)
      console.log('no validate');
    } else {
      navigate('next', thisCard)
      console.log('validate');
    }
  })
})

btnPrev.forEach(function(button) {
  button.addEventListener('click', function() {
    const thisCard = button.closest('[data-card]');
    
    navigate('back', thisCard)
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

function gatherCardData(number) {

  let question;
  let result = [];

  const currentCard = document.querySelector(`[data-card='${number}']`);

  question = currentCard.querySelector('[data-question]').innerText;

  const radioValues = currentCard.querySelectorAll('[type="radio"]');
  
  radioValues.forEach(function(item) {
    if(item.checked) {
      result.push({
        name: item.name,
        value: item.value
      })
    }

  })


const data = {
  question: question,
  answer: result
}

return data
}