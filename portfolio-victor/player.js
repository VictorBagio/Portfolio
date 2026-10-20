// Os builds continuam no itch.io. Nenhum iframe é criado antes do clique.
let activeGame = null;
function playableEmbed(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    const officialEmbed = url.hostname === 'itch.io' && url.pathname.startsWith('/embed-upload/');
    const hostedBuild = url.hostname === 'html-classic.itch.zone' && /^\/html\/\d+\/.+\/index\.html$/.test(url.pathname);
    return officialEmbed || hostedBuild ? url.href : '';
  } catch { return ''; }
}
function mountGamePlayer(player, project, source) {
  let cleanup = null;
  const start = () => {
    player.classList.remove('has-frame');
    player.replaceChildren(make('span','play-symbol','▷'));
    const button = make('button','button primary','Jogar aqui');
    button.type='button'; button.addEventListener('click', load);
    player.append(button, make('small','','Carrega do itch.io ao clicar.'));
    return button;
  };
  const stop = (restoreFocus=false) => {
    if(cleanup) cleanup(); cleanup=null;
    player.replaceChildren(); // remover o iframe interrompe o jogo e o áudio
    if(activeGame?.player===player) activeGame=null;
    const button=start(); if(restoreFocus) button.focus();
  };
  const load = () => {
    if(activeGame) activeGame.stop();
    player.classList.add('has-frame'); player.replaceChildren();
    const toolbar=make('div','game-toolbar');
    const status=make('span','game-status','Carregando…');status.setAttribute('role','status');
    const close=make('button','','Fechar jogo');close.type='button';
    toolbar.append(status,close);
    const stage=make('div','game-stage');
    const frame=make('iframe'); frame.title=`Jogar ${project.title}`;
    frame.allow="autoplay; gamepad; fullscreen 'none'";
    frame.setAttribute('scrolling','no');
    frame.referrerPolicy='strict-origin-when-cross-origin';frame.src=source;
    const width=project.playerWidth||960,height=project.playerHeight||600;
    // O template Unity inclui 42 px abaixo do canvas. Enquadre só o jogo:
    // o rodapé externo (e seu botão de tela cheia) fica fora da área visível.
    const viewport=make('div','game-viewport');
    viewport.style.width=`${width}px`;viewport.style.height=`${height}px`;
    frame.style.width=`${width}px`;frame.style.height=`${project.playerFrameHeight||height+42}px`;
    viewport.append(frame);stage.append(viewport);player.append(toolbar,stage);
    const resize=()=>{const scale=Math.min(stage.clientWidth/width,stage.clientHeight/height);viewport.style.transform=`translate(-50%, -50%) scale(${scale})`;};
    const observer=new ResizeObserver(resize);observer.observe(stage);resize();
    frame.addEventListener('load',()=>{status.textContent=project.title;});
    frame.addEventListener('error',()=>{status.textContent='Não carregou? Use o link do itch.io abaixo.';});
    close.addEventListener('click',()=>stop(true));
    cleanup=()=>observer.disconnect();
    activeGame={player,stop}; close.focus();
  };
  start();
}
