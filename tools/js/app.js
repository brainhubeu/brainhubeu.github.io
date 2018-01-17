
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