function createPrice(priceText, periodText) {
  const priceWrapper = document.createElement('div');
  priceWrapper.classList.add('pricing-price');

  const price = document.createElement('p');
  price.classList.add('price-value');

  // Separates "$" from "09", "$25", "$42", etc.
  const priceMatch = priceText.match(/^([^0-9]*)([0-9.,]+)$/);

  const currency = document.createElement('span');
  currency.classList.add('price-currency');
  currency.textContent = priceMatch ? priceMatch[1].trim() : '$';

  const amount = document.createElement('span');
  amount.classList.add('price-amount');
  amount.textContent = priceMatch ? priceMatch[2] : priceText;

  const period = document.createElement('p');
  period.classList.add('price-period');
  period.textContent = periodText;

  price.append(currency, amount);
  priceWrapper.append(price, period);

  return priceWrapper;
}

function createFeatureList(featuresText) {
  const featureList = document.createElement('ul');
  featureList.classList.add('pricing-features');

  // Features must be separated by semicolons in EDS authoring.
  const features = featuresText
    .split(';')
    .map((feature) => feature.trim())
    .filter(Boolean);

  features.forEach((feature) => {
    const listItem = document.createElement('li');

    const icon = document.createElement('i');
    icon.classList.add('feature-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '›';

    const featureText = document.createElement('span');
    featureText.textContent = feature;

    listItem.append(icon, featureText);
    featureList.append(listItem);
  });

  return featureList;
}

function createCTA(buttonColumn) {
  const authoredLink = buttonColumn.querySelector('a');

  // Do not manufacture a URL if the author did not provide one.
  if (!authoredLink) return null;

  authoredLink.classList.add('pricing-button');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('pricing-button-container');
  buttonContainer.append(authoredLink);

  return buttonContainer;
}

export default function decorate(block) {
  const authoredRows = [...block.children];
  const cardList = document.createElement('div');

  cardList.classList.add('pricing-card-list');

  authoredRows.forEach((row) => {
    const columns = [...row.children];
    if (columns.length < 5) return;

    const [
      planColumn,
      priceColumn,
      periodColumn,
      featuresColumn,
      buttonColumn,
    ] = columns;

    const planName = planColumn.textContent.trim();
    const priceText = priceColumn.textContent.trim();
    const periodText = periodColumn.textContent.trim();
    const featuresText = featuresColumn.textContent.trim();

    const card = document.createElement('article');
    card.classList.add('pricing-card');

    const heading = document.createElement('h3');
    heading.classList.add('pricing-title');
    heading.textContent = planName;

    const price = createPrice(priceText, periodText);
    const featureList = createFeatureList(featuresText);
    const button = createCTA(buttonColumn);

    card.append(heading, price, featureList);

    if (button) {
      card.append(button);
    }

    cardList.append(card);
  });

  block.replaceChildren(cardList);
}
