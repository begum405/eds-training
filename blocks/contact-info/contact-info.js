export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  for (let i = 0; i < rows.length; i += 3) {
    const type = rows[i]?.textContent.trim().toLowerCase();
    const title = rows[i + 1]?.textContent.trim();
    const description = rows[i + 2]?.textContent.trim();

    if (type && title && description) {
      cards.push({
        type,
        title,
        description,
      });
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'location':
        return 'icofont icofont-location-pin';
      case 'phone':
        return 'icofont icofont-iphone';
      case 'email':
        return 'icofont icofont-email';
      default:
        return 'icofont-info-circle';
    }
  };

  block.innerHTML = '';

  cards.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'contact-card';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'contact-icon';

    const icon = document.createElement('i');
    icon.className = getIcon(card.type);

    iconWrap.append(icon);

    const content = document.createElement('div');
    content.className = 'contact-content';

    const heading = document.createElement('h2');
    heading.textContent = card.title;

    const description = document.createElement('p');
    description.innerHTML = card.description.replace(/\n/g, '<br>');

    content.append(heading);
    content.append(description);

    cardEl.append(iconWrap);
    cardEl.append(content);

    block.append(cardEl);
  });
}
