import { buildProductUrl } from "./utils/buildProductUrl";
export const API_BASE_URL = "https://mdinaglasses.blackbullsolution.com/";
export const products = [
  {
    id: 1,
    orderId: "OrderId1234",
    price: 37.0,
    qty: 2,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 2,
    orderId: "OrderId1234",
    price: 48.5,
    qty: 3,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 3,
    orderId: "OrderId1234",
    price: 21.0,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
  {
    id: 4,
    orderId: "OrderId1234",
    price: 20.5,
    qty: 1,
    orderDate: "25 May 2024",
    orderStatus: "In-Transit",
  },
];
export const createUrl = (
  categoryID,
  slug,
  thesortORder,
  theLimit,
  thePage,
  sortBy
) => {
  // console.log("dsadadsadadsada", categoryID);
  let sortOrder = thesortORder ? thesortORder : "asc";
  let limit = theLimit ? theLimit : 15;
  let page = thePage ? thePage : 1;
  // console.log(
  //   "the params in create url",
  //   categoryID,
  //   slug,
  //   thesortORder,
  //   theLimit,
  //   thePage
  // );

  const idPath = Array.isArray(categoryID)
    ? categoryID.join("/")
    : String(categoryID);
  // console.log("rohanrohanrohan123", categoryID);
  const cleanSlug = slug ? slug.replace(/\.htm+$/i, "") : "all-product";
  return buildProductUrl(idPath, sortOrder, limit, page, cleanSlug, sortBy);
};
// Move this outside the component
export const extractUniqueOptions = (variants = []) => {
  const optionIdCount = new Map();
  const uniqueOptions = new Map();

  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/^\d+$/.test(key)) return;
      const optionId = value.option_id;
      optionIdCount.set(optionId, (optionIdCount.get(optionId) || 0) + 1);
    });
  });

  variants.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!/^\d+$/.test(key)) return;
      const { option_id, option_value } = value;
      if (optionIdCount.get(option_id) === 1 && !uniqueOptions.has(option_id)) {
        uniqueOptions.set(option_id, option_value);
      }
    });
  });

  return uniqueOptions;
};

