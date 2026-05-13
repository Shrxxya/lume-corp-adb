export async function GET() {
  try {
    const response = await fetch(
      "https://api.olamaps.io/auth/v1/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "openid",
          client_id:
            process.env.OLA_CLIENT_ID,

          client_secret:
            process.env.OLA_CLIENT_SECRET,
        }),
      }
    );

    const data = await response.json();

    return Response.json({
      access_token: data.access_token,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Failed to get token" },
      { status: 500 }
    );
  }
}