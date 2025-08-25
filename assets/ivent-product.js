// const checkoutBtn = document.querySelector('.product-ivent-buy');

// checkoutBtn.addEventListener('click', async () => {
//   const variantId = document.querySelector('.product-ivent-select').value;

//   let formData = {
//     items: [
//       {
//         id: variantId,
//         quantity: 1,
//       },
//     ],
//   };

//   try {
//     const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
//     if (response.ok) {
//       const data = await response.json();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

const variantMetafields = JSON.parse(document.getElementById('variant-metafields').textContent);

const variantSelect = document.getElementById('product-ivent-select');
const dateSelect = document.getElementById('product-ivent-date');
const timeSelect = document.getElementById('product-ivent-time');

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function renderDates(variantId) {
  const data = variantMetafields[variantId];
  if (!data) return;

  dateSelect.innerHTML = '';
  timeSelect.innerHTML = '';

  if (data.dste && data.dste.length > 0) {
    data.dste.forEach((d) => {
      const dateObj = new Date(d);
      const dateStr = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);

      dateSelect.appendChild(createOption(d, dateStr));
    });

    renderTimes(variantId, data.dste[0]);
  }
}

function renderTimes(variantId, selectedDate) {
  const data = variantMetafields[variantId];
  if (!data) return;

  timeSelect.innerHTML = '';

  const selectedDateKey = selectedDate.split('T')[0];

  if (data.time && data.time.length > 0) {
    data.time.forEach((t) => {
      const dateObj = new Date(t);
      const dateKey = dateObj.toISOString().split('T')[0];
      const timeStr = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(dateObj);

      if (dateKey === selectedDateKey) {
        timeSelect.appendChild(createOption(t, timeStr));
      }
    });
  }
}

variantSelect.addEventListener('change', (e) => {
  renderDates(e.target.value);
});

dateSelect.addEventListener('change', (e) => {
  renderTimes(variantSelect.value, e.target.value);
});

renderDates(variantSelect.value);
// PRICE
const select = document.getElementById('product-ivent-select');
const priceContainer = document.getElementById('product-ivent-price');
const prices = JSON.parse(document.getElementById('variant-prices').textContent);

if (select.value && prices[select.value] !== undefined) {
  priceContainer.textContent = prices[select.value];
}

select.addEventListener('change', (e) => {
  const variantId = e.target.value;
  if (prices[variantId] !== undefined) {
    priceContainer.textContent = prices[variantId];
  }
});
