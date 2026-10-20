// Os builds continuam no itch.io. Nenhum iframe é criado antes do clique.
let activeGame = null;
const ITCH_FOOTER_HEIGHT = 21;
const UNITY_FOOTER_HEIGHT = 42;
function playableEmbed(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    const officialEmbed = url.hostname === 'itch.io' && /^\/embed-upload\/\d+$/.test(url.pathname);
    return officialEmbed ? url.href : '';
  } catch { return ''; }
}
function mountGamePlayer(player, project, source) {
  let cleanup = null;
  const start = () => {
    player.classList.remove('has-frame');
    player.replaceChildren(make('span','play-symbol','▷'));
    const button = make('button','button primary',t('startGame'));
    button.type='button'; button.addEventListener('click', load);
    player.append(button, make('small','',t('loadHint')));
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
    const status=make('span','game-status',t('loading'));status.setAttribute('role','status');
    const close=make('button','',t('closeGame'));close.type='button';
    toolbar.append(status,close);
    const stage=make('div','game-stage');
    const frame=make('iframe'); frame.title=t('frameTitle', { title: project.title });
    frame.allow="autoplay; gamepad; fullscreen 'none'";
    frame.setAttribute('scrolling','no');
    frame.referrerPolicy='strict-origin-when-cross-origin';frame.src=source;
    const width=project.playerWidth||960,height=project.playerHeight||600;
    // O embed oficial é exibido inteiro, nas dimensões fornecidas.
    // Os controles do serviço ficam dentro do iframe oficial.
    const viewport=make('div','game-viewport');
    viewport.style.width=`${width}px`;viewport.style.height=`${height}px`;
    frame.style.width=`${width}px`;
    frame.style.height=`${project.playerFrameHeight || height + UNITY_FOOTER_HEIGHT}px`;
    viewport.append(frame);
    // O iframe oficial é de outra origem. Cubra apenas o rodapé Unity,
    // preservando o canvas e a barra de identificação do itch.io no final.
    if(project.unityCanvasWidth && project.unityCanvasHeight){
      const footerMask=make('div','unity-footer-mask');
      footerMask.setAttribute('aria-hidden','true');
      footerMask.style.width=`${project.unityCanvasWidth}px`;
      footerMask.style.left=`${(width-project.unityCanvasWidth)/2}px`;
      const canvasTop = (height - ITCH_FOOTER_HEIGHT - project.unityCanvasHeight - UNITY_FOOTER_HEIGHT) / 2 + 1;
      footerMask.style.top=`${Math.ceil(canvasTop + project.unityCanvasHeight)}px`;
      footerMask.style.background=project.embedBackground||'#333333';
      viewport.append(footerMask);
    }
    stage.append(viewport);player.append(toolbar,stage);
    const resize=()=>{const scale=Math.min(stage.clientWidth/width,stage.clientHeight/height);viewport.style.transform=`translate(-50%, -50%) scale(${scale})`;};
    const observer=new ResizeObserver(resize);observer.observe(stage);resize();
    frame.addEventListener('load',()=>{status.textContent=project.title;});
    frame.addEventListener('error',()=>{status.textContent=t('loadError');});
    close.addEventListener('click',()=>stop(true));
    cleanup=()=>observer.disconnect();
    activeGame={player,stop}; close.focus();
  };
  start();
}
