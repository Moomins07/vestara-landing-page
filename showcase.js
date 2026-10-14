const creatures={
 demon:['Moonsilver Demon','The familiar demon silhouette, transformed into white flesh and gilded detail. Something recognisably monstrous now wears the colours of a holy guardian.'],
 dragon:['Gilded Ivory Dragon','The existing ivory dragon palette gains golden eyes and ornament-like accents. Its native shape and directional movement remain the foundation.'],
 judicator:['Moonsilver Judicator','A pale reaper turned into an instrument of false divinity. The proposed Moonfall spell fits its role as a herald of the corrupted heavens.'],
 dawncoil:['Dawncoil','A white-and-gold wyrm variant that carries the Moonsilver language into a serpentine silhouette, with its own movement catalogue.'],
 flame:['Holy Flame','Fire-elemental motion recoloured as a brilliant holy flame. White heat replaces orange and red while retaining the underlying animation.']
};
let selected='demon',motion=false;
const img=document.getElementById('creature-image'),toggle=document.getElementById('motion-toggle');
function render(){img.src=`assets/${selected}${motion?'-motion.webp':'.png'}`;img.alt=creatures[selected][0]+(motion?' movement study':'');img.parentElement.classList.toggle('motion',motion);document.getElementById('creature-title').textContent=creatures[selected][0];document.getElementById('creature-description').textContent=creatures[selected][1];toggle.textContent=motion?'Show single portrait ↗':'Show movement study ↗';toggle.setAttribute('aria-pressed',motion);}
document.querySelectorAll('[data-creature]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.creature;document.querySelectorAll('[data-creature]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});render()}));toggle.addEventListener('click',()=>{motion=!motion;render()});
const dialog=document.getElementById('viewer');
function show(src,alt,caption){document.getElementById('viewer-image').src=src;document.getElementById('viewer-image').alt=alt;document.getElementById('viewer-caption').textContent=caption;dialog.showModal()}
document.getElementById('enlarge-ui').addEventListener('click',()=>show('assets/dungeon.png','Dungeon interface prototype','Existing browser prototype. Requirements, rewards and queue state are illustrative; this is not a live game session.'));
document.getElementById('portal-toggle').addEventListener('click',()=>show('assets/portal.gif','Animated Pocket Portal','16 frames · 32×32 pixels each · 1.6-second oscillating loop · frame and foliage remain fixed.'));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelectorAll("[data-preview]").forEach(button=>button.addEventListener("click",()=>show(button.dataset.preview,button.querySelector("img").alt,button.dataset.caption)));

(function initWorldIntro(){
 const intro=document.getElementById('world-intro');
 if(!intro || intro.hidden)return;
 document.querySelectorAll('body > header, body > main, body > footer').forEach(el=>{el.inert=true;});
 const skip=intro.querySelector('.intro-skip');
 const message=intro.querySelector('.intro-message');
 const previousFocus=document.activeElement;
 const timers=[];
 let closing=false;
 function finish(){
  if(closing)return;
  closing=true;
  timers.forEach(clearTimeout);
  clearTimeout(window.vestaraIntroFallback);
  intro.classList.add('departing');
  document.removeEventListener('keydown',onKey);
  setTimeout(()=>{
   intro.remove();
   document.body.classList.remove('intro-active');
   document.querySelectorAll('body > header, body > main, body > footer').forEach(el=>{el.inert=false;});
   if(previousFocus && previousFocus!==document.body)previousFocus.focus({preventScroll:true});
   else document.querySelector('.brand').focus({preventScroll:true});
  },700);
 }
 function onKey(event){
  if(event.key==='Escape'){event.preventDefault();finish();}
  if(event.key==='Tab'){
   const buttons=[skip,...intro.querySelectorAll('.intro-rune')];
   const first=buttons[0],last=buttons[buttons.length-1];
   if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  }
 }
 skip.addEventListener('click',finish);
 document.addEventListener('keydown',onKey);
 skip.focus({preventScroll:true});
 intro.querySelectorAll('.intro-rune').forEach(rune=>rune.addEventListener('click',()=>{
  rune.setAttribute('aria-pressed','true');
  const burst=document.createElement('img');
  burst.className='rune-cast pixel';
  burst.src='assets/Fireworks_Effect_(Star).gif';
  burst.alt='';
  burst.setAttribute('aria-hidden','true');
  rune.appendChild(burst);
  timers.push(setTimeout(()=>burst.remove(),900));
  const count=intro.querySelectorAll('.intro-rune[aria-pressed="true"]').length;
  message.textContent=count===3?'The gate awakens. Welcome to Vestara.':`${count} of 3 runes awakened…`;
  if(count===3)intro.classList.add('awakened');
 }));
 timers.push(setTimeout(()=>{if(!intro.querySelector('.intro-rune[aria-pressed="true"]'))message.textContent='Moonsilver light spills beyond the gate…';},1800));
 timers.push(setTimeout(()=>{intro.classList.add('awakened');message.textContent='Your adventure begins.';},3700));
 // Mount each looping GIF once, avoiding timed reloads and DOM churn.
 const fireworks=intro.querySelector('.intro-fireworks');
 const effects=[
  [14,22,'Fireworks_Effect_(Star).gif'],
  [84,26,'Fireworks_Effect_(Circle).gif'],
  [24,74,'Green_Confetti_Effect.gif'],
  [78,78,'Fireworks_Effect_(Star).gif'],
  [10,52,'Orange_Confetti_Effect.gif'],
  [90,56,'Red_Confetti_Effect.gif'],
  [50,14,'Fireworks_Effect_(Circle).gif']
 ];
 const fragment=document.createDocumentFragment();
 effects.forEach(([x,y,asset])=>{
  const effect=document.createElement('img');
  effect.className='screen-firework pixel';
  effect.alt='';
  effect.decoding='async';
  effect.src=`assets/${asset}`;
  effect.style.left=`${x}%`;
  effect.style.top=`${y}%`;
  fragment.appendChild(effect);
 });
 fireworks.appendChild(fragment);
 timers.push(setTimeout(finish,4800));
 const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
 motionPreference.addEventListener('change',function onMotionChange(event){if(event.matches){finish();motionPreference.removeEventListener('change',onMotionChange);}});
})();





