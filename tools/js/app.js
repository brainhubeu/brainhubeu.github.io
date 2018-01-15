document.addEventListener('DOMContentLoaded', function () {
    var simple = document.querySelector('.js_slider');

    lory(simple, {
        infinite: 7,
        slidesToScroll: 1
    });
});