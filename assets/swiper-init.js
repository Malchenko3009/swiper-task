function initVariantSliders() {
  document.querySelectorAll('.variant-images-block').forEach((sliderEl) => {
    const slides = sliderEl.querySelectorAll('.swiper-slide');
    const slidesCount = slides.length;

    const enableSlider = sliderEl.dataset.enableSlider === 'true';
    const showNavigation = sliderEl.dataset.showNavigation === 'true';
    const showPagination = sliderEl.dataset.showPagination === 'true';
    const slidesPerViewDesktop = parseInt(sliderEl.dataset.slidesPerViewDesktop, 10) || 1;
    const slidesPerViewTablet = parseInt(sliderEl.dataset.slidesPerViewTablet, 10) || 1;
    const slidesPerViewMobile = parseInt(sliderEl.dataset.slidesPerViewMobile, 10) || 1;
    const spaceBetween = parseInt(sliderEl.dataset.spaceBetween, 10) || 10;
    const enableAutoplay = sliderEl.dataset.enableAutoplay === 'true';
    const autoplayDelay = parseInt(sliderEl.dataset.autoplayDelay, 10) || 3000;

    const arrows = sliderEl.querySelectorAll('.swiper-button-next, .swiper-button-prev');

    const maxSlides = Math.max(slidesPerViewDesktop, slidesPerViewTablet, slidesPerViewMobile);
    if (!enableSlider || slidesCount <= 1) {
      sliderEl.classList.remove('swiper');
      sliderEl.querySelector('.swiper-wrapper')?.classList.remove('swiper-wrapper');
      slides.forEach((slide) => slide.classList.remove('swiper-slide'));
      return;
    }
    if (showNavigation) {
      arrows.forEach((arrow) => (arrow.style.display = 'flex'));
    }
    sliderEl.classList.add('swiper');
    sliderEl.querySelector('.swiper-wrapper')?.classList.add('swiper-wrapper');
    slides.forEach((slide) => slide.classList.add('swiper-slide'));

    new Swiper(sliderEl, {
      loop: slidesCount > maxSlides,
      slidesPerView: slidesPerViewDesktop,
      spaceBetween: spaceBetween,
      autoplay: enableAutoplay
        ? {
            delay: autoplayDelay,
            disableOnInteraction: false,
          }
        : false,
      pagination: showPagination
        ? {
            el: sliderEl.querySelector('.swiper-pagination'),
            clickable: true,
          }
        : false,
      navigation: showNavigation
        ? {
            nextEl: sliderEl.querySelector('.swiper-button-next'),
            prevEl: sliderEl.querySelector('.swiper-button-prev'),
          }
        : false,
      breakpoints: {
        320: {
          slidesPerView: slidesPerViewMobile,
        },
        768: {
          slidesPerView: slidesPerViewTablet,
        },
        1024: {
          slidesPerView: slidesPerViewDesktop,
        },
      },
    });
  });
}

document.addEventListener('DOMContentLoaded', initVariantSliders);
document.addEventListener('shopify:section:load', initVariantSliders);
