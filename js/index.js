// Made by eeex.ru — 2021

'use strict';

const userID = 'user_wFLErkzxqxqvZsPtilpJc';

const l = console.log.bind(console);
const query = document.querySelector.bind(document);
const queryAll  = document.querySelectorAll.bind(document);

l('%cMADE BY EEEX.RU — 2021', 'background: black; color: white; padding: 10px; font-family: "Roboto", sans-serif; font-weight: 900');

function debounce(func){
  /**
   * Prevents a function from executing too often (e.g. during a window resize event)
   */
  var timer;
  return function(event){
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
}


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Prevent anchor dragging

queryAll('a').forEach(el => {
  el.ondragstart = () => {
    return false;
  };
})


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Scroll buttons

let heroButton = query('.hero__button');
let allNavAPortfolio = queryAll('.nav__a--portfolio');

let services = query('.services');
let portfolio = query('.portfolio');

if (heroButton) {
  heroButton.addEventListener('click', () => {
    window.scrollTo({ top: services.getBoundingClientRect().top - 80 - document.body.getBoundingClientRect().top, behavior: 'smooth' });
  })

  allNavAPortfolio.forEach((el) => {
    el.addEventListener('click', () => {
      if (overlay.classList.contains('overlay--is-shown')) {
        closePopup();
        hideOverlay();
      }
      setTimeout(() => {
        window.scrollTo({ top: portfolio.getBoundingClientRect().top - 80 - document.body.getBoundingClientRect().top, behavior: 'smooth' });
      }, 0.5)
    })
  })
}


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Overlay, sidebar and popup

let header = query('.header');
let headerMenuButton = query('.header__menu-button');
let overlay = query('.overlay');
let overlayAside = query('.overlay__aside');
let overlayMenuButton = query('.overlay__menu-button');
let popup = query('.popup');
let popupCloseButton = query('.popup__close-button');

let headerButton = query('.header__button');
let sequenceButton = query('.sequence__button');

let asideButton = query('.aside__button');

let prevScrollY;

function validatePopupPlausibility() {
  if (window.innerWidth <= 650) {
    closePopup();
    asideButton.classList.add('aside__button--is-shown');
  } else {
    openPopup();
    asideButton.classList.remove('aside__button--is-shown');
  }
}

function resizeHandlerWindow() {
  let headerMenuButtonPos = headerMenuButton.getBoundingClientRect();
  let [x, y] = [headerMenuButtonPos.left, headerMenuButtonPos.top];
  overlayMenuButton.style.left = x + 'px';
  overlayMenuButton.style.top = y + 'px';

  // validatePopupPlausibility();
}

function showOverlay({isSidebarShown = false} = {}) {
  prevScrollY = window.scrollY;

  header.classList.add('header--firefox-workaround');
  header.style.transform = `translateY(${window.scrollY}px)`;

  document.body.style.top = -window.scrollY + 'px';
  document.body.classList.add('body--is-scroll-locked');

  overlay.classList.add('overlay--is-shown');
  overlayMenuButton.style.display = 'none';

  if (isSidebarShown) {
    openAside();
  }
}

function hideOverlay() {
  document.body.style.top = 'unset';
  document.body.classList.remove('body--is-scroll-locked');

  window.scrollTo(0, prevScrollY);

  overlay.classList.remove('overlay--is-shown');

  closeAside();

  header.classList.remove('header--firefox-workaround');
  header.style.transform = 'unset';
}

function openPopup() {
  popup.classList.remove('popup--is-with-sidebar');
  popup.classList.add('popup--is-shown');
  if (overlayAside.classList.contains('overlay__aside--is-shown')) {
    popup.classList.add('popup--is-with-sidebar');
  }
}

function closePopup() {
  popup.classList.remove('popup--is-shown');
}

function openAside() {
  overlayAside.classList.add('overlay__aside--is-shown');
  overlayMenuButton.style.display = 'unset';
}

function closeAside() {
  overlayAside.classList.remove('overlay__aside--is-shown');
}

// For headerMenuButton and overlayMenuButton
function clickHandlerGeneralMenuButton() {
  if (overlay.classList.contains('overlay--is-shown')) {
    hideOverlay();
    // closePopup();
  } else {
    resizeHandlerWindow();
    showOverlay({isSidebarShown: true});
    // validatePopupPlausibility();
  }
}

function clickHandlerHeaderButton() {
  // TODO: Add YM goals
  showOverlay();
  openPopup();
}

function clickHandlerSequenceButton() {
  // TODO: Add YM goals
  showOverlay();
  openPopup();
}

headerMenuButton.addEventListener('click', clickHandlerGeneralMenuButton);
overlayMenuButton.addEventListener('click', clickHandlerGeneralMenuButton);
popupCloseButton.addEventListener('click', () => {
  closePopup();
  hideOverlay();
});

headerButton.addEventListener('click', clickHandlerHeaderButton);
sequenceButton.addEventListener('click', clickHandlerSequenceButton);

asideButton.addEventListener('click', () => {
  overlayMenuButton.style.display = 'none';
  closeAside();
  openPopup();
});

window.addEventListener('resize', debounce(resizeHandlerWindow));


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Sequence

function observerCallback() {
    animate();
    observer.disconnect();
}
  
function animate() {
  let allSequenceSubsequence = queryAll('.sequence__subsequence');

  function showItem(i) {
    allSequenceSubsequence[i].classList.add('sequence__subsequence--is-shown')
  }
  
  showItem(0);
  allSequenceSubsequence.forEach((el, i) => {
    if ((i + 1) !== allSequenceSubsequence.length) {
      allSequenceSubsequence[i].addEventListener('transitionend', () => {showItem(i + 1)});
    }
  });
}
  
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) observerCallback();
  });
}, {threshold: 0.9});

