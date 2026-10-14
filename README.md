# Vestara — A world taking shape

Open index.html in a modern browser. The showcase runs offline without installation or a server. All displayed media are included under assets/.

Features: interactive creature gallery with movement studies; animated magic effects; optional story spoiler disclosure; system cards with evidence/status labels; dungeon UI enlargement; animated Pocket Portal viewer; proposed raid progression.

Sources and verification boundaries are in SOURCES.md. Artwork copies and hashes are in asset-manifest.json. This is a project retrospective, not a fresh gameplay audit. No gameplay or deployed client files changed.

The content and presentation are editable in index.html, showcase.css and showcase.js. build_showcase.py copies original artwork from the project and records provenance. The exported ZIP can be extracted and viewed offline. Do not mistake the screenshots for game-ready interface assets.
# vestara-landing-page
The opening temple portal runs for approximately five seconds. Activate its three runes with mouse, touch or keyboard; skip with the visible button or Escape. Reduced-motion visitors and browsers without JavaScript see the page directly. All opening artwork is served locally.

The intro now plays once per browser profile/site origin, using window.localStorage key vestara:intro-seen. Clearing site storage allows it to play again. Storage errors are caught so they never prevent page access. The dragon was replaced with user-supplied Tibia fireworks/confetti effects; the walking character remains.

