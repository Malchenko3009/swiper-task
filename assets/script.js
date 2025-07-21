// document.addEventListener('DOMContentLoaded', function () {
//   const radios = document.querySelectorAll('input[name="id"]');
//   const variantBlocks = document.querySelectorAll('.variant-block');

//   function showVariantBlock(selectedId) {
//     variantBlocks.forEach((block) => {
//       const blockId = block.dataset.variantId;
//       if (blockId === selectedId) {
//         block.style.display = 'block';
//       } else {
//         block.style.display = 'none';
//       }
//     });
//   }

//   function activeLabel(selectRadio) {
//     radios.forEach((radio) => {
//       if (radio === selectRadio) {
//         radio.parentElement.classList.add('active');
//       } else {
//         radio.parentElement.classList.remove('active');
//       }
//     });
//   }

//   const checkedRadio = Array.from(radios).find((r) => r.checked);
//   if (checkedRadio) {
//     showVariantBlock(checkedRadio.dataset.variantId);
//     activeLabel(checkedRadio);
//   } else if (radios.length > 0) {
//     const firstRadio = radios[0];
//     firstRadio.checked = true;
//     showVariantBlock(firstRadio.dataset.variantId);
//     activeLabel(firstRadio);
//   }

//   radios.forEach((radio) => {
//     radio.addEventListener('change', function () {
//       showVariantBlock(radio.dataset.variantId);
//       activeLabel(radio);
//     });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   // Знаходимо всі кольорові варіанти
//   const colorSwatches = document.querySelectorAll('.product-form__input--swatch [data-value]');

//   // Додаємо обробник кліку для кожного кольору
//   colorSwatches.forEach((swatch) => {
//     swatch.addEventListener('click', function (event) {
//       // Забороняємо стандартну поведінку (перехід по URL)
//       event.preventDefault();

//       // Отримуємо обраний колір
//       const selectedColor = this.getAttribute('data-value');

//       // Оновлюємо інтерфейс
//       updateVisibleImages(selectedColor);

//       // Оновлюємо URL без перезавантаження сторінки
//       const newUrl = new URL(window.location.href);
//       newUrl.searchParams.set('variant', this.closest('[data-variant-id]').getAttribute('data-variant-id'));
//       window.history.pushState({}, '', newUrl);
//     });
//   });

//   // Функція для оновлення видимих зображень
//   function updateVisibleImages(selectedColor) {
//     // Знаходимо всі блоки з зображеннями варіантів
//     const variantBlocks = document.querySelectorAll('.variant-block');

//     variantBlocks.forEach((block) => {
//       const variantTitle = block.querySelector('h3').textContent;

//       // Перевіряємо, чи містить назва варіанту обраний колір
//       if (variantTitle.includes(selectedColor)) {
//         block.style.display = 'block';

//         // Ініціалізуємо/оновлюємо Swiper для видимого блоку
//         const slider = block.querySelector('.swiper');
//         if (slider && !slider.swiper) {
//           new Swiper(slider, {
//             // ваші налаштування Swiper
//             navigation: {
//               nextEl: '.swiper-button-next',
//               prevEl: '.swiper-button-prev',
//             },
//             pagination: {
//               el: '.swiper-pagination',
//               clickable: true,
//             },
//           });
//         }
//       } else {
//         block.style.display = 'none';
//       }
//     });
//   }

//   // Обробляємо початковий стан на основі URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const initialVariant = urlParams.get('variant');
//   if (initialVariant) {
//     const variantBlock = document.querySelector(`.variant-block[data-variant-id="${initialVariant}"]`);
//     if (variantBlock) {
//       const variantTitle = variantBlock.querySelector('h3').textContent;
//       updateVisibleImages(variantTitle);
//     }
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
  const colorButtons = document.querySelectorAll('.product-form__input--swatch [data-value]');
  const variantBlocks = document.querySelectorAll('.variant-block');
  const variantInputs = document.querySelectorAll('input[name="id"]');

  function showVariantPhotos(variantId) {
    let found = false;

    variantBlocks.forEach((block) => {
      if (block.dataset.variantId === variantId) {
        block.style.display = 'block';
        found = true;
      } else {
        block.style.display = 'none';
      }
    });
  }

  colorButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const colorValue = this.getAttribute('data-value');
      const matchingVariant = Array.from(variantBlocks).find((block) => {
        const title = block.querySelector('h3').textContent.toLowerCase();
        return title.includes(colorValue.toLowerCase());
      });

      if (matchingVariant) {
        const variantId = matchingVariant.dataset.variantId;
        const matchingInput = document.querySelector(`input[name="id"][value="${variantId}"]`);
        if (matchingInput) {
          matchingInput.checked = true;
        }
        showVariantPhotos(variantId);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('variant', variantId);
        // window.history.pushState({}, '', newUrl);
      }
    });
  });

  variantInputs.forEach((input) => {
    input.addEventListener('change', function () {
      showVariantPhotos(this.value);
    });
  });

  function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant');

    if (urlVariant) {
      showVariantPhotos(urlVariant);
      const matchingInput = document.querySelector(`input[name="id"][value="${urlVariant}"]`);
      if (matchingInput) matchingInput.checked = true;
      const matchingBlock = document.querySelector(`.variant-block[data-variant-id="${urlVariant}"]`);
      if (matchingBlock) {
        const colorValue = matchingBlock.querySelector('h3').textContent.toLowerCase();
        const matchingButton = Array.from(colorButtons).find((btn) =>
          colorValue.includes(btn.getAttribute('data-value').toLowerCase())
        );
        if (matchingButton) matchingButton.classList.add('active');
      }
    } else if (variantBlocks.length > 0) {
      const firstVariantId = variantBlocks[0].dataset.variantId;
      showVariantPhotos(firstVariantId);
    }
  }

  init();
});

