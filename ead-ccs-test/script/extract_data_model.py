#!/usr/bin/env python3
"""Extracts the CCS data model from the two project workbooks into config/data_model/*.json
(the committed, CI-readable copy that DataModel loads).

  python3 script/extract_data_model.py             (needs: pip install openpyxl)

Sources (in data/, not tracked in git; copied from the static CCS repo's extractor):
  data/CCS-data-inventory.xlsx
      "CCS Data Inventory - 9 Sept"  -> inventory.json (current inventory)
      "CCS Datatypes"                -> datatypes.json
      "Complex fields"               -> complex-fields.json
      "AH sequencing"                -> sequencing.json
      "Copyright Advice"             -> copyright-advice.json
      ("CCS Data Inventory - 18 Aug" and "- Superseeded" are older versions and are not used)
  data/CCS-Field-labels-and-filters.xlsx
      "CCS Field labels"             -> field-labels.json
      "CCS Filters"                  -> filters.json
"""
import json, os, re, sys
import openpyxl

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'config', 'data_model')
INV = os.path.join(ROOT, 'data', 'CCS-data-inventory.xlsx')
LAB = os.path.join(ROOT, 'data', 'CCS-Field-labels-and-filters.xlsx')

def clean(v):
    if v is None: return None
    s = str(v).replace('​', '').replace('\r', '').strip()
    return re.sub(r'[ \t]+', ' ', s) if s else None

def rows(ws):
    return [[clean(c) for c in r] for r in ws.iter_rows(values_only=True)]

def write(name, data):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, name), 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False); f.write('\n')
    print('wrote', name, len(data) if hasattr(data, '__len__') else '')

def num(v):
    try: return int(float(v))
    except (TypeError, ValueError): return None

lab = openpyxl.load_workbook(LAB, data_only=True)
inv = openpyxl.load_workbook(INV, data_only=True)

# ---- field labels (30 display fields) ----
fl = []
for r in rows(lab['CCS Field labels'])[1:]:
    if not r[0] or num(r[0]) is None: continue
    fl.append({'seq': num(r[0]), 'label': r[1], 'encompasses': r[2], 'description': r[3], 'dataType': r[4], 'source': r[5], 'transformRequired': r[6], 'displaySpec': r[7], 'examples': r[8], 'questions': r[9]})
write('field_labels.json', fl)

# ---- filters (22) ----
ft, section = [], None
for r in rows(lab['CCS Filters'])[1:]:
    if num(r[0]) is None: continue
    section = r[1] or section
    ft.append({'seq': num(r[0]), 'section': section, 'name': r[2], 'type': r[3], 'additional': r[4], 'options': r[5], 'dataModelRef': r[6], 'questions': r[7]})
write('filters.json', ft)

# ---- datatypes ----
dt, cur = [], None
for r in rows(inv['CCS Datatypes'])[1:]:
    if r[0]: cur = {'dataType': r[0], 'attributes': []}; dt.append(cur)
    if r[1] and cur: cur['attributes'].append({'name': r[1], 'linkedDataType': r[2], 'description': r[3]})
write('datatypes.json', dt)

# ---- current inventory (9 Sept) ----
R = rows(inv['CCS Data Inventory - 9 Sept'])
hdr_i = next(i for i, r in enumerate(R) if r[0] == 'Metadata component')
H = R[hdr_i]
def col(r, *names):
    for n in names:
        for i, h in enumerate(H):
            if h and h.lower().startswith(n.lower()): return r[i] if i < len(r) else None
    return None
items, comp, lab_ah, seq, lab_jj = [], None, None, None, None
for r in R[hdr_i + 1:]:
    if not any(r): continue
    comp = r[0] or comp
    if r[1]: lab_ah = r[1]
    if r[2]: seq = r[2]
    if r[3]: lab_jj = r[3]
    field = r[4]
    if not field: continue
    items.append({
        'component': comp, 'recordFieldLabel': lab_ah, 'sequence': seq, 'labelJJDN': lab_jj, 'metadataField': field, 'dataType': r[5],
        'heldBy': {'M&C': r[6], 'MDHS': r[7], 'NexusDAM': r[8]}, 'description': r[9], 'sourceSystem': r[10], 'displaysInCCS': r[11],
        'technicalStatus': r[12], 'facetedSearch': r[13], 'ifNotPopulated': r[14],
        'status': {'copyrightRequirement': r[16], 'underCopyright': r[17], 'notUnderCopyright': r[18], 'recordWithDA': r[19], 'recordWithoutDA': r[20]},
        'collectionManagement': r[21], 'complexOutOfScope2026': r[22], 'comments': r[23] if len(r) > 23 else None})
write('inventory.json', items)

# ---- complex fields, sequencing, copyright advice ----
cf = [r for r in rows(inv['Complex fields']) if any(r)]
write('complex_fields.json', [[c for c in r if c is not None] for r in cf])
sq = []
for r in rows(inv['AH sequencing'])[1:]:
    if any(r): sq.append({'component': r[0], 'recordFieldLabel': r[1], 'sequence': r[2], 'simpleOrComplex': r[3], 'metadataField': r[4], 'instruction': r[5]})
write('sequencing.json', sq)
ca = rows(inv['Copyright Advice'])
cad = []
for r in ca[3:]:
    if r[0]: cad.append({'descriptor': r[0], 'definition': r[1], 'example': r[2], 'withDA': r[3], 'withoutDA': r[5], 'inventoryRow': r[6]})
write('copyright_advice.json', cad)
