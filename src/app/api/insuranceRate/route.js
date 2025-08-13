// app/api/shippingRate/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const insuranceValue = searchParams.get("value");
  console.log("insuranceValue Inside", insuranceValue);
  const insuranceUrl = `https://esellerApi.maltapost.com/v1/Insurance?value=${insuranceValue}`;

  try {
    const response = await fetch(insuranceUrl, {
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
