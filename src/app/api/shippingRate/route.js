// app/api/shippingRate/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const itemWeightInGrams = searchParams.get("itemWeightInGrams");
  const destinationCountryIsoCode = searchParams.get(
    "destinationCountryIsoCode"
  );

  const apiUrl = `https://esellerapi.maltapost.com/v1/rates?itemWeightInGrams=${itemWeightInGrams}&destinationCountryIsoCode=${destinationCountryIsoCode}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        API_KEY: "q0auLjBiH9HQRImzapr1",
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: true, message: err.message }), {
      status: 500,
    });
  }
}