observer.observe(query('.sequence__wrapper'));


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Team slider

let teamMembers = query('.team__members');
let teamControlLeft = query('.team__control--left')
let teamControlRight = query('.team__control--right')

let flickity = new Flickity(teamMembers, {
  cellAlign: 'left',
  contain: true,
  groupCells: true,
  pageDots: false,
  prevNextButtons: false,
});

flickity.on('change', () => {
  if ((flickity.selectedIndex + 1) == flickity.slides.length) {
    // Slider end reached
    teamControlLeft.src = 'img/control__left.svg';
    teamControlRight.src = 'img/control__right--deactivated.svg';
  } else if ((flickity.selectedIndex + 1) == 1) {
    // Slider beginning reached
    teamControlLeft.src = 'img/control__left--deactivated.svg';
    teamControlRight.src = 'img/control__right.svg';
  } else {
    // In the middle of the slider
    teamControlLeft.src = 'img/control__left.svg';
    teamControlRight.src = 'img/control__right.svg';
  }
})

teamControlLeft.addEventListener('click', () => {flickity.previous()})
teamControlRight.addEventListener('click', () => {flickity.next()})


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Portfolio slider

let portfolioCases = query('.portfolio__cases');
let portfolioControlLeft = query('.portfolio__control--left')
let portfolioControlRight = query('.portfolio__control--right')

let flickityPortfolio = new Flickity(portfolioCases, {
  cellAlign: 'left',
  contain: true,
  groupCells: true,
  pageDots: true,
  prevNextButtons: false,
});

flickityPortfolio.on('change', () => {
  if ((flickityPortfolio.selectedIndex + 1) == flickityPortfolio.slides.length) {
    // Slider end reached
    portfolioControlLeft.src = 'img/control__left.svg';
    portfolioControlRight.src = 'img/control__right--deactivated.svg';
  } else if ((flickityPortfolio.selectedIndex + 1) == 1) {
    // Slider beginning reached
    portfolioControlLeft.src = 'img/control__left--deactivated.svg';
    portfolioControlRight.src = 'img/control__right.svg';
  } else {
    // In the middle of the slider
    portfolioControlLeft.src = 'img/control__left.svg';
    portfolioControlRight.src = 'img/control__right.svg';
  }
})

portfolioControlLeft.addEventListener('click', () => {flickityPortfolio.previous()})
portfolioControlRight.addEventListener('click', () => {flickityPortfolio.next()})


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Postscript expand button

let postscriptP = query('.postscript__p');
let postscriptExpand = query('.postscript__expand');

postscriptExpand.addEventListener('click', () => {
  postscriptP.innerHTML += '<br><br>' + postscriptP.getAttribute('data-hidden-text');
  postscriptExpand.style.display = 'none';
})


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// EmailJS — Popup

