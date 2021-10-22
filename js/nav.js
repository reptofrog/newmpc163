// Made by eeex.ru — 2021

'use strict';

let allNavA = document.querySelectorAll('.nav__a');
let nav = document.querySelector('.nav');
let navDecoration = document.querySelector('.nav__decoration');
let navDropdown = document.querySelector('.nav__dropdown');

function mouseoverEventHandlerNavA(ev) {
  let target = ev.target;

  // if (!target.classList.contains('nav__a') && !target.classList.contains('nav__dropdown')) {
  //   return
  // }

  let x = target.getBoundingClientRect().left;

  if (window.getComputedStyle(navDecoration).opacity === '0') {
    navDecoration.style.transitionProperty = 'opacity';
  } else {
    navDecoration.style.transitionProperty = 'all';
  }

  navDecoration.style.opacity = 1;
  navDecoration.style.width = target.offsetWidth + 'px';
  navDecoration.style.left = x + 'px';

  if (Array.from(target.parentNode.children).indexOf(target) >= 4) {
    navDecoration.classList.add('nav__decoration--outlined');
  } else {
    navDecoration.classList.remove('nav__decoration--outlined');
  }
}

function mouseleaveEventHandlerNav(ev) {
  navDecoration.style.opacity = 0;
}

nav.addEventListener('mouseleave', mouseleaveEventHandlerNav);

allNavA.forEach(el => {
  el.addEventListener('mouseenter', mouseoverEventHandlerNavA);
});
navDropdown.addEventListener('mouseenter', mouseoverEventHandlerNavA);

navDropdown.style.pointerEvents = 'unset';