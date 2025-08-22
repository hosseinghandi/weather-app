// citySuggester.js

// Normalize (remove accents + lowercase)
function normalize(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Build index once (faster lookups)
export function buildCityIndex(worldCities) {
  return Object.entries(worldCities).flatMap(([cc, cities]) =>
    cities.map((name) => ({ name, cc, norm: normalize(name) }))
  );
}

// Search cities in index
export function getCitySuggestions(query, index, { limit = 8, country = null } = {}) {
  const q = normalize(query);
  if (!q) return [];

  let pool = index;
  if (country) pool = pool.filter((c) => c.cc === country.toUpperCase());

  let results = pool.filter((c) => c.norm.includes(q));

  // Ranking: prefix > earlier index > shorter > alphabet
  results.sort((a, b) => {
    const aPrefix = a.norm.startsWith(q) ? 0 : 1;
    const bPrefix = b.norm.startsWith(q) ? 0 : 1;
    if (aPrefix !== bPrefix) return aPrefix - bPrefix;

    const aIdx = a.norm.indexOf(q);
    const bIdx = b.norm.indexOf(q);
    if (aIdx !== bIdx) return aIdx - bIdx;

    if (a.name.length !== b.name.length) return a.name.length - b.name.length;

    return a.name.localeCompare(b.name);
  });

  return results.slice(0, limit);
}
