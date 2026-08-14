/**
 * Grade alias, SK equivalence and designation cross-reference.
 *
 * Refractory grades are named differently by market:
 *   India / SAPL      : HA-70, AL-70, "70% alumina"
 *   Export / EU / GCC : SK series (Seger Kegel)
 *
 * A buyer in Sharjah asking for "SK 38 fire brick" and a buyer in Bhilai
 * asking for "AL70 high alumina brick" want the same material. These helpers
 * bridge the two so either search lands on the right SAPL grade page.
 *
 * IMPORTANT, on how the SK match is derived:
 * SK is a Seger cone (refractoriness) designation, but in trade practice each
 * SK number carries an accepted minimum Al2O3 content. The reliable bridge
 * between an SK enquiry and a SAPL grade is therefore ALUMINA CONTENT, not the
 * `pce` value on a spec row (which states a given brick's own measured
 * refractoriness and is a different quantity). Matching on alumina also fails
 * safe commercially: a grade is only offered against an SK code when it meets
 * or exceeds that code's minimum alumina, never under-specs the buyer.
 *
 * SK_SERIES below is SAPL's own compilation of the widely published minimum
 * alumina and cone temperature for each SK step, cross-checked across several
 * independent industry sources. Individual suppliers vary at the margins,
 * notably around SK34, which is why the pages carry an explicit caveat telling
 * buyers to confirm Al2O3 and PCE together rather than trusting an SK code alone.
 */

/**
 * Product families the SK cross-reference may be applied to.
 *
 * SK (Seger Kegel) is a refractoriness designation used in trade for DENSE
 * FIRED ALUMINA-SILICATE BRICK. It is not how buyers specify monolithics
 * (castables, mortars, ramming and gunning mixes), isostatically pressed or
 * carbon-bonded flow-control shapes, fused-cast blocks, or insulating firebrick.
 *
 * Restricting the cross-reference matters commercially, not just semantically:
 * an insulating firebrick can carry enough alumina to clear an SK step on paper
 * while being a lightweight, low-strength product. A buyer asking for "SK 35"
 * wants a dense load-bearing brick, so offering IFB against that code would
 * answer the enquiry with structurally unsuitable material. Flow-control and
 * castable grades are specified by chemistry, dimensions and application
 * instead, so an SK code there is noise at best.
 */
export const SK_ELIGIBLE_PRODUCTS = new Set([
  'high-alumina-bricks',
  'fireclay-bricks',
  'mullite-bricks',
  'andalusite-bricks',
]);

export function isSkEligible(productId) {
  return SK_ELIGIBLE_PRODUCTS.has(productId);
}

/** Standard SK steps: minimum Al₂O₃ and Seger cone equivalent temperature. */
export const SK_SERIES = [
  { sk: 'SK 30', minAl2O3: 30, coneC: 1670 },
  { sk: 'SK 32', minAl2O3: 32, coneC: 1710 },
  { sk: 'SK 34', minAl2O3: 38, coneC: 1750 },
  { sk: 'SK 35', minAl2O3: 45, coneC: 1770 },
  { sk: 'SK 36', minAl2O3: 55, coneC: 1790 },
  { sk: 'SK 37', minAl2O3: 65, coneC: 1820 },
  { sk: 'SK 38', minAl2O3: 70, coneC: 1850 },
  { sk: 'SK 40', minAl2O3: 82, coneC: 1920 },
];

