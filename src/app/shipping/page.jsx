"use client";
import { CustomToast } from "../components/CustomToast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MegaMenu from "../components/Megamenu";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const [shipping, setShipping] = useState(false);
  const router = useRouter();
  const [filed, setFiled] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    telePhone: "",
    fax: "",
  });
  const [error, setError] = useState({});

  const handleText = (name, value) => {
    setFiled((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fieldRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    company: useRef(null),
    email: useRef(null),
    addressOne: useRef(null),
    addressTwo: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    country: useRef(null),
    telePhone: useRef(null),
    fax: useRef(null),
  };
  const validation = () => {
    const newError = {};
    if (!filed?.firstName.trim()) {
      newError.firstName = "First name required*";
    } else if (!filed?.lastName?.trim()) {
      newError.lastName = "Last name required*";
    } else if (!filed?.company?.trim()) {
      newError.company = "Company name required*";
    } else if (!filed?.email?.trim()) {
      newError.email = "Email is required*";
    } else if (!filed?.addressOne?.trim()) {
      newError.addressOne = "Address is required*";
    } else if (!filed?.addressTwo?.trim()) {
      newError.addressTwo = "Address two is required*";
    } else if (!filed?.city?.trim()) {
      newError.city = "City is required*";
    } else if (!filed?.state?.trim()) {
      newError.state = "State is required*";
    } else if (!filed?.zipCode?.trim()) {
      newError.zipCode = "zip Code is required*";
    } else if (!filed?.country?.trim()) {
      newError.country = "Country is required*";
    } else if (!filed?.telePhone?.trim()) {
      newError.telePhone = "TelePhone is required*";
    } else if (!filed?.fax?.trim()) {
      newError.fax = "Fax is required*";
      console.log("FLax is not avialel");
    }
    setError(newError);
    console.log("Object.keys(newError)[0]", Object.keys(newError)[0], newError);
    if (Object.keys(newError).length > 0) {
      CustomToast("Please fill all required fields", "top-right");

      const firstErrorKey = Object.keys(newError)[0];
      fieldRef[firstErrorKey]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    } else {
      localStorage.setItem("shiipingaddreess", JSON.stringify(filed));
      router.push("/shippingMethod");
    }

    return true;
  };
  useEffect(() => {
    const data = localStorage.getItem("billingaddress");
    console.log("Billing addr", JSON.parse(data));
    if (data) {
      setFiled(JSON.parse(data));
    }
  }, []);
  console.log("Hndle text", typeof filed);

  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}

      {shipping == false && (
        <div
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="header-product bg-white">
            <h1>Checkout: Enter Billing Details</h1>
          </div>

          <div className="container">
            <div className="login-signup">
              <div className="row">
                <div className="col-md-12">
                  <div className="login-sec  checkout-sec">
                    <h2>2. Billing Information</h2>
                    <p>
                      Fill in the fields below with your billing information:
                    </p>

                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        ref={fieldRef?.firstName}
                        onChange={(e) => {
                          handleText("firstName", e.target.value);
                        }}
                        value={
                          filed && filed.firstName !== undefined
                            ? filed.firstName
                            : ""
                        }
                        placeholder="FIRST NAME*"
                      ></input>

                      <div className="required-text">{error.firstName}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.lastName}
                        onChange={(e) => {
                          handleText("lastName", e.target.value);
                        }}
                        placeholder="LAST NAME*"
                        value={
                          filed && filed.lastName !== undefined
                            ? filed.lastName
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.lastName}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.company}
                        placeholder="COMPANY*"
                        onChange={(e) => {
                          handleText("company", e.target.value);
                        }}
                        value={
                          filed && filed.company !== undefined
                            ? filed.company
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.company}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="EMAIL*"
                        ref={fieldRef?.email}
                        onChange={(e) => {
                          handleText("email", e.target.value);
                        }}
                        value={
                          filed && filed.email !== undefined ? filed.email : ""
                        }
                      ></input>

                      <div className="required-text">{error.email}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.addressOne}
                        placeholder="ADDRESS LINE 1*"
                        onChange={(e) => {
                          handleText("addressOne", e.target.value);
                        }}
                        value={
                          filed && filed.addressOne !== undefined
                            ? filed.addressOne
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.addressOne}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.addressTwo}
                        placeholder="ADDRESS LINE 2*"
                        onChange={(e) => {
                          handleText("addressTwo", e.target.value);
                        }}
                        value={
                          filed && filed.addressTwo !== undefined
                            ? filed.addressTwo
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.addressTwo}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="CITY*"
                        ref={fieldRef?.city}
                        onChange={(e) => {
                          handleText("city", e.target.value);
                        }}
                        value={
                          filed && filed.city !== undefined ? filed.city : ""
                        }
                      ></input>

                      <div className="required-text">{error.city}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.state}
                        placeholder="STATE/PROVINCE*"
                        onChange={(e) => {
                          handleText("state", e.target.value);
                        }}
                        value={
                          filed && filed.state !== undefined ? filed.state : ""
                        }
                      ></input>

                      <div className="required-text">{error.state}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="ZIP CODE*"
                        ref={fieldRef?.zipCode}
                        onChange={(e) => {
                          handleText("zipCode", e.target.value);
                        }}
                        value={
                          filed && filed.zipCode !== undefined
                            ? filed.zipCode
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.zipCode}</div>
                    </div>

                    <div className="col-md-12">
                      <select
                        required=""
                        className="required"
                        name="country"
                        id="country"
                        ref={fieldRef?.country}
                        onChange={(e) => {
                          handleText("country", e.target.value);
                        }}
                        value={
                          filed && filed.country !== undefined
                            ? filed.country
                            : ""
                        }
                      >
                        <option value="">SELECT COUNTRY *</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Aland Islands">Aland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua">Antigua</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bolivia, Plurinational State Of">
                          Bolivia, Plurinational State Of
                        </option>
                        <option value="Bonaire, Sint Eustatius And Saba">
                          Bonaire, Sint Eustatius And Saba
                        </option>
                        <option value="Bosnia Herzogovina">
                          Bosnia Herzogovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (keeling) Islands">
                          Cocos (keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, The Democratic Republic Of The">
                          Congo, The Democratic Republic Of The
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Corsica">Corsica</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cura">Cura</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (malvinas)">
                          Falkland Islands (malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea Bissau">Guinea Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island And Mcdonald Islands">
                          Heard Island And Mcdonald Islands
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic Of">
                          Iran, Islamic Republic Of
                        </option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle Of Man">Isle Of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea (South)">Korea (South)</option>
                        <option value="Korea, Democratic People's Republic Of">
                          Korea, Democratic People's Republic Of
                        </option>
                        <option value="Korea, Republic Of">
                          Korea, Republic Of
                        </option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao">Lao</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Malta(Gozo)">Malta(Gozo)</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States Of">
                          Micronesia, Federated States Of
                        </option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Caledonia (France)">
                          New Caledonia (France)
                        </option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestine, State Of">
                          Palestine, State Of
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Barthelemy">
                          Saint Barthelemy
                        </option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Helena, Ascension And Tristan Da Cunha">
                          Saint Helena, Ascension And Tristan Da Cunha
                        </option>
                        <option value="Saint Kitts And Nevis">
                          Saint Kitts And Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Martin (french Part)">
                          Saint Martin (french Part)
                        </option>
                        <option value="Saint Pierre And Miquelon">
                          Saint Pierre And Miquelon
                        </option>
                        <option value="Saint Vincent And The Grenadines">
                          Saint Vincent And The Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome And Principe">
                          Sao Tome And Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Sint Maarten (dutch Part)">
                          Sint Maarten (dutch Part)
                        </option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia And The South Sandwich Islands">
                          South Georgia And The South Sandwich Islands
                        </option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard And Jan Mayen">
                          Svalbard And Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Taiwan, Province Of China">
                          Taiwan, Province Of China
                        </option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Tanzania, United Republic Of">
                          Tanzania, United Republic Of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks And Caicos Islands">
                          Turks And Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City">Vatican City</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Venezuela, Bolivarian Republic Of">
                          Venezuela, Bolivarian Republic Of
                        </option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.S.">
                          Virgin Islands, U.S.
                        </option>
                        <option value="Wallis And Futuna">
                          Wallis And Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>

                      <div className="required-text">{error.country}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        ref={fieldRef?.telePhone}
                        type="text"
                        onChange={(e) => {
                          handleText("telePhone", e.target.value);
                        }}
                        placeholder="TELEPHONE*"
                        value={
                          filed && filed.telePhone !== undefined
                            ? filed.telePhone
                            : ""
                        }
                      ></input>

                      <div className="required-text">{error.telePhone}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        ref={fieldRef?.fax}
                        onChange={(e) => {
                          handleText("fax", e.target.value);
                        }}
                        placeholder="FAX*"
                        value={
                          filed && filed.fax !== undefined ? filed.fax : ""
                        }
                      ></input>

                      <div className="required-text">{error.fax}</div>
                    </div>
                    <div className="col-md-12">
                      <a>Fields Marked with (*) are Required.</a>
                    </div>

                    <div className="bottom-checkout">
                      <div className="row">
                        <div className="Terms_condition">
                          <input
                            type="checkbox"
                            name="checkoutType"
                            className="custom-checkbox"
                          />{" "}
                          <label className="label_checkbox">
                            &nbsp;Ship to this Address
                          </label>
                        </div>

                        <div className="col-md-6">
                          <div className="float-right">
                            {/* <Link
                              // href={"/shipping"}
                              href={"#"}
                              onClick={() => validation()}
                            > */}

                            <button
                              onClick={() => validation()}
                              className="btn-cart"
                            >
                              Continue
                            </button>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================== Ship details  */}

      {/* <Footer /> */}
    </>
  );
};

export default page;
