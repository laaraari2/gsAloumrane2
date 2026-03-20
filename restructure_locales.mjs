import fs from 'fs';
import path from 'path';

function restructureLocales() {
  const locales = ['ar', 'fr'];
  
  for (const lang of locales) {
    const filePath = `src/locales/${lang}/translation.json`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Keys to keep at the root
    const rootKeys = ['app', 'lang', 'footer', 'navigation', 'hub', 'login', 'logout', 'countdown', 'developer'];
    
    const newJson = {};
    const antigoneObj = {};
    
    for (const key in data) {
      if (rootKeys.includes(key)) {
        newJson[key] = data[key];
      } else {
        antigoneObj[key] = data[key];
      }
    }
    
    // Create 'boite' and 'condamne' as empty objects for now or copy 'antigone' to maintain structure
    newJson.antigone = antigoneObj;
    
    // For 'boite', let's initialize it with empty or clone for testing.
    // Cloning antigone but we will modify it later
    newJson.boite = JSON.parse(JSON.stringify(antigoneObj));
    // Provide a distinct title for boite home to see it change
    if(newJson.boite.home && lang === 'ar') newJson.boite.home.title = "ملخص علبة العجائب";
    if(newJson.boite.home && lang === 'fr') newJson.boite.home.title = "Résumé de La Boîte à Merveilles";

    newJson.condamne = JSON.parse(JSON.stringify(antigoneObj));
    
    fs.writeFileSync(filePath, JSON.stringify(newJson, null, 2));
    console.log(`Updated ${filePath}`);
  }
}

restructureLocales();