export function slugifyGrade(grade) {
  return String(grade || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Spec rows use `grade` or `type` for the designation. */
export function getGradeLabel(row) {
  return row?.grade || row?.type || '';
}

/** "68-72%" -> 70, "≥45%" -> 45, "45-50%" -> 47.5, unparseable -> null */
export function aluminaMidpoint(al2o3) {
  const nums = String(al2o3 || '').match(/\d+(?:\.\d+)?/g);
  if (!nums?.length) return null;
  const vals = nums.map(Number);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/** "HA-70" -> { prefix: 'HA', num: '70' } */
function parseGrade(label) {
  const m = String(label || '').trim().match(/^([A-Za-z]{1,3})[\s-]?(\d{2,3})$/);
  return m ? { prefix: m[1].toUpperCase(), num: m[2] } : null;
}

/**
 * Assign SK codes across a product's full grade range.
 *
 * For each SK step, the grade offered is the LOWEST-alumina grade that still
 * meets or exceeds that step's minimum. This guarantees one grade per SK code
 * (so no alias resolves to two pages) and never offers an under-spec product.
 *
 * Returns a Map of grade label -> array of SK codes.
 */
export function buildSkMap(specs) {
  const map = new Map();
  if (!Array.isArray(specs)) return map;

  const candidates = specs
    .map((row) => ({ label: getGradeLabel(row), mid: aluminaMidpoint(row?.al2o3) }))
    .filter((c) => c.label && c.mid !== null)
    .sort((a, b) => a.mid - b.mid);

  if (!candidates.length) return map;

  SK_SERIES.forEach(({ sk, minAl2O3 }) => {
    const match = candidates.find((c) => c.mid >= minAl2O3);
    if (!match) return;
    if (!map.has(match.label)) map.set(match.label, []);
    map.get(match.label).push(sk);
  });

  return map;
}

/** SK codes for one grade, given its product's full spec range. */
export function getSkCodes(row, specs) {
  return buildSkMap(specs).get(getGradeLabel(row)) || [];
}

/**
 * The single SK step this grade actually IS: the highest step whose minimum
 * alumina the grade still satisfies.
 *
 * This is the only SK code that may be presented as an equivalent. HA-45 at
 * 45-50% Al2O3 is an SK 35 brick. It is NOT "an SK 30 brick", even though it
 * comfortably clears SK 30's 30% minimum, and claiming otherwise misleads a
 * buyer about what they are being sold.
 */
export function getDirectSk(row) {
  const mid = aluminaMidpoint(row?.al2o3);
  if (mid === null) return null;
  let match = null;
  SK_SERIES.forEach((step) => {
    if (mid >= step.minAl2O3) match = step;
  });
  return match;
}

/**
 * Lower SK steps this grade over-satisfies. Presented as "also meets", never
 * as an equivalence, and flagged as over-spec so the buyer knows a lower
 * grade may cover the same duty more economically.
 */
export function getAlsoMeetsSk(row) {
  const direct = getDirectSk(row);
  if (!direct) return [];
  return SK_SERIES.filter((s) => s.minAl2O3 < direct.minAl2O3);
}

/**
 * Alternate slugs that should resolve to this grade's page.
 * Canonical slug excluded, callers add it separately.
 */
export function buildGradeAliases(row, specs, productId) {
  const label = getGradeLabel(row);
  const canonical = slugifyGrade(label);
  const aliases = new Set();

  const parsed = parseGrade(label);
  if (parsed) {
    const { prefix, num } = parsed;
    aliases.add(`${prefix.toLowerCase()}${num}`);
    aliases.add(`${prefix.toLowerCase()}-${num}`);

    // HA and AL are used interchangeably for high alumina in Indian trade
    if (prefix === 'HA' || prefix === 'AL') {
      const other = prefix === 'HA' ? 'al' : 'ha';
      aliases.add(`${other}${num}`);
      aliases.add(`${other}-${num}`);
    }

    // Alumina-content aliases only where the grade number IS an alumina figure.
    // SiC-70 is 70% silicon carbide, ZS-65 is a zircon grade and CS-650 is a
    // temperature rating, so "70-alumina"/"650-alumina" would be plainly false.
    if (row?.al2o3) {
      aliases.add(`${num}-alumina`);
      aliases.add(`high-alumina-${num}`);
    }
  }

  // SK codes, derived from alumina content across the whole range. Only for
  // families where an SK designation is how the product is actually traded.
  if (isSkEligible(productId)) {
    getSkCodes(row, specs).forEach((sk) => {
      const n = sk.replace(/\D/g, '');
      aliases.add(`sk-${n}`);
      aliases.add(`sk${n}`);
    });
  }

  aliases.delete(canonical);
  return [...aliases];
}

/** Rows for the designations cross-reference block. Only real data. */
export function getGradeDesignations(row, productId) {
  const label = getGradeLabel(row);
  const parsed = parseGrade(label);
  const skOk = isSkEligible(productId);
  const direct = skOk ? getDirectSk(row) : null;
  const alsoMeets = skOk ? getAlsoMeetsSk(row) : [];
  const out = [{ system: 'SAPL grade code', value: label }];

  if (parsed) {
    const { prefix, num } = parsed;
    const alt = prefix === 'HA' ? `AL-${num}` : prefix === 'AL' ? `HA-${num}` : null;
    // Only call the number an alumina figure when the row actually reports Al₂O₃.
    const forms = [alt, row?.al2o3 ? `${num}% alumina` : null].filter(Boolean).join(', ');
    if (forms) out.push({ system: 'Indian trade names', value: forms });
  }

  if (direct) {
    out.push({
      system: 'Export SK equivalent',
      value: direct.sk,
      note: `Nearest SK step, minimum ${direct.minAl2O3}% Al₂O₃`,
    });
  }
  if (alsoMeets.length) {
    out.push({
      system: 'Also meets',
      value: alsoMeets.map((s) => s.sk).join(', '),
      note: 'Exceeds these requirements, a lower grade may suit those duties',
    });
  }
  if (row?.al2o3) out.push({ system: 'Alumina content', value: `${row.al2o3} Al₂O₃` });
  if (row?.pce) {
    out.push({
      system: 'Measured refractoriness (PCE)',
      value: row.pce,
      note: 'This brick’s own cone value, not its SK trade grade',
    });
  }
  if (row?.temp) out.push({ system: 'Max service temperature', value: row.temp });

  return out;
}

/**
 * Alternate names safe to present as equivalents, for intro copy, title and
 * meta description. Only the direct SK step is included, never the lower steps
 * the grade merely over-satisfies.
 */
export function getAliasNames(row, productId) {
  const label = getGradeLabel(row);
  const parsed = parseGrade(label);
  const names = [];

  if (parsed) {
    const { prefix, num } = parsed;
    if (prefix === 'HA') names.push(`AL-${num}`);
    if (prefix === 'AL') names.push(`HA-${num}`);
    // "650% alumina" for a CS-650 calcium silicate board is nonsense: only
    // present the grade number as an alumina figure when Al₂O₃ is reported.
    if (row?.al2o3) names.push(`${num}% alumina`);
  }
  const direct = isSkEligible(productId) ? getDirectSk(row) : null;
  if (direct) names.push(direct.sk);
  return names;
}
