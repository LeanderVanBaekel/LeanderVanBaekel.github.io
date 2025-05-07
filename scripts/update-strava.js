/**
 * update-strava.js  –  multi‑user Strava ⇢ GitHub Pages exporter
 * ------------------------------------------------------------------
 * ▸ Ondersteunt *meerdere* atleten (zoveel je wilt).
 * ▸ Haalt ALLE activiteiten op (paginatie) – niet alleen een jaartal.
 * ▸ Bewaart per atleet   ▸  data/<user>/raw-activities.json
 *                        ▸  data/<user>/monthly_walk_hike.json
 *
 *   – raw‑activiteiten:  id, date, type, km, name
 *   – maandtotalen:      month(YYYY‑MM) + km (alleen Walk/Hike‑types)
 *
 * Omgevingsvariabelen (repo ▸ Settings ▸ Secrets ▸ Actions)
 * ------------------------------------------------------------------
 *   USERS                  "USER1,USER2"   ← komma‑gescheiden aliases
 *   <ALIAS>_CLIENT_ID      bijv. USER1_CLIENT_ID
 *   <ALIAS>_CLIENT_SECRET
 *   <ALIAS>_REFRESH_TOKEN  (moet scope activity:read of read_all hebben)
 *
 * Voor elke alias in USERS verwacht het script bovengenoemde drie secrets
 * met exact die prefix.
 * ------------------------------------------------------------------
 * 2025 © jouw‑project – MIT
 */

/* eslint-disable no-console */
const fetch = require("node-fetch");
const fs    = require("fs");
const path  = require("path");

// ‑‑‑ Config ‑‑‑
const WALK_HIKE_SET = new Set(["Walk", "Hike", "Trail Run", "Run"]); // voor maandtotalen
const PER_PAGE      = 200; // Strava max.

// ‑‑‑ Helpers ‑‑‑
function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type:    "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`token refresh ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

async function fetchAllActivities(token) {
  const acts = [];
  let page   = 1;
  while (true) {
    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`activities ${res.status}: ${await res.text()}`);

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    acts.push(...batch);
    if (batch.length < PER_PAGE) break; // laatste pagina
    page += 1;
  }
  return acts;
}

function buildRaw(acts) {
  return acts
    .map((a) => ({
      id:   a.id,
      date: a.start_date_local.slice(0, 10), // YYYY‑MM‑DD
      type: a.type,
      km:   +(a.distance / 1000).toFixed(2),
      name: a.name,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildMonthlyWalkHike(raw) {
  const map = new Map();
  for (const a of raw) {
    if (!WALK_HIKE_SET.has(a.type)) continue;
    const m = a.date.slice(0, 7); // YYYY‑MM
    map.set(m, (map.get(m) || 0) + a.km);
  }
  return [...map.entries()]
    .sort(([m1], [m2]) => m1.localeCompare(m2))
    .map(([month, km]) => ({ month, km: +km.toFixed(1) }));
}

function writeJSON(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

// ‑‑‑ Main flow ‑‑‑
(async function main() {
  try {
    const aliases = (process.env.USERS || "").split(/[, ]/).filter(Boolean);
    if (aliases.length === 0) throw new Error("USERS env var is empty – nothing to do");

    for (const alias of aliases) {
      console.log(`\n=== Processing ${alias} ===`);
      const clientId     = env(`${alias}_CLIENT_ID`);
      const clientSecret = env(`${alias}_CLIENT_SECRET`);
      const refreshToken = env(`${alias}_REFRESH_TOKEN`);

      const access = await refreshAccessToken(clientId, clientSecret, refreshToken);
      const acts   = await fetchAllActivities(access);

      const rawArr = buildRaw(acts);
      const monArr = buildMonthlyWalkHike(rawArr);

      writeJSON(path.join("data", alias, "raw-activities.json"),      rawArr);
      writeJSON(path.join("data", alias, "monthly_walk_hike.json"), monArr);

      console.log(`✔ ${alias}: ${rawArr.length} activiteiten – ${monArr.length} maandregels.`);
    }
  } catch (err) {
    console.error("❌ Script failed:", err);
    process.exitCode = 1;
  }
})();
