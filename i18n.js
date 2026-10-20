// As traduções alteram apenas o texto do portfólio, não os jogos incorporados.
const UI_TEXT = {
  pt: {
    pageTitle: 'Victor Bagio Gusto — Portfólio de jogos',
    pageDescription: 'Jogos com programação de Victor Bagio Gusto: The Last Case, Go Deep, Pig Rush e Project: Aurea.',
    skip: 'Pular para o conteúdo', games: 'Jogos', eyebrow: 'PORTFÓLIO / PROGRAMAÇÃO DE JOGOS',
    intro: 'Sou estudante de Desenvolvimento de Jogos na FIAP e meu foco é programação.',
    introduction: 'Aqui reuni os jogos em que trabalhei, com espaço para mostrar minha participação, capturas e versões jogáveis.',
    explore: 'Ver os jogos', gamesLabel: 'JOGOS', footer: 'Programação de jogos', email: 'E-mail', top: 'Topo',
    aiCredit: 'Foi utilizada inteligência artificial no desenvolvimento dos sistemas de tradução e de integração dos jogos do itch.io à página, além da organização e depuração do código.',
    details: 'Detalhes', description: 'Descrição', concept: 'Conceito', role: 'Minha participação',
    technology: 'Tecnologia', platform: 'Plataforma', status: 'Estado', screenshots: 'Prints', play: 'Jogar', playable: 'Versão jogável',
    pendingDescription: 'Descrição em breve.', pendingConcept: 'Conceito em breve.', pendingRole: 'Programação.',
    pendingScreenshots: 'Prints em breve.', pendingBuild: 'Versão jogável em breve.',
    navigation: 'Seções de {title}', enlarge: 'Ampliar print: {description}', imageDialog: 'Print ampliado', closeImage: 'Fechar print',
    externalGame: 'A versão jogável está disponível em outra página.', playNow: 'Jogar agora',
    openGame: 'Abrir jogo em outra aba', repository: 'Ver código no GitHub', controls: 'Controles: {controls}',
    startGame: 'Jogar aqui', loadHint: 'O jogo é carregado do itch.io ao clicar.', loading: 'Carregando…',
    closeGame: 'Fechar jogo', frameTitle: 'Jogar {title}', loadError: 'Não foi possível carregar o jogo. Use o link do itch.io abaixo.',
    language: 'Idioma do site', languageChanged: 'Idioma alterado para português.',
  },
  en: {
    pageTitle: 'Victor Bagio Gusto — Game portfolio',
    pageDescription: 'Games programmed by Victor Bagio Gusto: The Last Case, Go Deep, Pig Rush and Project: Aurea.',
    skip: 'Skip to content', games: 'Games', eyebrow: 'PORTFOLIO / GAME PROGRAMMING',
    intro: 'I study Game Development at FIAP, with a focus on programming.',
    introduction: 'Here you can explore the games I have worked on, my contributions, screenshots and playable versions.',
    explore: 'Explore the games', gamesLabel: 'GAMES', footer: 'Game programming', email: 'Email', top: 'Back to top',
    aiCredit: 'Artificial intelligence was used to develop the site translation system and the itch.io integration that makes the games playable on this page, as well as to organize and debug the code.',
    details: 'Details', description: 'Description', concept: 'Concept', role: 'My contribution',
    technology: 'Technology', platform: 'Platform', status: 'Status', screenshots: 'Screenshots', play: 'Play', playable: 'Play the game',
    pendingDescription: 'Description coming soon.', pendingConcept: 'Concept coming soon.', pendingRole: 'Programming.',
    pendingScreenshots: 'Screenshots coming soon.', pendingBuild: 'Playable version coming soon.',
    navigation: '{title} sections', enlarge: 'Enlarge screenshot: {description}', imageDialog: 'Enlarged screenshot', closeImage: 'Close screenshot',
    externalGame: 'The playable version is available on another page.', playNow: 'Play now',
    openGame: 'Open game in another tab', repository: 'View code on GitHub', controls: 'Controls: {controls}',
    startGame: 'Play here', loadHint: 'The game loads from itch.io when you click.', loading: 'Loading…',
    closeGame: 'Close game', frameTitle: 'Play {title}', loadError: 'The game could not be loaded. Use the itch.io link below.',
    language: 'Site language', languageChanged: 'Language changed to English.',
  },
};

