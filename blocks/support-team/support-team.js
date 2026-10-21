export default function decorate(block) {
  const rows = [...block.children];

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'support-team-wrapper';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const imageCol = cols[0];
    const contentCol = cols[1];

    const image = imageCol.querySelector('picture');

    const contentItems = [...contentCol.children];

    const name = contentItems[0]?.textContent?.trim() || '';
    const role = contentItems[1]?.textContent?.trim() || '';
    const rating = contentItems[2]?.textContent?.trim() || '';
    const description = contentItems[3]?.textContent?.trim() || '';

    const card = document.createElement('div');
    card.className = 'support-team-card';

    card.innerHTML = `
      <div class="support-team-header">
        <div class="support-team-image">
          ${image ? image.outerHTML : ''}
        </div>

        <div class="support-team-info">
          <h3>${name}</h3>
          <span>${role}</span>
        </div>
      </div>

      <div class="support-team-rating">
        <span class="stars">★★★★★</span>
        <span class="rating-text">
          ${rating.replace('★★★★★', '').trim()}
        </span>
      </div>

      <p class="support-team-description">
        ${description}
      </p>
    `;

    cardsWrapper.append(card);
  });

  block.textContent = '';
  block.append(cardsWrapper);
}
