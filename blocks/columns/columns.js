export default function decorate(block) {
  const firstRow = block.firstElementChild;

  if (!firstRow) return;

  const firstRowColumns = [...firstRow.children];
  block.classList.add(`columns-${firstRowColumns.length}-cols`);

  [...block.children].forEach((row) => {
    const columns = [...row.children];

    // Apply this design only to two-column rows.
    if (columns.length !== 2) return;

    const [leftSection, rightSection] = columns;

    row.classList.add('columns-row');

    leftSection.classList.add('left-section');

    const picture = leftSection.querySelector('picture');

    if (picture) {
      const pictureWrapper = picture.closest('div');

      if (pictureWrapper && pictureWrapper !== leftSection && pictureWrapper.children.length === 1) {
        pictureWrapper.classList.add('columns-img-col');
      }

      const image = picture.querySelector('img');

      if (image) {
        image.decoding = 'async';
        if (!image.hasAttribute('alt')) {
          image.setAttribute('alt', '');
        }
      }
    }
    rightSection.classList.add('right-section');

    const heading = rightSection.querySelector('h1, h2, h3');

    if (heading) {
      heading.classList.add('right-section-heading');
    }
    const links = [...rightSection.querySelectorAll('a')];

    const readMoreLink = links.find(
      (link) => link.textContent.trim().toLowerCase() === 'read more',) || links.at(-1);

    if (readMoreLink) {
      readMoreLink.classList.add('read-more-btn');

      const buttonContainer = readMoreLink.closest('p');

      if (buttonContainer) {
        buttonContainer.classList.add('button-container');
      }
    }

    const paragraphs = [...rightSection.querySelectorAll(':scope > p')];

    const description = paragraphs.find(
      (paragraph) => !paragraph.contains(readMoreLink),
    );

    if (description) {
      description.classList.add('right-section-description');
    }

    paragraphs.forEach((paragraph) => {
      const isDescription = paragraph === description;
      const isButtonContainer = readMoreLink
        && paragraph.contains(readMoreLink);
      const isEmpty = !paragraph.textContent.trim();

      if (isDescription || isButtonContainer || isEmpty) return;

      paragraph.classList.add('feature-item');

      // Prevent duplicate icons if decoration runs again.
      if (!paragraph.querySelector(':scope > .feature-icon')) {
        const icon = document.createElement('i');

        icon.classList.add('feature-icon');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = '\u2713';

        paragraph.prepend(icon);
      }
    });
  });
}