const PROJECTS_EN = {
  'last-case': {
    description: "A top-down 2D roguelike where you explore rooms, fight enemies and choose upgrades to speed, damage and your weapon as you progress through the run.",
    concept: "Developed in Unity for the FIAP Challenge, focusing on programming a simple roguelike. The project uses premade visual assets and an AI-generated logo.",
    controls: 'WASD — movement; mouse — selection.',
    screenshots: [
      ['The Last Case title screen with a red logo, a dark corridor and Play and Exit buttons.', 'Title screen.'],
      ['A character with a hat and blue scarf in a top-down room connected to other corridors.', 'Exploring the rooms.'],
      ['The character in a room with red creatures, enemies and projectiles.', 'Enemy encounter.'],
      ['Upgrade menu showing Speed+, Damage+ and Knife+ over the game scene.', 'Choosing upgrades.'],
    ],
  },
  'go-deep': {
    description: "A 2D pixel art fishing game with a vertical layout. Cast the bait, follow the hook as it descends and catch fish on the way back up, earning points with each cast.",
    concept: "Developed in Unity for a programming class, with the challenge of creating a game controlled by a single button. The design combines casting, the hook’s descent and catching fish into a simple interaction, using premade visual assets.",
    controls: 'Mouse — interaction.',
    screenshots: [
      ['Go Deep title screen with a fisherman in a boat, the moon and a Start button.', 'Title screen.'],
      ['The fisherman casting the bait from the boat, with a bar above the character.', 'Casting the bait.'],
      ['The hook descending through the water among fish, with the fishing line visible.', 'The bait descending.'],
      ['A fish caught on the hook, with other fish swimming nearby.', 'Catching fish.'],
    ],
  },
  'pig-rush': {
    description: "A 2D pixel art platformer where you control a pig, jump between platforms and collect coins on the way to the end of the level. The interface tracks your time and the coins collected.",
    concept: "Developed in Unity to learn how to build levels with tilemaps. The project combines platforms of different sizes and heights, jumping and coin collection, using premade visual assets.",
    controls: 'A, S and D — movement; space bar — jump.',
    screenshots: [
      ['The pig at the start of the level, with coins above the platforms and a timer at the top.', 'Start of the level.'],
      ['The pig jumping between platforms of different sizes and heights, with coins along the way.', 'Jumping between platforms.'],
      ['The pig on a platform near a large green coin, with the coin counter showing 18.', 'End of the level.'],
    ],
  },
  aurea: {
    description: "An incremental space mining game where you destroy asteroids and use a collector to gather their fragments. Spend the resources on damage, ammunition and collection range upgrades for your ship, while managing ammunition and the collector’s heat.",
    concept: "Developed in Unity for FIAP’s Global Solution. Progression follows a loop of destroying asteroids, collecting resources and investing in upgrades. The programming connects combat and collection to the shop, keeping resources and upgrade levels between scenes.",
    controls: 'Mouse — aim; hold the left mouse button — continuous fire; hold the right mouse button — collect fragments. If the collector overheats, wait until it cools down completely.',
    screenshots: [
      ['Project: Aurea title screen with a colorful logo, a space backdrop, a neon grid and Play and Exit buttons.', 'Title screen.'],
      ['A crosshair among asteroids and fragments, with ammunition, time and resource indicators.', 'Destroying asteroids.'],
      ['Collecting fragments with the crosshair and a resource counter on the interface.', 'Collecting resources.'],
      ['A shop offering damage, ammunition and collection range upgrades, with the resource balance displayed.', 'Shop screen.'],
    ],
  },
};

let currentLanguage = 'pt';
try {
  if (localStorage.getItem('portfolio-language') === 'en') currentLanguage = 'en';
} catch { /* A preferência é opcional quando o armazenamento está bloqueado. */ }

function t(key, values = {}) {
  const text = UI_TEXT[currentLanguage][key] || UI_TEXT.pt[key] || key;
  return text.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
}

function localizeProject(project) {
  if (currentLanguage === 'pt') return project;
  const translation = PROJECTS_EN[project.id];
  if (!translation) return project;
  return {
    ...project,
    ...translation,
    role: 'Game programming.',
    platform: 'Browser',
    status: project.status === 'Completo' ? 'Completed' : project.status,
    screenshots: project.screenshots.map((shot, index) => ({
      ...shot,
      alt: translation.screenshots[index]?.[0] || shot.alt,
      caption: translation.screenshots[index]?.[1] || shot.caption,
    })),
  };
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]').content = t('pageDescription');
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', t(element.dataset.i18nAria));
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage));
  });
}

function setLanguage(language) {
  if (!['pt', 'en'].includes(language) || language === currentLanguage) return;
  currentLanguage = language;
  try { localStorage.setItem('portfolio-language', language); } catch { /* Sem persistência. */ }
  applyStaticTranslations();
  document.dispatchEvent(new Event('portfolio-language-change'));
}
