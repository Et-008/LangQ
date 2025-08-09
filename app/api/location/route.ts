// app/api/location/route.js
export async function GET(request: any) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] ?? "127.0.0.1";

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return Response.json({
      ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch location" }), {
      status: 500,
    });
  }
}
