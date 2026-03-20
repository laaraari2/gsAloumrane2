const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const routesToPrefix = [
  '/personnages', '/search', '/quick-review', '/progress', '/oeuvre',
  '/themes', '/citations', '/fiche', '/comparison', '/glossary',
  '/mindmaps', '/howto', '/sample-answers', '/quiz', '/figures-style',
  '/timeline', '/notes', '/bookmarks', '/ecrits', '/audio', '/examen',
  '/exam-simulator', '/about'
];

routesToPrefix.forEach(r => {
  code = code.replace(new RegExp('path="' + r + '"', 'g'), 'path="/:bookId' + r + '"');
});

code = code.replace(new RegExp('path="/antigone"', 'g'), 'path="/:bookId"');
fs.writeFileSync('src/App.tsx', code);
