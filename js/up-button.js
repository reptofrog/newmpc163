// Made by eeex.ru — 2021

'use strict';

let lastKnownScrollPosition = 0;
let ticking = false;
let isScrollingDown = false;
let prevScrollPosition = document.body.getBoundingClientRect().top;

let upButton = document.querySelector('.up-button');

document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (prevScrollPosition - 500 > lastKnownScrollPosition) {
        isScrollingDown = false;
        prevScrollPosition = lastKnownScrollPosition;
      } else if (prevScrollPosition + 100 < lastKnownScrollPosition){
        isScrollingDown = true;
        prevScrollPosition = lastKnownScrollPosition;
      }
      
      if (lastKnownScrollPosition > 1200 && !isScrollingDown) {
        upButton.classList.add('up-button--is-shown');  
      } else {
        upButton.classList.remove('up-button--is-shown'); 
      };
      
      ticking = false;
    });

    ticking = true;
  }
});

upButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
