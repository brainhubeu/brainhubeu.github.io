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

const setStyleForMultiColumn = visibleItems => {
  let maxHeight = 0;
  let top = 0;
  let containerHeight = 0;
  const margin = 16;

  visibleItems.forEach((item, index) => {
    const left = !(index % 2) ? 0 : `${item.clientWidth + 2 * margin}px`;
    if (!(index % 2)) {
      const nextItemHeight = visibleItems[index + 1] ? visibleItems[index + 1].clientHeight : 0;
      maxHeight = Math.max(item.clientHeight, nextItemHeight);
      top = containerHeight + Math.floor(index / 2) * 2 * margin;
      containerHeight += maxHeight;
    }
    item.style.cssText = `
      display: block;
      position: absolute;
      left: ${left};
      height: ${maxHeight}px;
      top: ${top}px;
    `;
  });

  document.querySelectorAll('.tabs__content')[0].style.height = `${top + maxHeight + margin}px`;
};

const filter = category => {
  const itemsContainer = document.querySelectorAll('.tabs__content');
  const allItems = [...document.querySelectorAll('.tabs__content li')];

  const firstVisibleItem = allItems.find(element => element.style.display !== 'none');
  const itemHeight = firstVisibleItem.clientHeight;
  const itemWidth = firstVisibleItem.clientWidth;

  const visibleItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
  const hiddenItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];

  const margin = 16; // equal 1rem
  const rwdBreakpoint = 768;
  const itemsInOneLine = window.innerWidth <= rwdBreakpoint ? 1 : 2;

  // layout generation
  itemsContainer[0].style.height = `${(itemHeight + 2*margin) * Math.round(visibleItems.length / itemsInOneLine)}px`;

  hiddenItems.forEach(element => element.style.cssText = 'display: none');

  itemsInOneLine === 2
    ? setStyleForMultiColumn(allItems.filter(item => category === 'all' || item.dataset.category === category))
    : visibleItems.forEach((element, key) => {
      const top = `${Math.floor(key / itemsInOneLine) * (itemHeight + 2 * margin)}px`;
      const left = !(key % itemsInOneLine) ? 0 : `${itemWidth + 2 * margin}px`;

      element.style.cssText = `
      display: block;
      position: absolute;
      left: ${left};
      top: ${top};
    `;
    });
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
