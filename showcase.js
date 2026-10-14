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
