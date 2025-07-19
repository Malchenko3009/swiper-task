document.addEventListener('DOMContentLoaded', function () {
  const radios = document.querySelectorAll('input[name="id"]');
  const variantBlocks = document.querySelectorAll('.variant-block');

  function showVariantBlock(selectedId) {
    variantBlocks.forEach((block) => {
      const blockId = block.dataset.variantId;
      if (blockId === selectedId) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  }

  function activeLabel(selectRadio) {
    radios.forEach((radio) => {
      if (radio === selectRadio) {
        radio.parentElement.classList.add('active');
      } else {
        radio.parentElement.classList.remove('active');
      }
    });
  }

  const checkedRadio = Array.from(radios).find((r) => r.checked);
  if (checkedRadio) {
    showVariantBlock(checkedRadio.dataset.variantId);
    activeLabel(checkedRadio);
  } else if (radios.length > 0) {
    const firstRadio = radios[0];
    firstRadio.checked = true;
    showVariantBlock(firstRadio.dataset.variantId);
    activeLabel(firstRadio);
  }

  radios.forEach((radio) => {
    radio.addEventListener('change', function () {
      showVariantBlock(radio.dataset.variantId);
      activeLabel(radio);
    });
  });
});
