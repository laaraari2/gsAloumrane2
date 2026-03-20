import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const routesToPrefix = [
  '/personnages', '/search', '/quick-review', '/progress', '/oeuvre',
  '/themes', '/citations', '/fiche', '/comparison', '/glossary',
  '/mindmaps', '/howto', '/sample-answers', '/quiz', '/figures-style',
  '/timeline', '/notes', '/bookmarks', '/ecrits', '/audio', '/examen',
  '/exam-simulator', '/about'
];

routesToPrefix.forEach(r => {
  code = code.replaceAll('path="' + r + '"', 'path="/:bookId' + r + '"');
});

code = code.replaceAll('path="/antigone"', 'path="/:bookId"');

fs.writeFileSync('src/App.tsx', code);
console.log('Routes updated!');