export const createImage = (sku) => {
  return (
    `https://mdinaglasses.blackbullsolution.com/storage/product-images/${sku}.jpg` ||
    `https://mdinaglasses.blackbullsolution.com/storage/product-images/${sku}.png ` ||
    `https://mdinaglasses.blackbullsolution.com/storage/product-images/${sku}.webp`
  );
};
export const CountryList = [
  { country: "AFGHANISTAN", code: "AF" },
  { country: "ALBANIA", code: "AL" },
  { country: "ALGERIA", code: "DZ" },
  { country: "AMERICAN SAMOA (U.S.)", code: "AS" },
  { country: "ANDORRA", code: "AD" },
  { country: "ANGOLA", code: "AO" },
  { country: "ANGUILLA (U.K.)", code: "AI" },
  { country: "ANTIGUA AND BARBUDA", code: "AG" },
  { country: "ANTILLES AND ARUBA", code: "11" },
  { country: "ARGENTINA", code: "AR" },
  { country: "ARMENIA", code: "AM" },
  { country: "ARUBA", code: "AW" },
  { country: "ASCENSION ISLAND (U.K.)", code: "14" },
  { country: "AUSTRALIA", code: "AU" },
  { country: "AUSTRIA", code: "AT" },
  { country: "AZERBAIJAN", code: "AZ" },
  { country: "BAHAMAS", code: "BS" },
  { country: "BAHRAIN", code: "BH" },
  { country: "BANGLADESH", code: "BD" },
  { country: "BARBADOS", code: "BB" },
  { country: "BELGIUM", code: "BE" },
  { country: "BELIZE", code: "BZ" },
  { country: "BENIN", code: "BJ" },
  { country: "BERMUDA (U.K.)", code: "BM" },
  { country: "BHUTAN", code: "BT" },
  { country: "BOLIVIA", code: "BO" },
  {
    country: "BONAIRE, SAINT EUSTATIUS AND SABA (NETHERLANDS)",
    code: "BQ",
  },
  { country: "BOSNIA-HERZEGOVINA", code: "BA" },
  { country: "BOTSWANA", code: "BW" },
  { country: "BRAZIL", code: "BR" },
  { country: "BRUNEI DARUSSALAM", code: "BN" },
  { country: "BULGARIA", code: "BG" },
  { country: "BURKINA FASO", code: "BF" },
  { country: "BURUNDI", code: "BI" },
  { country: "CAMBODIA", code: "KH" },
  { country: "CAMEROON", code: "CM" },
  { country: "CANADA", code: "CA" },
  { country: "CAPE VERDE", code: "CV" },
  { country: "CAYMAN ISLANDS", code: "KY" },
  { country: "CENTRAL AFRICAN REPUBLIC", code: "CF" },
  { country: "CHAD", code: "TD" },
  { country: "CHANNEL ISLANDS", code: "301" },
  { country: "CHILE", code: "CL" },
  { country: "CHINA PRC", code: "CN" },
  { country: "CHRISTMAS ISLAND (AUSTRALIA)", code: "CX" },
  { country: "COCOS (KEELING) ISLANDS (AUSTRALIA)", code: "CC" },
  { country: "COLOMBIA", code: "CO" },
  { country: "COMOROS", code: "KM" },
  { country: "CONGO", code: "CG" },
  { country: "CONGO, THE DEMOCRATIC REPUBLIC OF THE", code: "CD" },
  { country: "COOK ISLANDS (NEW ZEALAND)", code: "CK" },
  { country: "COSTA RICA", code: "CR" },
  { country: "CROATIA", code: "HR" },
  { country: "CUBA", code: "CU" },
  { country: "CURACAO", code: "CW" },
  { country: "CYPRUS", code: "CY" },
  { country: "CZECH REPUBLIC", code: "CZ" },
  { country: "DENMARK", code: "DK" },
  { country: "DJIBOUTI", code: "DJ" },
  { country: "DOMINICA", code: "DM" },
  { country: "DOMINICAN REPUBLIC", code: "DO" },
  { country: "ECUADOR", code: "EC" },
  { country: "EGYPT", code: "EG" },
  { country: "EL SALVADOR", code: "SV" },
  { country: "EQUATORIAL GUINEA", code: "GQ" },
  { country: "ERITREA", code: "ER" },
  { country: "ESTONIA", code: "EE" },
  { country: "ETHIOPIA", code: "ET" },
  { country: "FALKLAND ISLANDS (MALVINAS) (U.K.)", code: "FK" },
  { country: "FAROE ISLANDS (DENMARK)", code: "FO" },
  { country: "FIJI", code: "FJ" },
  { country: "FINLAND", code: "FI" },
  { country: "FRANCE", code: "FR" },
  { country: "FRENCH GUIANA (FRANCE)", code: "GF" },
  { country: "FRENCH POLYNESIA (FRANCE)", code: "PF" },
  {
    country: "FRENCH SOUTHERN & ANTARCTIC TERRITORIES (FRANCE)",
    code: "TF",
  },
  { country: "GABON", code: "GA" },
  { country: "GAMBIA", code: "GM" },
  { country: "GEORGIA", code: "GE" },
  { country: "GERMANY", code: "DE" },
  { country: "GHANA", code: "GH" },
  { country: "GIBRALTAR (U.K.)", code: "GI" },
  { country: "GREECE", code: "GR" },
  { country: "GREENLAND (DENMARK)", code: "GL" },
  { country: "GRENADA", code: "GD" },
  { country: "GUADELOUPE (FRANCE)", code: "GP" },
  { country: "GUAM (U.S.A.)", code: "GU" },
  { country: "GUATEMALA", code: "GT" },
  { country: "GUERNSEY (U.K.)", code: "GG" },
  { country: "GUINEA", code: "GN" },
  { country: "GUINEA-BISSAU", code: "GW" },
  { country: "GUYANA", code: "GY" },
  { country: "HAITI", code: "HT" },
  { country: "HONDURAS", code: "HN" },
  { country: "HONG KONG (P.R. CHINA)", code: "HK" },
  { country: "HUNGARY", code: "HU" },
  { country: "ICELAND", code: "IS" },
  { country: "INDIA", code: "IN" },
  { country: "INDONESIA", code: "ID" },
  { country: "IRAN, ISLAMIC REPUBLIC OF", code: "IR" },
  { country: "IRAQ", code: "IQ" },
  { country: "IRELAND", code: "IE" },
  { country: "ISLE OF MAN (U.K.)", code: "IM" },
  { country: "ISRAEL", code: "IL" },
  { country: "ITALY", code: "IT" },
  { country: "IVORY COAST", code: "CI" },
  { country: "JAMAICA", code: "JM" },
  { country: "JAPAN", code: "JP" },
  { country: "JERSEY", code: "JE" },
  { country: "JORDAN", code: "JO" },
  { country: "KAZAKHSTAN", code: "KZ" },
  { country: "KENYA", code: "KE" },
  { country: "KIRIBATI", code: "KI" },
  {
    country: "KOREA (NORTH), DEMOCRATIC PEOPLES' REPUBLIC OF",
    code: "133",
  },
  { country: "KOREA (SOUTH), REPUBLIC OF", code: "KR" },
  { country: "KOSOVO", code: "KO" },
  { country: "KUWAIT", code: "KW" },
  { country: "KYRGYZSTAN", code: "KG" },
  { country: "LAO, PEOPLE'S DEMOCRATIC REPUBLIC OF", code: "LA" },
  { country: "LATVIA", code: "LV" },
  { country: "LEBANON", code: "LB" },
  { country: "LESOTHO", code: "LS" },
  { country: "LIBERIA", code: "LR" },
  { country: "LIBYA", code: "141" },
  { country: "LIECHTENSTEIN", code: "LI" },
  { country: "LITHUANIA", code: "LT" },
  { country: "LUXEMBOURG", code: "LU" },
  { country: "MACAO (CHINA)", code: "MO" },
  { country: "MACEDONIA", code: "MK" },
  { country: "MADAGASCAR", code: "MG" },
  { country: "MADEIRA (PORTUGAL)", code: "149" },
  { country: "MALAWI", code: "MW" },
  { country: "MALAYSIA", code: "MY" },
  { country: "MALDIVES", code: "MV" },
  { country: "MALI", code: "ML" },
  { country: "MALTA", code: "MT" },
  { country: "MARSHALL ISLANDS", code: "MH" },
  { country: "MARTINIQUE", code: "MQ" },
  { country: "MAURITANIA", code: "MR" },
  { country: "MAURITIUS", code: "MU" },
  { country: "MEXICO", code: "MX" },
  { country: "MICRONESIA (FEDERATED STATES OF)", code: "FM" },
  { country: "MOLDOVA", code: "MD" },
  { country: "MONACO", code: "MC" },
  { country: "MONGOLIA", code: "MN" },
  { country: "MONTENEGRO", code: "ME" },
  { country: "MONTSERRAT (U.K.)", code: "MS" },
  { country: "MOROCCO", code: "MA" },
  { country: "MOZAMBIQUE", code: "MZ" },
  { country: "MYANMAR", code: "MM" },
  { country: "NAMIBIA", code: "NA" },
  { country: "NAURU", code: "NR" },
  { country: "NEPAL", code: "NP" },
  { country: "NETHERLANDS", code: "NL" },
  { country: "NEW CALEDONIA (FRANCE)", code: "NC" },
  { country: "NEW ZEALAND", code: "NZ" },
  { country: "NICARAGUA", code: "NI" },
  { country: "NIGER", code: "NE" },
  { country: "NIGERIA", code: "NG" },
  { country: "NIUE (NEW ZEALAND)", code: "NU" },
  { country: "NORFOLK ISLAND (AUSTRALIA)", code: "NF" },
  { country: "NORTHERN IRELAND (U.K.)", code: "GZ" },
  { country: "NORWAY", code: "NO" },
  { country: "OMAN", code: "OM" },
  { country: "PAKISTAN", code: "PK" },
  { country: "PALAU", code: "PW" },
  { country: "PANAMA", code: "PA" },
  { country: "PAPUA NEW GUINEA", code: "PG" },
  { country: "PARAGUAY", code: "PY" },
  { country: "PERU", code: "PE" },
  { country: "PHILIPPINES", code: "PH" },
  {
    country: "PITCAIRN, HENDERSON, DUCIE AND OENO ISLANDS (U.K.)",
    code: "PN",
  },
  { country: "POLAND", code: "PL" },
  { country: "PORTUGAL", code: "PT" },
  { country: "PUERTO RICO (U.S.A.)", code: "PR" },
  { country: "QATAR", code: "QA" },
  { country: "REUNION (FRANCE)", code: "RE" },
  { country: "ROMANIA", code: "RO" },
  { country: "RWANDA", code: "RW" },
  { country: "SAINT BARTHELEMY (FRANCE)", code: "BL" },
  { country: "SAINT HELENA (U.K.)", code: "SH" },
  { country: "SAINT KITTS (SAINT CHRISTOPHER) AND NEVIS", code: "KN" },
  { country: "SAINT LUCIA", code: "LC" },
  { country: "SAINT PIERRE AND MIQUELON (FRANCE)", code: "PM" },
  { country: "SAINT VINCENT AND THE GRENADINES", code: "VC" },
  { country: "SAMOA", code: "WS" },
  { country: "SAN MARINO", code: "SM" },
  { country: "SAO TOME AND PRINCIPE", code: "ST" },
  { country: "SAUDI ARABIA", code: "SA" },
  { country: "SCOTLAND", code: "GB" },
  { country: "SENEGAL", code: "SN" },
  { country: "SERBIA, REPUBLIC", code: "RS" },
  { country: "SEYCHELLES", code: "SC" },
  { country: "SICILY", code: "SS" },
  { country: "SIERRA LEONE", code: "SL" },
  { country: "SINGAPORE", code: "SG" },
  { country: "SINT MAARTEN (NETHERLANDS)", code: "SX" },
  { country: "SLOVAKIA", code: "SK" },
  { country: "SLOVENIA", code: "SI" },
  { country: "SOLOMON ISLANDS", code: "SB" },
  { country: "SOMALIA", code: "SO" },
  { country: "SOUTH AFRICA", code: "ZA" },
  { country: "SOUTH GEORGIA AND THE SOUTH SANDWICH (U.K.)", code: "GS" },
  { country: "SPAIN", code: "ES" },
  { country: "SPAIN - CANARY ISLANDS", code: "IC" },
  { country: "SPAIN - CUETA AND MELILLA", code: "EA" },
  { country: "SRI LANKA", code: "LK" },
  { country: "SURINAME", code: "SR" },
  { country: "SWAZILAND", code: "SZ" },
  { country: "SWEDEN", code: "SE" },
  { country: "SWITZERLAND", code: "CH" },
  { country: "SYRIA", code: "SY" },
  { country: "TAIWAN, CHINA", code: "TW" },
  { country: "TAJIKISTAN", code: "TJ" },
  { country: "TANZANIA, UNITED REPUBLIC OF", code: "TZ" },
  { country: "THAILAND", code: "TH" },
  { country: "TIMOR-LESTE", code: "TL" },
  { country: "TOGO", code: "TG" },
  { country: "TONGA (INCLUDING NIUAFO'OU)", code: "TO" },
  { country: "TRINIDAD AND TOBAGO", code: "TT" },
  { country: "TRISTAN DA CUNHA (U.K.)", code: "238" },
  { country: "TUNISIA", code: "TN" },
  { country: "TURKEY", code: "TR" },
  { country: "TURKMENISTAN", code: "TM" },
  { country: "TURKS AND CAICOS ISLANDS (U.K.)", code: "TC" },
  { country: "TUVALU", code: "TV" },
  { country: "UGANDA", code: "UG" },
  { country: "UKRAINE", code: "UA" },
  { country: "UNITED ARAB EMIRATES", code: "AE" },
  { country: "UNITED KINGDOM", code: "GB" },
  { country: "UNITED KINGDOM (LONDON)", code: "323" },
  { country: "UNITED KINGDOM (OTHERS)", code: "324" },
  { country: "URUGUAY", code: "UY" },
  { country: "USA", code: "US" },
  { country: "USA (NEW YORK)", code: "UN" },
  { country: "USA (OTHERS)", code: "UO" },
  { country: "UZBEKISTAN", code: "UZ" },
  { country: "VANUATU", code: "VU" },
  { country: "VATICAN CITY", code: "VA" },
  { country: "VENEZUELA", code: "VE" },
  { country: "VIETNAM", code: "VN" },
  { country: "VIRGIN ISLANDS, BRITISH (U.K.)", code: "VG" },
  { country: "VIRGIN ISLANDS, U.S.", code: "VI" },
  { country: "WALES", code: "GB" },
  { country: "WALLIS AND FUTUNA (FRANCE)", code: "WF" },
  { country: "YEMEN", code: "YE" },
  { country: "ZAMBIA", code: "ZM" },
  { country: "ZIMBABWE", code: "ZW" },
];
export const getCategoryPath = (product) => {
  const path = [];

  // Only process the first category
  const category = product?.categories?.[0];
  if (!category) return "";

  let current = category.parent;

  // Traverse and collect only the first two non-root parents
  while (current && current.slug !== "root") {
    path.unshift(current.id); // unshift to reverse the order
    current = current.parent;
  }
  console.log("getCategoryPath", `/${path.join("/")}`);
  // setCategoryIds(path.join("/"));
  return `${path.join("/")}`;
};
