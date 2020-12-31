'use strict';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());


///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const h1 = document.querySelector('h1');
;




// page navigation
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });



document.querySelector('.nav__links').addEventListener('click', function(e) {
  if(e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})  ;


// const h11 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));


const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  
  if(!clicked) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate tab content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});








//navgation
const nav = document.querySelector('.nav');


const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;

  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));



//Sticky navigation
// window.addEventListener('scroll', function(e) {
//   if(window.scrollY > 100) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// })



//Sticky navigation using Intersection API
const section1 = document.querySelector('#section--1');

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     if(entry.isIntersecting === true) {
//       nav.classList.add('sticky');
//     } else {
//       nav.classList.remove('sticky');
//     }

//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1
// };
// const observer =  new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);



const header = document.querySelector('.header');

const stickyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObsever = new IntersectionObserver(stickyNav, {root:null, threshold: 0, rootMargin: '-90px'});

headerObsever.observe(header);


//Making sections visible
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  console.log(entries);
  // const [entry] = entries;
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
  
}


const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: [0.15, 0.9]});
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});




//Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;



  //Replace src with data src
  entry.target.setAttribute('src', entry.target.dataset.src);
  
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });


  observer.unobserve(entry.target);
}


const imgObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: '200px'});
imgTargets.forEach(img => imgObserver.observe(img));




//Slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;
const maxSlide = slides.length;
console.log(btnLeft);
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';
// sliders.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));





//Slide functions
const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const gotoSlide = function(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}
const moveForward = function() {
  if(currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  
  gotoSlide(currentSlide);
  activateDot(currentSlide);
}
const moveBackward = function() { 
  if(currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  
  gotoSlide(currentSlide);
  activateDot(currentSlide);
}
const createDots = function() {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
  activateDot(0);
}
createDots();
gotoSlide(0);
btnRight.addEventListener('click', moveForward);
btnLeft.addEventListener('click', moveBackward);
const slideInterval = setInterval(moveForward, 3000);


document.addEventListener('keydown', function(e) {
  e.key === 'ArrowLeft' && moveBackward();
  e.key === 'ArrowRight' && moveForward();
}); 

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
    // e.target.classList.remove('dots__dot--active');
    // e.target.classList.add('dots__dot--active');
  }
}); 


let dotts = document.querySelector(`.dots__dot[data-slide="${0}"]`);




