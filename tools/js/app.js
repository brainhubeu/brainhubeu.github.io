const debounce = require('lodash.debounce');

$(document).ready(function() {

  const screenSizes = {
    veryLargeScreen: '1600',
    largeScreen: '1440',
    bigScreen: '1280',
    mediumScreen: '992',
    smallScreen: '768',
    extraSmallScreen: '460',
    xXSmallScreen: '360',
  };

  $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: screenSizes.extraSmallScreen,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: screenSizes.smallScreen,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: screenSizes.mediumScreen,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: screenSizes.bigScreen,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 3000,
  });
});

const setStylesForMultiColumn = (itemsContainer, visibleItems, margin, itemsInOneLine) => {
  let maxHeight = 0;
  let top = 0;
  let containerHeight = 0;

  visibleItems.forEach((item, index) => {
    const left = !(index % itemsInOneLine) ? 0 : `${item.clientWidth + 2 * margin}px`;
    if (!(index % itemsInOneLine)) {
      const nextItemHeight = visibleItems[index + 1] ? visibleItems[index + 1].clientHeight : 0;
      maxHeight = Math.max(item.clientHeight, nextItemHeight);
      top = containerHeight + Math.floor(index / itemsInOneLine) * 2 * margin;
      containerHeight += maxHeight;
    }
    item.style.cssText = `
      display: block;
      position: absolute;
      height: ${maxHeight}px;
      left: ${left};
      top: ${top}px;
    `;
  });

  itemsContainer.style.height = `${top + maxHeight + margin}px`;
};

const setStylesForSingleColumn = (itemsContainer, visibleItems, margin) => {
  let containerHeight = 0;

  visibleItems.forEach((item, index) => {
    const top = containerHeight + index * 2 * margin;
    containerHeight += item.clientHeight;

    itemsContainer.style.height = `${(top + item.clientHeight + margin)}px`;

    item.style.cssText = `
      display: block;
      position: absolute;
      left: 0;
      top: ${top}px;
    `;
  });
};

const filter = category => {
  const allItems = [...document.querySelectorAll('.tabs__content li')];
  const itemsContainer = document.querySelectorAll('.tabs__content')[0];

  const visibleItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
  const hiddenItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];

  const margin = 16; // equal 1rem
  const rwdBreakpoint = 768;
  const itemsInOneLine = window.innerWidth <= rwdBreakpoint ? 1 : 2;

  hiddenItems.forEach(element => element.style.cssText = 'display: none');

  itemsInOneLine !== 1
    ? setStylesForMultiColumn(itemsContainer, visibleItems, margin, itemsInOneLine)
    : setStylesForSingleColumn(itemsContainer, visibleItems, margin);
};

window.onload = function() {
  filter('all');
  const tabNavButtons = document.querySelectorAll('.tabs-nav__button');

  // click button in menu
  tabNavButtons.forEach(link => {
    link.addEventListener('click', function() {
      // toggle class in tab nav buttons
      if (!this.classList.contains('active')) {
        tabNavButtons.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');
        filter(this.dataset.category);
      } else {
        return false;
      }
    });
  });

  // resize window
  window.onresize = debounce(function() {
    const activeCategory = document.querySelector('.tabs-nav__button.active').dataset.category;
    filter(activeCategory);
  }, 300);
};
