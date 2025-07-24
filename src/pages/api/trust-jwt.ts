// pages/api/trust-jwt.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "56-ed450fa5fd8ab541bbe65933c3bc68453798e707fe43d12d94ebc8e42305dee9";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = {
    iss: "jwt76319@niu.com.mt",
    iat: Math.floor(Date.now() / 1000),
    payload: {
      currencyiso3a: "GBP",
      orderreference: "ORDER12345",
      sitereference: "xkholdings83683",
      accounttypedescription: "ECOM",
      requesttypedescriptions: ["THREEDLOOKUP", "THREEDQUERY", "AUTH"],
      parentform: "st-form",
      returnurl: "http://192.168.1.4:3000/cartpage",
      // baseamount: "1050",
      locale: "en_GB",
      baseamount: "1050",
    },
  };

  const token = jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" });

  res.status(200).json({ token });
}
