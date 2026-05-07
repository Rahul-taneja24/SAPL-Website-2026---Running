// parseKeyRanges.js — convert pipe-delimited "Label: value" strings from
// productFamiliesData.js (and similar datasets) into structured rows that
// can drive both visible HTML tables and Schema.org additionalProperty arrays.
//
// Input examples handled:
//   "Al₂O₃: 45-90% | Bulk Density: 2.3-3.0 g/cc | CCS: 50-120 MPa"
//   "Temperature grades: 1260°C, 1400°C, 1430°C | Density: 64-350 kg/m³"
//   "MgO: 60-98% | Bulk Density: 2.8-3.2 g/cc | Carbon: 5-20% (MgO-C)"
//
// Output:
//   [
//     { label: "Al₂O₃",        value: "45-90%" },
//     { label: "Bulk Density", value: "2.3-3.0 g/cc" },
//     { label: "CCS",          value: "50-120 MPa" },
//   ]
//
// Robustness notes:
//   - Splits on the first `:` per segment, so values containing `:` survive.
//   - Trims whitespace.
//   - Drops empty segments.
//   - Falls back to a single { label: 'Specification', value: <whole row> }
//     entry when no `:` is present (so any row still renders as a table).

export function parseKeyRanges(keyRanges) {
  if (!keyRanges || typeof keyRanges !== 'string') return [];
  return keyRanges
    .split('|')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const idx = segment.indexOf(':');
      if (idx === -1) {
        return { label: 'Specification', value: segment };
      }
      const label = segment.slice(0, idx).trim();
      const value = segment.slice(idx + 1).trim();
      return { label, value };
    })
    .filter((row) => row.label && row.value);
}

// Convert parsed rows into Schema.org PropertyValue objects suitable for the
// `additionalProperty` field of a Product / Service node. Returns [] for
// empty input so callers can spread safely.
export function toAdditionalProperty(rows) {
  if (!Array.isArray(rows) || !rows.length) return [];
  return rows.map(({ label, value }) => ({
    '@type': 'PropertyValue',
    name: label,
    value: String(value),
  }));
}

// Convenience: parse and convert in one step.
export function keyRangesToAdditionalProperty(keyRanges) {
  return toAdditionalProperty(parseKeyRanges(keyRanges));
}
