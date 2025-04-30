// Requires node-fetch v2 (kleinste bundle)
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

// 1. ververs access_token
async function getAccessToken() {
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
  return (await rsp.json()).access_token;
}

// 2. fetch activiteiten na 1 mei 2025 00:00 UTC
async function getMayActivities(token) {
  const after = 1714521600; // epoch(2025-05-01T00:00:00Z)
  const rsp = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return await rsp.json();
}

// 3. reduceren & cumuleren
function buildSeries(activities) {
  const runs = activities
    .filter((a) => a.type === "Run")
    .map((a) => ({
      date: a.start_date_local.slice(0, 10),
      km: a.distance / 1000,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  let total = 0;
  return runs.map((r) => ({
    date: r.date,
    km: +(total += r.km).toFixed(1),
  }));
}

(async () => {
  const token = await getAccessToken();              //  [oai_citation:2‡Strava Developers](https://developers.strava.com/docs/authentication/?utm_source=chatgpt.com)
  const acts = await getMayActivities(token);
  const series = buildSeries(acts);

  const outPath = path.join(__dirname, "..", "data", "may2025.json");
  fs.writeFileSync(outPath, JSON.stringify(series, null, 2));
  console.log(`Wrote ${series.length} rows to ${outPath}`);
})();