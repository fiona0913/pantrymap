export async function POST(request: Request) {
  const payload = await request.json();
  console.log("Forwarding payload:", payload);

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwObZQjrAUJeFskiosaZ6fWVYnOCDar9NxXTXPZ1bG2jne2R2Po1BEwPvh4qJx1gtMw/exec",
    {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const responseBody = await response.json();
  return new Response(JSON.stringify(responseBody), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
