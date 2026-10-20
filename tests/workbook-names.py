#!/usr/bin/env python3
"""Prints the field labels and filters straight from CCS Field labels and filters.xlsx as JSON, for tests/workbook-drift.test.js.

Standard library only (an .xlsx is a zip of XML), so CI needs no openpyxl. Fields are the rows of "CCS Field Labels" that have a
FINAL SEQUENCE ORDER (column L), as [sequence, label]; filters are the numbered rows of "CCS Filters", as [number, name].
"""
import json, re, sys, zipfile
import xml.etree.ElementTree as ET

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"


def sheets(path):
    z = zipfile.ZipFile(path)
    strings = ["".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])) for si in ET.fromstring(z.read("xl/sharedStrings.xml"))]
    rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
    out = {}
    for s in ET.fromstring(z.read("xl/workbook.xml")).find("m:sheets", NS):
        rows = {}
        for c in ET.fromstring(z.read("xl/" + rels[s.get(REL)].lstrip("/").removeprefix("xl/"))).iter("{%s}c" % NS["m"]):
            v = c.find("m:v", NS)
            if v is None:
                continue
            col, row = re.match(r"([A-Z]+)(\d+)", c.get("r")).groups()
            rows.setdefault(int(row), {})[col] = strings[int(v.text)] if c.get("t") == "s" else v.text
        out[s.get("name")] = rows
    return out


def clean(s):
    return re.sub(r"\s+", " ", (s or "").replace("​", "")).strip()


book = sheets(sys.argv[1])
fields = [[int(r["L"]), clean(r["B"])] for _, r in sorted(book["CCS Field Labels"].items()) if r.get("L", "").isdigit() and r.get("B")]
filters = [[int(r["A"]), clean(r["C"])] for _, r in sorted(book["CCS Filters"].items()) if r.get("A", "").isdigit() and r.get("C")]
print(json.dumps({"fields": sorted(fields), "filters": sorted(filters)}))  # the JSON copies are in sequence order; the sheet is in display-field order
