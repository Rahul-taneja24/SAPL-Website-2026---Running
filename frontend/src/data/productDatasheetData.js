/**
 * SAPL technical datasheet content — original compilation by Shanker Agencies
 * of typical, widely-published property ranges for each product family, with
 * the relevant Indian/international test standards.
 *
 * LEGAL NOTE: this is SAPL's own editorial compilation of standard industry
 * values + test methods — NOT a copy of any manufacturer's copyrighted PDF.
 * Always shows a "typical values, confirm grade datasheet" disclaimer.
 *
 * Rendered as an indexable HTML "Technical Data Sheet" block on each product
 * page so engineers searching by specification (e.g. "MgO-C brick 14% carbon
 * apparent porosity") land on Shanker Agencies.
 *
 * Keyed by the productId used in /products/[categorySlug]/[productId].
 */

export const PRODUCT_DATASHEETS = {
  'high-alumina-bricks': {
    gradeTable: {
      title: 'Grade-Wise Typical Specifications (IS 8 / ASTM C401 classes)',
      note: 'Typical values compiled from published Indian manufacturer datasheets. Confirm the grade datasheet before ordering.',
      columns: ['Grade', 'Al\u2082O\u2083 (min)', 'Bulk Density', 'App. Porosity', 'CCS', 'Refractoriness', 'Max Service Temp'],
      rows: [
        ['AL-45', '45%', '2.15 \u2013 2.30 g/cc', '22 \u2013 24%', '35 \u2013 45 MPa', 'SK 35\u201336', '1500\u00b0C'],
        ['AL-50', '50%', '2.20 \u2013 2.35 g/cc', '22 \u2013 24%', '40 \u2013 50 MPa', 'SK 36', '1550\u00b0C'],
        ['AL-60', '60%', '2.35 \u2013 2.50 g/cc', '21 \u2013 23%', '44 \u2013 55 MPa', 'SK 37', '1650\u00b0C'],
        ['AL-70', '70%', '2.55 \u2013 2.65 g/cc', '20 \u2013 23%', '49 \u2013 60 MPa', 'SK 37\u201338 (RUL ~1450\u00b0C)', '1700\u00b0C'],
        ['AL-80', '80%', '2.65 \u2013 2.90 g/cc', '19 \u2013 24%', '50 \u2013 70 MPa', 'SK 38', '1750\u00b0C'],
        ['AL-90', '90%', '2.90 \u2013 3.10 g/cc', '16 \u2013 20%', '60 \u2013 90 MPa', 'SK 38+', '1790\u00b0C'],
      ],
    },

    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '45 – 90%', test: 'IS 1527 / ASTM C573' },
      { property: 'Fe₂O₃', typical: '1.0 – 2.5%', test: 'IS 1527' },
      { property: 'SiO₂', typical: 'Balance', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '2.2 – 3.1 g/cc', test: 'IS 1528 Pt-8 / ASTM C20' },
      { property: 'Apparent Porosity', typical: '14 – 26%', test: 'IS 1528 Pt-8' },
      { property: 'Cold Crushing Strength', typical: '40 – 70 MPa', test: 'IS 1528 Pt-4 / ASTM C133' },
      { property: 'Refractoriness (PCE)', typical: 'SK 33 – 38', test: 'IS 1528 Pt-1' },
      { property: 'RUL (Ta, 0.2 MPa)', typical: '1400 – 1550°C', test: 'IS 1528 Pt-3' },
      { property: 'Max Service Temperature', typical: 'Up to 1850°C', test: '—' },
    ],
    packaging: 'Shrink-wrapped on pallets. Standard IS 6 / IS 8 sizes; arch, wedge, skew and special shapes to drawing.',
  },
  'fireclay-bricks': {
    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '25 – 45%', test: 'IS 1527' },
      { property: 'Fe₂O₃', typical: '2.0 – 2.5%', test: 'IS 1527' },
      { property: 'SiO₂', typical: '50 – 70%', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '1.8 – 2.1 g/cc', test: 'IS 1528 Pt-8' },
      { property: 'Apparent Porosity', typical: '20 – 28%', test: 'IS 1528 Pt-8' },
      { property: 'Cold Crushing Strength', typical: '20 – 35 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Refractoriness (PCE)', typical: 'SK 28 – 34', test: 'IS 1528 Pt-1' },
      { property: 'Max Service Temperature', typical: 'Up to 1400°C', test: '—' },
    ],
    packaging: 'Standard IS 6 sizes, shrink-wrapped on pallets. Bulk dispatch from Delhi warehouse.',
  },
  'insulating-fire-bricks': {
    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '45 – 65%', test: 'IS 1527' },
      { property: 'SiO₂', typical: '30 – 50%', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '0.5 – 1.1 g/cc', test: 'IS 1528 Pt-8 / ASTM C134' },
      { property: 'Thermal Conductivity', typical: '0.15 – 0.35 W/mK', test: 'ASTM C182' },
      { property: 'Cold Crushing Strength', typical: '1.0 – 5.0 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Permanent Linear Change', typical: '< 1.5% at rated temp', test: 'IS 1528 Pt-6' },
      { property: 'Classification Temperature', typical: '1260 – 1650°C', test: 'ASTM C155 (Group 23–32)' },
    ],
    packaging: 'Standard IFB sizes (230×114×76 mm) and arch/wedge shapes; cartons or pallets.',
  },
  'mullite-bricks': {
    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '60 – 75%', test: 'IS 1527' },
      { property: 'SiO₂', typical: '23 – 38%', test: 'IS 1527' },
      { property: 'Fe₂O₃', typical: '< 1.0%', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '2.3 – 2.6 g/cc', test: 'IS 1528 Pt-8' },
      { property: 'Apparent Porosity', typical: '16 – 22%', test: 'IS 1528 Pt-8' },
      { property: 'Cold Crushing Strength', typical: '50 – 100 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Refractoriness (PCE)', typical: 'SK 36 – 38', test: 'IS 1528 Pt-1' },
      { property: 'Creep in Compression', typical: '< 1% (1500°C, 50 h)', test: 'IS 1528 Pt-9 / DIN 51053' },
      { property: 'Max Service Temperature', typical: 'Up to 1800°C', test: '—' },
    ],
    packaging: 'Checker, straight and special shapes to stove/kiln ring drawings; palletised.',
  },
  'magnesia-carbon-bricks': {
    gradeTable: {
      title: 'Grade-Wise Typical Specifications by Carbon Level',
      note: 'Typical values compiled from published Indian manufacturer datasheets. Carbon level is matched to lining zone duty.',
      columns: ['Grade Class', 'MgO', 'Fixed Carbon', 'Bulk Density', 'CCS', 'Typical Zone'],
      rows: [
        ['MgO-C 8\u201310%C', '94 \u2013 98%', '8 \u2013 10%', '2.95 \u2013 3.05 g/cc', '35 \u2013 45 MPa', 'Ladle metal line, general lining'],
        ['MgO-C 12\u201314%C', '94 \u2013 96%', '12 \u2013 14%', '2.90 \u2013 3.00 g/cc', '30 \u2013 40 MPa', 'Ladle slag line, BOF barrel'],
        ['MgO-C 14\u201316%C', '94 \u2013 96%', '14 \u2013 16%', '2.85 \u2013 2.95 g/cc', '29 \u2013 38 MPa', 'EAF hot spot, severe slag zones'],
      ],
    },

    chemicalAnalysis: [
      { property: 'MgO', typical: '74 – 90%', test: 'IS 1527 / ASTM C572' },
      { property: 'Fixed Carbon', typical: '8 – 20%', test: 'IS 1528 / ASTM C831' },
      { property: 'Antioxidants (Al/Si/B₄C)', typical: 'As per grade', test: '—' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '2.85 – 3.10 g/cc', test: 'IS 1528 Pt-8' },
      { property: 'Apparent Porosity', typical: '3 – 8%', test: 'IS 1528 Pt-8' },
      { property: 'Cold Crushing Strength', typical: '30 – 45 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Max Service Temperature', typical: '1700°C+', test: '—' },
    ],
    packaging: 'Resin-bonded, tempered. BOF/EAF/ladle shapes to drawing; palletised, moisture-protected.',
  },
  'low-cement-castables': {
    gradeTable: {
      title: 'Grade-Wise Typical Specifications (LC Series)',
      note: 'Typical values compiled from published Indian manufacturer datasheets; CCS after 110\u00b0C/24h drying unless noted.',
      columns: ['Grade', 'Al\u2082O\u2083 (min)', 'Bulk Density', 'CCS (dried)', 'CCS (1000\u00b0C fired)', 'Max Service Temp'],
      rows: [
        ['LC-45', '45%', '2.30 \u2013 2.45 g/cc', '60 \u2013 80 MPa', '45 \u2013 60 MPa', '1500\u00b0C'],
        ['LC-60', '60%', '2.45 \u2013 2.60 g/cc', '70 \u2013 90 MPa', '50 \u2013 80 MPa', '1600\u00b0C'],
        ['LC-70', '70%', '2.60 \u2013 2.75 g/cc', '75 \u2013 95 MPa', '55 \u2013 85 MPa', '1650\u00b0C'],
        ['LC-80', '80%', '2.75 \u2013 2.95 g/cc', '80 \u2013 100 MPa', '65 \u2013 95 MPa', '1700\u00b0C'],
        ['LC-90', '90%', '2.95 \u2013 3.05 g/cc', '85 \u2013 100 MPa', '70 \u2013 95 MPa', '1750\u00b0C'],
      ],
    },

    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '60 – 90%', test: 'IS 1527' },
      { property: 'CaO', typical: '4 – 8%', test: 'IS 1527' },
      { property: 'SiO₂', typical: 'Balance', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density (after firing)', typical: '2.7 – 3.0 g/cc', test: 'IS 10570 / ASTM C860' },
      { property: 'CCS at 110°C', typical: '60 – 90 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Hot MOR at 1400°C', typical: '8 – 15 MPa', test: 'ASTM C583' },
      { property: 'Water Requirement', typical: '5.5 – 7.5%', test: 'Manufacturer mix design' },
      { property: 'Max Service Temperature', typical: 'Up to 1600°C', test: '—' },
    ],
    packaging: '25 kg moisture-resistant bags on shrink-wrapped pallets; batch-coded with mix-water instructions.',
  },
  'ultra-low-cement-castables': {
    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '70 – 95%', test: 'IS 1527' },
      { property: 'CaO', typical: '< 1%', test: 'IS 1527' },
      { property: 'SiO₂ (microsilica)', typical: 'As per grade', test: 'IS 1527' },
    ],
    physicalProperties: [
      { property: 'Bulk Density (after firing)', typical: '2.8 – 3.1 g/cc', test: 'IS 10570 / ASTM C860' },
      { property: 'CCS at 110°C', typical: '70 – 100 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Hot MOR at 1400°C', typical: '12 – 18 MPa', test: 'ASTM C583' },
      { property: 'Water Requirement', typical: '4.5 – 5.5%', test: 'Manufacturer mix design' },
      { property: 'Max Service Temperature', typical: 'Up to 1700°C', test: '—' },
    ],
    packaging: '25 kg moisture-resistant bags on pallets; conservative dry-out schedule supplied with each lot.',
  },
  'ramming-masses': {
    gradeTable: {
      title: 'Family-Wise Typical Specifications',
      note: 'Typical values compiled from published Indian manufacturer datasheets. Granulometry for silica mass: 0\u20135 mm graded (coarse/medium/fine) for maximum packing density.',
      columns: ['Family', 'Key Chemistry', 'Service Temp', 'Melt Types', 'Typical Lining Life'],
      rows: [
        ['Silica (Acidic)', 'SiO\u2082 \u2265 98%, Fe\u2082O\u2083 \u2264 0.2%, CaO \u2264 0.1%', 'Up to 1700\u00b0C', 'Grey iron, SG iron, mild steel', '150 \u2013 350 heats'],
        ['Alumina (Neutral)', 'Al\u2082O\u2083 80 \u2013 95%', 'Up to 1750\u00b0C', 'Stainless, tool steel, Cu alloys', '80 \u2013 200 heats'],
        ['Magnesia (Basic)', 'MgO \u2265 85%', 'Up to 1800\u00b0C', 'Mn steel, basic-slag alloys', '40 \u2013 100 heats'],
      ],
    },

    chemicalAnalysis: [
      { property: 'SiO₂ (silica grade)', typical: '98.5%+ min', test: 'IS 1527' },
      { property: 'Al₂O₃ (alumina grade)', typical: '85 – 95%', test: 'IS 1527' },
      { property: 'MgO (magnesia grade)', typical: '90%+ min', test: 'IS 1527' },
      { property: 'Boric Acid Binder (silica)', typical: '0.8 – 1.2%', test: '—' },
    ],
    physicalProperties: [
      { property: 'Bulk Density (after sintering)', typical: '2.8 – 3.2 g/cc', test: 'IS 1528 Pt-8' },
      { property: 'Grain Size', typical: '0 – 6 mm graded', test: 'Sieve analysis' },
      { property: 'Max Service Temperature', typical: 'Up to 1650°C', test: '—' },
    ],
    packaging: '25 / 50 kg HDPE-lined bags. Silica, alumina and magnesia grades by melt type; sintering schedule supplied.',
  },
  'ceramic-fiber-products': {
    gradeTable: {
      title: 'Grade-Wise Typical Specifications (Blanket)',
      note: 'Typical values compiled from published manufacturer datasheets. Densities of 96 / 128 / 160 kg/m\u00b3 are standard across grades.',
      columns: ['Grade', 'Classification Temp', 'Chemistry', 'Density Options', 'Thermal Conductivity (500\u00b0C mean)', 'Shrinkage'],
      rows: [
        ['1260 Grade (RT)', '1260\u00b0C', 'Alumina-silica', '96 / 128 / 160 kg/m\u00b3', '~0.12 W/m\u00b7K (128 kg/m\u00b3)', '< 3% at rated temp'],
        ['1260 Grade (HP)', '1260\u00b0C', 'High-purity alumina-silica', '96 / 128 / 160 kg/m\u00b3', '~0.12 W/m\u00b7K (128 kg/m\u00b3)', '< 2.5% at rated temp'],
        ['1430 Grade (Zr)', '1430\u00b0C', 'Alumina-silica-zirconia', '96 / 128 / 160 kg/m\u00b3', '~0.13 W/m\u00b7K (128 kg/m\u00b3)', '< 3% at rated temp'],
      ],
    },

    chemicalAnalysis: [
      { property: 'Al₂O₃', typical: '45 – 50%', test: 'XRF' },
      { property: 'SiO₂', typical: '50 – 55%', test: 'XRF' },
      { property: 'ZrO₂ (1430°C grade)', typical: '15 – 17%', test: 'XRF' },
    ],
    physicalProperties: [
      { property: 'Bulk Density (blanket)', typical: '64 – 128 kg/m³', test: 'ASTM C167' },
      { property: 'Thermal Conductivity at 800°C', typical: '0.10 – 0.20 W/mK', test: 'ASTM C201' },
      { property: 'Classification Temperature', typical: '1260 / 1350 / 1430°C', test: 'Grade rating' },
      { property: 'Permanent Linear Shrinkage', typical: '< 4% at rated temp', test: 'ASTM C356' },
    ],
    packaging: 'Blanket rolls (7.3 m × 610 mm), modules (300×300 mm), boards (1000×500 mm). Foil-wrapped cartons.',
  },
  'slide-gate-plates': {
    chemicalAnalysis: [
      { property: 'Al₂O₃ (Al₂O₃-C grade)', typical: '85 – 95%', test: 'IS 1527' },
      { property: 'Fixed Carbon', typical: '5 – 10%', test: 'ASTM C831' },
      { property: 'ZrO₂ (Al₂O₃-ZrO₂-C grade)', typical: '5 – 8%', test: 'XRF' },
    ],
    physicalProperties: [
      { property: 'Bulk Density', typical: '3.0 – 3.4 g/cc', test: 'IS 1528 Pt-8' },
      { property: 'Apparent Porosity', typical: '8 – 14%', test: 'IS 1528 Pt-8' },
      { property: 'Cold Crushing Strength', typical: '80 – 150 MPa', test: 'IS 1528 Pt-4' },
      { property: 'Casting Sequence', typical: '6 – 14 heats/plate', test: 'Service data' },
      { property: 'Bore Diameter Range', typical: '30 – 120 mm', test: 'To order' },
    ],
    packaging: 'Tar/resin-impregnated, pre-fired. Plate sets matched to gate mechanism; individually boxed.',
  },
};

export function getProductDatasheet(productId) {
  return PRODUCT_DATASHEETS[productId];
}
