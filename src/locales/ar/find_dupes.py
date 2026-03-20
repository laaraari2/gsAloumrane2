
import json

with open('c:/Users/laara/OneDrive/Desktop/projec1/antigone-oumrane/src/locales/fr/translation.json', 'r', encoding='utf-8') as f:
    content = f.read()

def find_duplicates(content):
    import re
    keys = re.findall(r'"([^"]+)"\s*:', content)
    seen = {}
    dupes = []
    for k in keys:
        if k in seen:
            dupes.append(k)
        seen[k] = True
    return dupes

# However, keys can be nested. A simple regex isn't enough for nested uniqueness. 
# But the lint error usually points to top-level or same-level duplicates.

# Let's try to parse it with a custom object_pairs_hook to find duplicates at the same level
from collections import Counter

def check_duplicates(pairs):
    keys = [p[0] for p in pairs]
    counts = Counter(keys)
    for k, count in counts.items():
        if count > 1:
            print(f"Duplicate key found: {k}")
    return dict(pairs)

try:
    json.loads(content, object_pairs_hook=check_duplicates)
except Exception as e:
    print(f"Error: {e}")
