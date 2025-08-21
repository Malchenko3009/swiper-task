// const swiperInstances = [];

// function getBreakpointSettings(sliderEl, width) {
//   if (width >= 1024)
//     return {
//       showNavigation: sliderEl.dataset.showNavigationDesktop === 'true',
//       showPagination: sliderEl.dataset.showPaginationDesktop === 'true',
//       slidesPerView: parseInt(sliderEl.dataset.slidesPerViewDesktop, 10) || 1,
//       spaceBetween: parseInt(sliderEl.dataset.spaceBetweenDesktop, 10) || 10,
//     };
//   if (width >= 580)
//     return {
//       showNavigation: sliderEl.dataset.showNavigationTablet === 'true',
//       showPagination: sliderEl.dataset.showPaginationTablet === 'true',
//       slidesPerView: parseInt(sliderEl.dataset.slidesPerViewTablet, 10) || 1,
//       spaceBetween: parseInt(sliderEl.dataset.spaceBetweenTablet, 10) || 10,
//     };
//   return {
//     showNavigation: sliderEl.dataset.showNavigationMobile === 'true',
//     showPagination: sliderEl.dataset.showPaginationMobile === 'true',
//     slidesPerView: parseInt(sliderEl.dataset.slidesPerViewMobile, 10) || 1,
//     spaceBetween: parseInt(sliderEl.dataset.spaceBetweenMobile, 10) || 10,
//   };
// }

// function initVariantSliders() {
//   swiperInstances.forEach((swiper) => swiper.destroy(true, true));
//   swiperInstances.length = 0;

//   document.querySelectorAll('.variant-images-block').forEach((sliderEl) => {
//     const slides = sliderEl.querySelectorAll('.swiper-slide');
//     const slidesCount = slides.length;

//     const enableSlider = sliderEl.dataset.enableSlider === 'true';
//     if (!enableSlider || slidesCount <= 1) {
//       sliderEl.classList.remove('swiper');
//       sliderEl.querySelector('.swiper-wrapper')?.classList.remove('swiper-wrapper');
//       slides.forEach((slide) => slide.classList.remove('swiper-slide'));
//       return;
//     }

//     sliderEl.classList.add('swiper');
//     sliderEl.querySelector('.swiper-wrapper')?.classList.add('swiper-wrapper');
//     slides.forEach((slide) => slide.classList.add('swiper-slide'));

//     const width = window.innerWidth;
//     const bpSettings = getBreakpointSettings(sliderEl, width);
//     const nextBtn = sliderEl.querySelector('.swiper-button-next');
//     const prevBtn = sliderEl.querySelector('.swiper-button-prev');
//     if (bpSettings.showNavigation) {
//       nextBtn.style.display = 'flex';
//       prevBtn.style.display = 'flex';
//     } else {
//       nextBtn.style.display = 'none';
//       prevBtn.style.display = 'none';
//     }

//     const paginationEl = sliderEl.querySelector('.swiper-pagination');
//     paginationEl.style.display = bpSettings.showPagination ? 'block' : 'none';

//     const enableAutoplay = sliderEl.dataset.enableAutoplay === 'true';
//     const autoplayDelay = parseInt(sliderEl.dataset.autoplayDelay, 10) || 3000;

//     const maxSlides = Math.max(
//       parseInt(sliderEl.dataset.slidesPerViewDesktop, 10) || 1,
//       parseInt(sliderEl.dataset.slidesPerViewTablet, 10) || 1,
//       parseInt(sliderEl.dataset.slidesPerViewMobile, 10) || 1
//     );

//     const swiper = new Swiper(sliderEl, {
//       loop: slidesCount > maxSlides,
//       slidesPerView: bpSettings.slidesPerView,
//       spaceBetween: bpSettings.spaceBetween,
//       autoplay: enableAutoplay
//         ? {
//             delay: autoplayDelay,
//             disableOnInteraction: false,
//           }
//         : false,
//       observer: true,
//       observeParents: true,
//       pagination: bpSettings.showPagination
//         ? {
//             el: paginationEl,
//             clickable: true,
//           }
//         : false,
//       navigation: bpSettings.showNavigation
//         ? {
//             nextEl: nextBtn,
//             prevEl: prevBtn,
//           }
//         : false,
//     });

//     swiperInstances.push(swiper);
//   });
// }

// function debounce(fn, delay) {
//   let timeoutId;
//   return function () {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(fn, delay);
//   };
// }

// const debouncedResizeHandler = debounce(() => {
//   initVariantSliders();
// }, 300);

// window.addEventListener('resize', debouncedResizeHandler);
// document.addEventListener('DOMContentLoaded', initVariantSliders);
// document.addEventListener('shopify:section:load', initVariantSliders);


