let cachedToken = null;
let expiry = 0;

export async function getOlaToken() {
  const now = Date.now();

  if (cachedToken && now < expiry) {
    return cachedToken;
  }

  const res = await fetch("https://api.olamaps.io/auth/v1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.OLA_CLIENT_ID,
      client_secret: process.env.OLA_CLIENT_SECRET,
      scope: "openid",
    }),
  });

  const data = await res.json();

  cachedToken = data.access_token;
  expiry = now + 50 * 60 * 1000; // cache 50 min

  return cachedToken;
}