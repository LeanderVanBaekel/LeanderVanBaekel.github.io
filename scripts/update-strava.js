/**
 * update-strava.js  –  GitHub Actions helper
 * -------------------------------------------------------------
 * ▸ Haalt (hard‑gefilterde) Strava‑activiteiten op via refresh‑token
 * ▸ Schrijft twee JSON‑bestanden voor GitHub Pages:
 *     1. data/raw-activities.json      → elke activiteit (Run, Trail Run, Walk, Hike)
 *     2. data/monthly.json             → totaal‑kilometers per maand (YYYY‑MM)
 *
 *   Beide bestanden worden overschreven bij iedere workflow‑run, zodat
 *   je front‑end altijd verse data heeft.
 *
 * Omgevingsvariabelen (repository ▸ Settings ▸ Secrets ▸ Actions):
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_REFRESH_TOKEN   (met minstens scope "activity:read")
 * -------------------------------------------------------------
 */

// minimumeisen: Node 18 + node-fetch v2
const fetch = require("node-fetch");
const fs    = require("fs");
const path  = require("path");

// -------------------------------------------------------------
// Config – pas aan naar eigen voorkeur
// -------------------------------------------------------------
const YEAR            = 2025;                               // welk jaar wil je verwerken?
const ALLOWED_TYPES   = new Set(["Run", "Trail Run", "Walk", "Hike"]);
const RAW_OUT_FILE    = path.join(process.cwd(), "data", "raw-activities.json");
const MONTHLY_OUT     = path.join(process.cwd(), "data", "monthly.json");

// bereken epoch (seconds) van 1 jan <YEAR> 00:00 UTC
const AFTER_EPOCH = Date.UTC(YEAR, 0, 1, 0, 0, 0) / 1000;

// -------------------------------------------------------------
// 1. Access‑token verversen
// -------------------------------------------------------------
async function refreshAccessToken() {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id:     process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type:    "refresh_token",
    }),
  });

  if (!res.ok) throw new Error(`Token‑refresh fault: ${res.status} ${await res.text()}`);

  const { access_token } = await res.json();
  return access_token;
}

// -------------------------------------------------------------
// 2. Alle activiteiten sinds 1 jan ophalen (max 200)
//    → wil je verder terug? loop over pagina's of verhoog per_page 
// -------------------------------------------------------------
async function fetchActivities(token) {
  const url = `https://www.strava.com/api/v3/athlete/activities?after=${AFTER_EPOCH}&per_page=200`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

  if (!res.ok) throw new Error(`Activities fault: ${res.status} ${await res.text()}`);

  return await res.json();
}

// -------------------------------------------------------------
// 3a. Filter + map → raw‑array (datum, type, km, id, naam)
// -------------------------------------------------------------
function buildRaw(activities) {
  if (!Array.isArray(activities)) {
    console.warn("⚠️  Strava antwoordde geen array:", activities);
    return [];
  }
  return activities
    .filter((a) => ALLOWED_TYPES.has(a.type))
    .map((a) => ({
      id:    a.id,
      date:  a.start_date_local.slice(0, 10), // YYYY‑MM‑DD
      type:  a.type,
      km:    +(a.distance / 1000).toFixed(2),
      name:  a.name,
    }));
}

// -------------------------------------------------------------
// 3b. Groepeer per maand → [{month:'YYYY‑MM', km:tot}]
// -------------------------------------------------------------
function buildMonthly(raw) {
  const map = new Map(); // key: YYYY‑MM → total KM
  for (const act of raw) {
    const month = act.date.slice(0, 7); // YYYY‑MM
    map.set(month, (map.get(month) || 0) + act.km);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, km]) => ({ month, km: +km.toFixed(1) }));
}

// -------------------------------------------------------------
// 4. Main
// -------------------------------------------------------------
(async function main() {
  try {
    const token  = await refreshAccessToken();
    const acts   = await fetchActivities(token);

    const rawArr = buildRaw(acts);
    const monArr = buildMonthly(rawArr);

    fs.mkdirSync(path.dirname(RAW_OUT_FILE), { recursive: true });
    fs.writeFileSync(RAW_OUT_FILE, JSON.stringify(rawArr, null, 2));
    fs.writeFileSync(MONTHLY_OUT,  JSON.stringify(monArr, null, 2));

    console.log(`✅  ${rawArr.length} activiteiten  →  ${RAW_OUT_FILE}`);
    console.log(`✅  ${monArr.length} maanden      →  ${MONTHLY_OUT}`);
  } catch (err) {
    console.error("❌  update-strava.js failed:", err);
    process.exitCode = 1;
  }
})();
