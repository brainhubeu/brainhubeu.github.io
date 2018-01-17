window.onload = function() {
  filter();
  const tabNavButtons = document.querySelectorAll('.tabs-nav__button');

  tabNavButtons.forEach(link => {
    link.addEventListener('click', function() {
      // toggle class in tab nav buttons
      if (!this.classList.contains('active')) {
        tabNavButtons.forEach(function(el) {
          el.classList.remove('active')
        });
        this.classList.add('active');

        filter(this.dataset.category);
        console.log(this.dataset.category);
      } else {
        return false;
      }
    });
  });

  function filter(category) {
    category = category || 'all';
    const allItems = [...document.querySelectorAll('.tabs__content li')];
    const notFilteredItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];
    const itemsContainer = document.querySelectorAll('.tabs__content');
    const firstVisibleItem = allItems.find(element => !element.hidden);
    const itemHeight = firstVisibleItem.clientHeight;
    const itemWidth = firstVisibleItem.clientWidth;
    const margin = 16;  // equal 1rem
    const fiteredItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
    const fiteredItemsLength = fiteredItems.length;

  
    //layout generation
    itemsContainer[0].style.height = `${(itemHeight + 2*margin) * Math.round(fiteredItemsLength / 2)}px`;
  
    fiteredItems.forEach((element, key) => {
      const left = key % 2 ? `${itemWidth + 2 * margin}px` : 0;
      const top = `${Math.floor(key / 2) * (itemHeight + 2 * margin)}px`;

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