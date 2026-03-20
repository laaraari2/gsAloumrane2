
import json

path = 'c:/Users/laara/OneDrive/Desktop/projec1/antigone-oumrane/src/locales/ar/translation.json'

with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# We know the duplicate is at the top level.
# Python's json.loads with object_pairs_hook allows us to keep the LAST occurrence (default behavior of dict).
# But if it's mixed, we might want to manually clean it.

def clean_json(pairs):
    d = {}
    for k, v in pairs:
        if k in d:
            print(f"Merging duplicate key: {k}")
            if isinstance(d[k], dict) and isinstance(v, dict):
                d[k].update(v)
            else:
                d[k] = v
        else:
            d[k] = v
    return d

try:
    data = json.loads(text, object_pairs_hook=clean_json)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Successfully cleaned ar/translation.json")
except Exception as e:
    print(f"Error: {e}")
