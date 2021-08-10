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
    const thisCardNum = +thisCard.dataset.card;

    if(thisCard.dataset.validate == 'novalidate') {
      navigate('next', thisCard);
      updateProgressBar('next', thisCardNum);
    } else {

      saveAnswer(thisCardNum, gatherCardData(thisCardNum));

      
      if(isFilled(thisCardNum) && checkOnRequired(thisCardNum)) {
        navigate('next', thisCard);
        updateProgressBar('next', thisCardNum);
      } else {
        alert('Выберите ответ, прежде чем переходить далее.');
      }

      
    }
  })
})

btnPrev.forEach(function(button) {
  button.addEventListener('click', function() {
    const thisCard = button.closest('[data-card]');
    const thisCardNum = +thisCard.dataset.card;
    
    navigate('back', thisCard)
    updateProgressBar('back', thisCardNum);
  })
})

document.querySelectorAll('.radio-group').forEach(function(item) {
  item.addEventListener('click', function(event) {

    const label = event.target.closest('label');

    if(label) {
      label.closest('.radio-group').querySelectorAll('label').forEach(function(item) {
        item.classList.remove('radio-block--active');
      })
    }
    label.classList.add('radio-block--active');
  })
})

document.querySelectorAll('label.checkbox-block input[type="checkbox"]').forEach(function(item) {
  item.addEventListener('change', function() {
    if(item.checked) {
      item.closest('label').classList.add('checkbox-block--active');
    } else {
      item.closest('label').classList.remove('checkbox-block--active');
    }
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

const checkBoxsValues = currentCard.querySelectorAll('[type="checkbox"]');

checkBoxsValues.forEach(function(item) {

  if(item.checked) {
    result.push({
      name: item.name,
      value: item.value
    })
  }
})

const inputValues = currentCard.querySelectorAll('[type="text"], [type="email"], [type=number]');

inputValues.forEach(function(item) {
  itemValue = item.value
  if(itemValue.trim() != '') {
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

function saveAnswer(number, data) {
  answers[number] = data; 
}

function isFilled(number) {
  if(answers[number].answer.length > 0) {
    return true
  } else {
    return false
  }
}


function validateEmail(email) {
  let pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  
  return pattern.test(email);
}

function checkOnRequired(number) {
  const currentCard = document.querySelector(`[data-card="${number}"]`);
  const requiredFields = currentCard.querySelectorAll("[required]");
  
  let isValidArray = [];
  

  requiredFields.forEach(function(item) {

    if(item.type === 'checkbox' && item.checked === false) {
      isValidArray.push(false);
    } else if(item.type === 'email') {
      if(validateEmail(item.value)) {
        isValidArray.push(true);
      } else {
        isValidArray.push(false);
      }
    }
  });


  if(isValidArray.indexOf(false) === -1) {
    return true
  } else {
    return false
  }
}

function updateProgressBar(direction, cardNum) {
  const cardsTotalNum = document.querySelectorAll('[data-card]').length;

  if(direction === 'next'){
    cardNum += 1
  } else if( direction === 'prev') {
    cardNum -= 1
  }

  const progress = ((cardNum * 100) / cardsTotalNum).toFixed();


  const progressBar = document.querySelector(`[data-card="${cardNum}"]`).querySelector('.progress');

  if(progressBar) {
    progressBar.querySelector('.progress__label strong').innerText = `${progress}%`;

    progressBar.querySelector('.progress__line-bar').style = `width: ${progress}%`;
  }

}

