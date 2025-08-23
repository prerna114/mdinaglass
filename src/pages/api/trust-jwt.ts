// pages/api/trust-jwt.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET =
  "56-ed450fa5fd8ab541bbe65933c3bc68453798e707fe43d12d94ebc8e42305dee9";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = {
      iss: "jwt76319@niu.com.mt", // Must match Trust Payments Webservices JWT user
      iat: Math.floor(Date.now() / 1000),
      jti: uuidv4(), // unique token ID
      payload: {
        // currencyiso3a: "GBP",
        currencyiso3a: "EUR",
        returnurl: "http://localhost:3000/", // ✅ Success redirect
        errorurl: "http://localhost:3000/",
        orderreference: "ORDER12345",
        sitereference: "xkholdings83683",
        accounttypedescription: "ECOM",
        requesttypedescriptions: ["THREEDQUERY", "AUTH"],
        baseamount: "100",
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("JWT generation failed:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
}
