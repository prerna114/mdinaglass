// app/api/shippingRate/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const itemWeightInGrams = searchParams.get("itemWeightInGrams");
  const destinationCountryIsoCode = searchParams.get(
    "destinationCountryIsoCode"
  );
  const insuranceValue = searchParams.get("insuranceValue");
  const insuranceUrl = `https://esellerApi.maltapost.com/v1/Insurance?value=${insuranceValue}`;
  const apiUrl = `https://esellerapi.maltapost.com/v1/rates?itemWeightInGrams=${itemWeightInGrams}&destinationCountryIsoCode=${destinationCountryIsoCode}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        API_KEY: "iQRS8xARAX3T8ohsNi69",
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
