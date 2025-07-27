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

document.querySelectorAll('.product-accordion').forEach((accordion) => {
  const allowMultiple = accordion.dataset.allowMultiple === 'true';

  accordion.querySelectorAll('.accordion-title').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      if (!allowMultiple) {
        accordion.querySelectorAll('.accordion-item').forEach((i) => {
          if (i !== item) {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
