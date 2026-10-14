from pathlib import Path
from PIL import Image
import shutil, json, hashlib

ROOT=Path(__file__).resolve().parent
ART=ROOT.parent
ASSETS=ROOT/'assets'; ASSETS.mkdir(exist_ok=True)
sources={
 'demon.png':'dungeon-ui/assets/monsters/demon.png',
 'dragon.png':'dungeon-ui/assets/monsters/dragon.png',
 'judicator.png':'dungeon-ui/assets/monsters/judicator.png',
 'dawncoil.png':'dungeon-ui/assets/monsters/dawncoil.png',
 'flame.png':'dungeon-ui/assets/monsters/flame.png',
 'orc.png':'dungeon-ui/assets/monsters/orc.png',
 'ferumbras.png':'dungeon-ui/assets/monsters/ferumbras.png',
 'leaf-tl.png':'dungeon-ui/assets/ornaments/leaf-tl.png',
 'leaf-tr.png':'dungeon-ui/assets/ornaments/leaf-tr.png',
 'demon-motion.webp':'angelic-demon/walking-preview.webp',
 'dragon-motion.webp':'ivory-dragon-gold/movement-preview.webp',
 'judicator-motion.webp':'moonsilver-judicator/movement-preview.webp',
 'dawncoil-motion.webp':'dawncoil/movement-preview.webp',
 'flame-motion.webp':'holy-fire-elemental/movement-preview.webp',
 'holy.webp':'moonsilver-spell-effects/moonsilver-holyarea/animation.webp',
 'energy.webp':'moonsilver-spell-effects/moonsilver-energyarea/animation.webp',
 'corrupted.webp':'corrupted-holy-effects/corrupted-holyarea/animation.webp',
 'corrupted-hit.webp':'corrupted-holy-effects/corrupted-holydamage/animation.webp',
 'arthur.webp':'one-armed-warrior/import-pack/south-walk.webp',
 'portal.png':'pocket-portal/pocket-portal.png',
 'portal.gif':'pocket-portal/animated/preview.gif',
 'xp.png':'global-boost-items-32x32/extra-xp.png',
 'loot.png':'global-boost-items-32x32/extra-loot.png',
 'elite.png':'global-boost-items-32x32/extra-elite-spawns.png',
 'xp-status.png':'global-buff-status-icons-verdant/global-xp-active.png',
 'loot-status.png':'global-buff-status-icons-verdant/global-loot-active.png',
 'elite-status.png':'global-buff-status-icons-verdant/global-elite-active.png',
 'bag.png':'moonsilver-loot-bag/moonsilver-loot-bag-32x32.png',
 'dungeon.png':'dungeon-ui/showcase-capture.png',
 'sets.png':'set-concepts/visual-review-01.png',
}
manifest=[]
for name,rel in sources.items():
    src=ART/rel
    with Image.open(src) as im:
        im.load(); size=list(im.size); frames=getattr(im,'n_frames',1)
    shutil.copy2(src,ASSETS/name)
    manifest.append({'file':'assets/'+name,'source':'art-output/'+rel,'dimensions':size,'frames':frames,'sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'operation':'unchanged copy'})
(ROOT/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print('Copied and decoded',len(manifest),'actual project assets.')
