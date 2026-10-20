const list = document.querySelector('#project-list');
const make = (tag, className, text) => { const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el; };
const https = value => {try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const external = (label,url,className='') => {const a=make('a',className,label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
const dialog=document.querySelector('#image-dialog');
function part(id,title){const section=make('section','game-part');section.id=id;const heading=make('div','part-heading');heading.append(make('h3','',title));section.append(heading);return section;}
for(const project of window.portfolioProjects || []){
  const game=make('article','game');game.id=project.id;
  const wrap=make('div','wrap');const title=make('div','game-title');const titleGroup=make('div');titleGroup.append(make('h2','',project.title));title.append(titleGroup);
  const layout=make('div','game-layout');const nav=make('nav','game-nav');nav.setAttribute('aria-label',`Seções de ${project.title}`);
  [['detalhes','Detalhes'],['prints','Prints'],['jogar','Jogar']].forEach(([id,text])=>{const a=make('a');a.href=`#${project.id}-${id}`;a.textContent=text;nav.append(a);});
  const content=make('div','game-content');
  const details=part(`${project.id}-detalhes`,'Detalhes');const fields=make('div','details');
  [['Descrição',project.description,'Descrição a adicionar.'],['Conceito',project.concept,'Conceito a adicionar.'],['Minha participação',project.role,'Programação.']].forEach(([label,value,pending],index)=>{const field=make('div',index===2?'contribution':'');field.append(make('h4','',label),make('p',value?'':'pending',value||pending));fields.append(field);});details.append(fields);
  const metadata=make('dl','project-meta');
  for(const [label,value] of [['Tecnologia',project.technology],['Plataforma',project.platform],['Estado',project.status]]){if(value){const item=make('div');item.append(make('dt','',label),make('dd','',value));metadata.append(item);}}
  if(metadata.childElementCount)details.append(metadata);
  const prints=part(`${project.id}-prints`,'Prints');const gallery=make('div','gallery');
  if(project.screenshots.length){for(const shot of project.screenshots){const figure=make('figure');const button=make('button','shot-button');button.type='button';button.setAttribute('aria-label',`Ampliar print: ${shot.alt}`);const img=make('img');img.src=shot.src;img.alt=shot.alt;img.loading='lazy';button.append(img);button.addEventListener('click',()=>{document.querySelector('#full-image').src=shot.src;document.querySelector('#full-image').alt=shot.alt;document.querySelector('#image-caption').textContent=shot.caption||shot.alt;dialog.showModal();});figure.append(button);if(shot.caption)figure.append(make('figcaption','',shot.caption));gallery.append(figure);}}
  else{const empty=make('div','empty-shot');empty.style.gridColumn='1 / -1';const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 32 32');icon.setAttribute('aria-hidden','true');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M5 6h22v20H5z M5 23l7-8 5 5 4-4 6 7 M21 10h.01');icon.append(path);empty.append(icon,make('p','','Prints a adicionar'));gallery.append(empty);}prints.append(gallery);
  const playable=part(`${project.id}-jogar`,'Versão jogável');const player=make('div','player');const playUrl=https(project.playUrl),embedUrl=https(project.embedUrl),repoUrl=https(project.repositoryUrl);const validEmbed=playableEmbed(embedUrl);
  player.append(make('span','play-symbol','▷'));
  if(validEmbed){mountGamePlayer(player,project,validEmbed);}
  else if(playUrl){player.append(make('p','','A versão jogável está disponível em outra página.'),external('Jogar agora ↗',playUrl,'button primary'));}
  else{player.append(make('p','','Build a adicionar'));}
  playable.append(player);const links=make('div','game-links');if(playUrl&&validEmbed)links.append(external('Abrir jogo em outra aba ↗',playUrl));if(repoUrl)links.append(external('Ver código no GitHub ↗',repoUrl));if(links.childElementCount)playable.append(links);if(project.controls)playable.append(make('p','controls',`Controles: ${project.controls}`));
  content.append(details,prints,playable);layout.append(nav,content);wrap.append(title,layout);game.append(wrap);list.append(game);
}
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
