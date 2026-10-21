export default function decorate(block) {
  const rows = [...block.children];

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('team-cards');

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const imageCol = cols[0];
    const contentCol = cols[1];

    const image = imageCol.querySelector('picture')?.outerHTML || '';

    const contentItems = [...contentCol.children];

    const name = contentItems[0]?.outerHTML || '';
    const role = contentItems[1]?.outerHTML || '';
    const description = contentItems[2]?.outerHTML || '';

    const socialLinks = contentItems.slice(3);

    const socialWrapper = document.createElement('div');
    socialWrapper.classList.add('team-social');

    socialLinks.forEach((item) => {
      const text = item.textContent.trim().toLowerCase();

      let icon = 'icofont-ui-social-link';

      if (text.includes('facebook')) {
        icon = 'icofont-facebook';
      } else if (text.includes('twitter')) {
        icon = 'icofont-twitter';
      } else if (text.includes('instagram')) {
        icon = 'icofont-instagram';
      } else if (
        text.includes('vmat')
        || text.includes('vimeo')
      ) {
        icon = 'icofont-vimeo';
      }

      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.setAttribute('aria-label', text);

      anchor.innerHTML = `
        <i class="${icon}"></i>
      `;

      socialWrapper.append(anchor);
    });

    const card = document.createElement('div');
    card.classList.add('team-card');

    card.innerHTML = `
      <div class="team-image">
        ${image}
      </div>

      <div class="team-content">
        <div class="team-name">${name}</div>
        <div class="team-role">${role}</div>
        <div class="team-description">${description}</div>
      </div>
    `;

    card.querySelector('.team-content').append(socialWrapper);

    cardsWrapper.append(card);
  });

  block.textContent = '';
  block.append(cardsWrapper);
}