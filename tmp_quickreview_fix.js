const fs = require('fs');
const path = 'src/components/sections/QuickReview.tsx';
let content = fs.readFileSync(path, 'utf8');

const charactersTarget = `      items: [
        { label: t('characters.antigone.name'), value: t('characters.antigone.role') },
        { label: t('characters.creon.name'), value: t('characters.creon.role') },
        { label: t('characters.ismene.name'), value: t('characters.ismene.role') },
        { label: t('characters.hemon.name'), value: t('characters.hemon.role') },
      ],`;

const charactersReplacement = `      items: Object.entries(t('characters', { returnObjects: true }) as Record<string, any>)
        .filter(([k]) => k !== 'title' && k !== 'subtitle')
        .slice(0, 4)
        .map(([_, v]) => ({ label: v.name, value: v.role })),`;

const themesTarget = `      items: [
        { label: t('themes.revolte.title'), value: t('themes.revolte.description') },
        { label: t('themes.bonheur.title'), value: t('themes.bonheur.description') },
        { label: t('themes.fatalite.title'), value: t('themes.fatalite.description') },
      ],`;

const themesReplacement = `      items: Object.entries(t('themes', { returnObjects: true }) as Record<string, any>)
        .filter(([k]) => k !== 'title' && k !== 'subtitle')
        .slice(0, 4)
        .map(([_, v]) => ({ label: v.title, value: v.description })),`;

// Because of potential CR LF differences, use regex
content = content.replace(/items:\s*\[\s*\{\s*label:\s*t\('characters\.antigone\.name'\)[\s\S]*?\]\s*,/m, charactersReplacement);
content = content.replace(/items:\s*\[\s*\{\s*label:\s*t\('themes\.revolte\.title'\)[\s\S]*?\]\s*,/m, themesReplacement);

fs.writeFileSync(path, content);
console.log('Fixed QuickReview properties');
