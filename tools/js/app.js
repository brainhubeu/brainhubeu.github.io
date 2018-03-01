$(document).ready(function(){

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

window.onload = function() {
  filter();
  const tabNavButtons = document.querySelectorAll('.tabs-nav__button');

  const arrow = document.querySelector('.top-banner__arrow');
  const nextSection = document.querySelector('.intro__container');

  arrow.addEventListener('click', () => {
    window.scrollBy({
      top: nextSection.getBoundingClientRect().top + 1,
      left: 0,
      behavior: 'smooth',
    })
  });

  // click button in menu
  tabNavButtons.forEach(link => {
    link.addEventListener('click', function() {
      // toggle class in tab nav buttons
      if (!this.classList.contains('active')) {
        tabNavButtons.forEach(function(el) {
          el.classList.remove('active')
        });
        this.classList.add('active');
        filter(this.dataset.category);
      } else {
        return false;
      }
    });
  });

  // resize window
  window.onresize = function() {
    const activeCategory = document.querySelector('.tabs-nav__button.active').dataset.category;
    filter(activeCategory);
  };

  function setHeight(filteredItems) {
    let maxHeight = 0;
    let top = 0;
    const margin = 16; // equal 1rem
    let containerHeight = 0;

    filteredItems.forEach((item, index) => {
      if (!(index % 2)) {
        const nextItemHeight = filteredItems[index + 1] ? filteredItems[index + 1].clientHeight : 0;
        maxHeight = Math.max(item.clientHeight, nextItemHeight);
        top = containerHeight + Math.floor(index / 2) * 2 * margin;
        containerHeight += maxHeight;
      }
      item.style.height = `${maxHeight}px`;
      item.style.top = `${top}px`;
    });

    document.querySelectorAll('.tabs__content')[0].style.height = `${top + maxHeight + margin}px`;
  }

  function filter(category) {
    category = category || 'all';
    const itemsContainer = document.querySelectorAll('.tabs__content');
    const allItems = [...document.querySelectorAll('.tabs__content li')];
    const firstVisibleItem = allItems.find(element => !element.hidden);
    const itemHeight = firstVisibleItem.clientHeight;
    const itemWidth = firstVisibleItem.clientWidth;
    const filteredItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
    const filteredItemsLength = filteredItems.length;
    const notFilteredItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];
    const margin = 16; // equal 1rem
    const rwdBreakpoint = 768;
    let itemsInOneLine = 2;

    window.innerWidth <= rwdBreakpoint ? itemsInOneLine = 1 : false;

    // layout generation
    itemsContainer[0].style.height = `${(itemHeight + 2*margin) * Math.round(filteredItemsLength / itemsInOneLine)}px`;

    filteredItems.forEach((element, key) => {
      const left = !(key % itemsInOneLine) ? 0 : `${itemWidth + 2 * margin}px`;

      element.style.cssText = `
        display: block;
        position: absolute;
        left: ${left};
      `;

      element.hidden = false;
    });

    notFilteredItems.forEach(element => {
      element.hidden = true;
      element.style.cssText = 'display: none';
    });

    itemsInOneLine === 2 && setHeight(allItems.filter(item => category === 'all' || item.dataset.category === category));
  }
};
