const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const projectList = document.querySelector('#project-list');
const imageDialog = document.querySelector('#image-dialog');
const fullImage = document.querySelector('#full-image');
const imageCaption = document.querySelector('#image-caption');

function make(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function https(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

function createIcon(pathData, className = '') {
  const icon = document.createElementNS(SVG_NAMESPACE, 'svg');
  const attributes = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.8',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  };
  for (const [name, value] of Object.entries(attributes)) {
    icon.setAttribute(name, value);
  }
  if (className) icon.setAttribute('class', className);
  const path = document.createElementNS(SVG_NAMESPACE, 'path');
  path.setAttribute('d', pathData);
  icon.append(path);
  return icon;
}

function external(label, url, className = '') {
  const link = make('a', className, label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(createIcon('M7 17 17 7M7 7h10v10', 'link-icon'));
  return link;
}

function createPart(projectId, name, title) {
  const section = make('section', 'game-part');
  section.id = `${projectId}-${name}`;
  const heading = make('div', 'part-heading');
  heading.append(make('h3', '', title));
  section.append(heading);
  return section;
}

function createProjectTitle(project) {
  const title = make('div', 'game-title');
  const group = make('div');
  const heading = make('h2', '', project.title);
  if (project.logo) {
    heading.className = 'has-logo';
    heading.textContent = '';
    const logo = make('img', 'game-logo');
    logo.src = project.logo;
    logo.alt = project.title;
    logo.loading = 'lazy';
    heading.append(logo);
  }
  group.append(heading);
  title.append(group);
  return title;
}

function createProjectNavigation(project) {
  const navigation = make('nav', 'game-nav');
  navigation.setAttribute('aria-label', t('navigation', { title: project.title }));
  for (const [id, label] of [['detalhes', t('details')], ['prints', t('screenshots')], ['jogar', t('play')]]) {
    const link = make('a', '', label);
    link.href = `#${project.id}-${id}`;
    navigation.append(link);
  }
  return navigation;
}

function createDetails(project) {
  const section = createPart(project.id, 'detalhes', t('details'));
  const fields = make('div', 'details');
  const content = [
    [t('description'), project.description, t('pendingDescription')],
    [t('concept'), project.concept, t('pendingConcept')],
    [t('role'), project.role, t('pendingRole')],
  ];
  content.forEach(([label, value, placeholder], index) => {
    const field = make('div', index === 2 ? 'contribution' : '');
    field.append(make('h4', '', label), make('p', value ? '' : 'pending', value || placeholder));
    fields.append(field);
  });
  section.append(fields);

  const metadata = make('dl', 'project-meta');
  for (const [label, value] of [
    [t('technology'), project.technology],
    [t('platform'), project.platform],
    [t('status'), project.status],
  ]) {
    if (!value) continue;
    const item = make('div');
    item.append(make('dt', '', label), make('dd', '', value));
    metadata.append(item);
  }
  if (metadata.childElementCount) section.append(metadata);
  return section;
}

function createScreenshot(shot) {
  const figure = make('figure');
  const button = make('button', 'shot-button');
  button.type = 'button';
  button.setAttribute('aria-label', t('enlarge', { description: shot.alt }));
  const image = make('img');
  image.src = shot.src;
  image.alt = shot.alt;
  image.loading = 'lazy';
  button.append(image);
  button.addEventListener('click', () => {
    fullImage.src = shot.src;
    fullImage.alt = shot.alt;
    imageCaption.textContent = shot.caption || shot.alt;
    imageDialog.showModal();
  });
  figure.append(button);
  if (shot.caption) figure.append(make('figcaption', '', shot.caption));
  return figure;
}

function createGallery(project) {
  const section = createPart(project.id, 'prints', t('screenshots'));
  const gallery = make('div', 'gallery');
  if (project.screenshots.length) {
    gallery.append(...project.screenshots.map(createScreenshot));
  } else {
    const empty = make('div', 'empty-shot');
    empty.style.gridColumn = '1 / -1';
    empty.append(createIcon('M4 5h16v14H4z M4 17l5-6 4 4 3-3 4 5'), make('p', '', t('pendingScreenshots')));
    gallery.append(empty);
  }
  section.append(gallery);
  return section;
}

function createPlayable(project) {
  const section = createPart(project.id, 'jogar', t('playable'));
  const player = make('div', 'player');
  const playUrl = https(project.playUrl);
  const repositoryUrl = https(project.repositoryUrl);
  const embedUrl = playableEmbed(project.embedUrl);

  if (embedUrl) {
    mountGamePlayer(player, project, embedUrl);
  } else {
    player.append(make('span', 'play-symbol', '▷'));
    if (playUrl) {
      player.append(
        make('p', '', t('externalGame')),
        external(t('playNow'), playUrl, 'button primary'),
      );
    } else player.append(make('p', '', t('pendingBuild')));
  }
  section.append(player);

  const links = make('div', 'game-links');
  if (playUrl && embedUrl) links.append(external(t('openGame'), playUrl));
  if (repositoryUrl) links.append(external(t('repository'), repositoryUrl));
  if (links.childElementCount) section.append(links);
  if (project.controls) section.append(make('p', 'controls', t('controls', { controls: project.controls })));
  return section;
}

function createProject(project) {
  const article = make('article', 'game');
  article.id = project.id;
  const wrapper = make('div', 'wrap');
  const layout = make('div', 'game-layout');
  const content = make('div', 'game-content');
  content.append(createDetails(project), createGallery(project), createPlayable(project));
  layout.append(createProjectNavigation(project), content);
  wrapper.append(createProjectTitle(project), layout);
  article.append(wrapper);
  return article;
}

function renderProjects() {
  if (activeGame) activeGame.stop();
  if (imageDialog.open) imageDialog.close();
  projectList.replaceChildren(...(window.portfolioProjects || []).map(localizeProject).map(createProject));
}

applyStaticTranslations();
renderProjects();
document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
document.addEventListener('portfolio-language-change', () => {
  renderProjects();
  updateHeaderHeight();
  document.querySelector('#language-status').textContent = t('languageChanged');
});

document.querySelector('.close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  const bounds = imageDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === imageDialog && outside) imageDialog.close();
});

const stickyHeader = document.querySelector('.header');
const updateHeaderHeight = () => {
  document.documentElement.style.setProperty('--header-height', `${stickyHeader.getBoundingClientRect().height}px`);
};
new ResizeObserver(updateHeaderHeight).observe(stickyHeader);
window.addEventListener('resize', updateHeaderHeight);
updateHeaderHeight();
