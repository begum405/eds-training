export default function decorate(block) {
  const rows = [...block.children];


  block.innerHTML = '';

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'pricing-cards';

  rows.forEach((row) => {
    const cols = [...row.children];

    const title = cols[0]?.textContent.trim();
    const price = cols[1]?.textContent.trim().replace('$', '');
    const duration = cols[2]?.textContent.trim();
    const features = cols[3]?.textContent.trim();
    const cta = cols[4]?.textContent.trim();

    const card = document.createElement('div');
    card.className = 'pricing-card';

    const featureItems = features
      .split(';')
      .filter((item) => item.trim())
      .map(
        (item) => `
          <li>
            <i class="icofont icofont-circled-right"></i>
            <span>${item.trim()}</span>
          </li>
        `,
      )
      .join('');

    card.innerHTML = `
      <h3 class="pricing-title">${title}</h3>

      <div class="pricing-circle">
        <div class="pricing-symbol">$</div>
        <div class="pricing-price">${price}</div>
        <div class="pricing-duration">${duration}</div>
      </div>

      <ul class="pricing-features">
        ${featureItems}
      </ul>

      <a href="#" class="pricing-btn">
        ${cta}
      </a>
    `;

    cardsWrapper.append(card);
  });

  block.append(cardsWrapper);
}