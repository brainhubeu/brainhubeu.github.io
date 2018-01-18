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
    filter( activeCategory ? '' : activeCategory);
  };

  function filter(category) {
    category = category || 'all';
    const itemsContainer = document.querySelectorAll('.tabs__content');
    const allItems = [...document.querySelectorAll('.tabs__content li')];
    const firstVisibleItem = allItems.find(element => !element.hidden);
    const itemHeight = firstVisibleItem.clientHeight;
    const itemWidth = firstVisibleItem.clientWidth;
    const fiteredItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
    const fiteredItemsLength = fiteredItems.length;
    const notFilteredItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];
    const margin = 16;  // equal 1rem
    const rwdBreakpoint = 768;
    let itemsInOneLine = 2;

    window.innerWidth <= rwdBreakpoint ? itemsInOneLine = 1 : false;

    console.log(itemsInOneLine);

  
    //layout generation
    itemsContainer[0].style.height = `${(itemHeight + 2*margin) * Math.round(fiteredItemsLength / itemsInOneLine)}px`;
  
    fiteredItems.forEach((element, key) => {
      const left = !(key % itemsInOneLine) ? 0 : `${itemWidth + 2 * margin}px`;
      const top = `${Math.floor(key / itemsInOneLine) * (itemHeight + 2 * margin)}px`;

      element.style.cssText = `
        display: block;
        position: absolute;
        left: ${left};
        top: ${top};
      `;

      element.hidden = false;
    });

    notFilteredItems.forEach((element, key) => {
      element.hidden = true;
      element.style.cssText = 'display: none';
    });
  }
}