let popupButton = query('.popup__button');
let popupButtonSpan = query('.popup__button .button__span');
let popupForm = query('.popup__form');
let popupInputName = popupForm[0];
let popupInputPhone = popupForm[1];
let popupH1 = query('.popup__h1');

function clickHandlerPopupButton(ev) {
  ev.preventDefault();

  popupForm.reportValidity();

  if (popupInputName.value === '' || popupInputPhone.value.length < 7) {
    return
  }

  let popupButtonOldText = popupButtonSpan.textContent;
  popupButton.classList.add('button--disabled');
  popupButtonSpan.textContent = 'Отправка…';

  let templateParams = {
    fromName: popupInputName.value,
    fromPhone: popupInputPhone.value,
  };

  emailjs.send('service_yandex', 'template_default', templateParams, userID)
  .then(function(response) {
    popupButton.style.display = 'none';
    popupForm.style.display = 'none';
    popupH1.innerHTML = 'Спасибо за Вашу заявку! <br><span class="popup__span">Мы свяжемся с вами в ближайшее время</span>';
    console.log('EmailJS — письмо отправлено', response.status, response.text);
    // TODO: sendGoal({goalName: consultSource});
  }, function(error) {
    popupButton.classList.remove('button--disabled');
    popupButtonSpan.textContent = popupButtonOldText;
    popupH1.innerHTML = 'Ошибка отправки <br><span class="popup__span">Пожалуйста, попробуйте ещё раз</span>';
    console.log('Ошибка EmailJS!', error);
  });
}

popupButton.addEventListener('click', clickHandlerPopupButton);


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// EmailJS — Consult blocks

let allConsultButton = queryAll('.consult__button');
let allConsultButtonSpan = queryAll('.consult__button .button__span')
let allConsultForm = queryAll('.consult__form');
let allConsultH1 = queryAll('.consult__h1');
let allConsultP = queryAll('.consult__p');
let allConsultInputPhone = queryAll('[name=consult__input--phone]');

function inputHandlerConsultInputPhone(event) {
  l(event);
  let target = event.target;
  // Связка input-ов
  // allConsultInputPhone.forEach(el => {
  //   setTimeout(() => {el.value = target.value;}, 1)
  // });
}

function clickHandlerConsultButton(ev) {
  ev.preventDefault();

  allConsultForm.forEach(el => {
    el.reportValidity();
  });

  if (allConsultInputPhone[0].value.length < 7) {
    return
  }

  let consultButtonOldText = allConsultButton[0].textContent;
  allConsultButton.forEach(el => {
    el.classList.add('button--disabled');
  });
  allConsultButtonSpan.forEach(el => {
    el.textContent = 'Отправка…';
  });

  let templateParams = {
    fromName: 'Не указано',
    fromPhone: allConsultInputPhone[0].value,
  };

  emailjs.send('service_yandex', 'template_default', templateParams, userID)
  .then(function(response) {
    allConsultButton.forEach(el => {
      el.style.display = 'none';
    });
    allConsultForm.forEach(el => {
      el.style.display = 'none';
    });
    allConsultH1.forEach(el => {
      el.innerHTML = 'Спасибо за Вашу заявку! <br><span class="consult__span consult__span--thin">Мы свяжемся с вами в ближайшее время</span>';
    });
    allConsultP.forEach(el => {
      el.style.display = 'none';
    });
    console.log('EmailJS — письмо отправлено', response.status, response.text);
    // TODO: sendGoal({goalName: consultSource});
  }, function(error) {
    allConsultButton.forEach(el => {
      el.classList.remove('button--disabled');
    });
    allConsultButton.forEach(el => {
      el.textContent = consultButtonOldText;
    });
    allConsultH1.forEach(el => {
      el.innerHTML = 'Ошибка отправки <br><span class="consult__span consult__span--thin">Пожалуйста, попробуйте ещё раз</span>';
    });
    console.log('Ошибка EmailJS!', error);
  });
}

allConsultButton.forEach(el => {
  el.addEventListener('click', clickHandlerConsultButton);
});

allConsultInputPhone.forEach(el => {
  el.addEventListener('input', inputHandlerConsultInputPhone);
});


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// IMask

let maskPhoneOptions = {
  mask: '+{7} (000) 000-00-00'
};

allConsultInputPhone.forEach(el => {
  IMask(el, maskPhoneOptions);
});

IMask(popupInputPhone, maskPhoneOptions);
