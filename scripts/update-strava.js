/**
 * update-strava.js
 *
 * GitHub Actions helper script to pull Strava activities for May 2025 and
 * write a cumulative-distance JSON file that can be served by GitHub Pages.
 *
 * Environment variables (add them as repository Secrets):
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_REFRESH_TOKEN
 *
 * Usage (inside CI step):
 *   node scripts/update-strava.js
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

// --------------------------------------------------------
// Config – tweak to taste
// --------------------------------------------------------
const AFTER_EPOCH = 1714521600; // 2025-05-01T00:00:00Z
const ALLOWED_TYPES = new Set(["Run", "Trail Run", "Walk", "Hike"]);
const OUTPUT_FILE = path.join(process.cwd(), "data", "may2025.json");

// --------------------------------------------------------
// 1. Refresh access token
// --------------------------------------------------------
async function refreshAccessToken() {
  const rsp = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!rsp.ok) {
    const text = await rsp.text();
    throw new Error(`Strava token refresh failed: ${rsp.status} ${text}`);
  }

  const { access_token } = await rsp.json();
  return access_token;
}

// --------------------------------------------------------
// 2. Fetch activities after 1 May 2025
// --------------------------------------------------------
async function fetchActivities(token) {
  const url = `https://www.strava.com/api/v3/athlete/activities?after=${AFTER_EPOCH}&per_page=200`;
  const rsp = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!rsp.ok) {
    const text = await rsp.text();
    throw new Error(`Strava activities request failed: ${rsp.status} ${text}`);
  }

  return await rsp.json();
}

// --------------------------------------------------------
// 3. Transform → cumulative-km time-series
// --------------------------------------------------------
function buildSeries(activities) {
  if (!Array.isArray(activities)) {
    console.warn("Strava returned non-array payload:", activities);
    return [];
  }

  const dayRows = activities
    .filter((a) => ALLOWED_TYPES.has(a.type))
    .map((a) => ({
      date: a.start_date_local.slice(0, 10), // YYYY-MM-DD
      km: a.distance / 1000,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  let total = 0;
  return dayRows.map((r) => ({
    date: r.date,
    km: +(total += r.km).toFixed(1),
  }));
}

// --------------------------------------------------------
// 4. Main
// --------------------------------------------------------
(async function main() {
  try {
    const token = await refreshAccessToken();
    const acts = await fetchActivities(token);
    const series = buildSeries(acts);

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(series, null, 2));

    console.log(`✅ Wrote ${series.length} rows → ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ update-strava.js failed:", err);
    process.exitCode = 1;
  }
})();
