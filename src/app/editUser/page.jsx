"use client";
import { UpdateProfile } from "@/api/Customer";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import { CountryList } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function editUser() {
  const [error, setError] = useState({});
  const [loginUserDetails, setLoginUserDetails] = useState();
  const [address, setAddress] = useState({});
  const [nameField, setNameField] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { logout } = useAuthStore.getState(); //

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validation = () => {
    setLoading(true);
    const newError = {};

    console.log("Validation", nameField?.first_name);
    if (!nameField?.first_name?.trim()) {
      newError.firstName = "First Name is required";
    } else if (!nameField?.last_name?.trim()) {
      newError.lastName = "Last Name is required";
    } else if (!nameField?.email?.trim()) {
      newError.email = "Email is required";
    } else if (
      nameField?.password &&
      nameField?.password_confirmation &&
      nameField?.password != nameField?.password_confirmation
    ) {
      newError.password = "Password and confirm password should be same";
    } else if (!address?.street?.trim()) {
      newError.street = "Address is required";
    } else if (!address?.city?.trim()) {
      newError.city = "City is required";
    } else if (!address?.state?.trim()) {
      newError.state = "State is required";
    } else if (!address?.postcode?.trim()) {
      newError.postcode = "Postcode is required";
    } else if (!address?.country?.trim()) {
      newError.country = "Country is required";
    }
    setError(newError);
    if (Object.keys(newError)?.length > 0) {
      setLoading(false);

      CustomToast("Please fill all required fiels", "top-right");
    } else {
      updateUserProfile();
    }
  };

  const handleValue = (key, value) => {
    setNameField((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddress = (key, value) => {
    setAddress((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fieldRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    addressOne: useRef(null),
    addressTwo: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    country: useRef(null),
    telePhone: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const updateUserProfile = async () => {
    const data = await UpdateProfile(nameField, address);
    console.log("data", data);
    if (data?.status == 200) {
      SuccessToast(`${data?.data?.message}`, "top-right");
      setLoading(false);
      logout();
      router.push("/loginCheckoutPage");

      SuccessToast(`Please login again`, "top-right");
    } else if (data?.status == 422) {
      setLoading(false);

      CustomToast(`${data?.errorData?.errors?.password[0]}`, "top-right");
    } else {
      setLoading(false);

      CustomToast("Something Went wrong", "top-right");
    }
    console.log("updateUserProfile", data);
  };

  useEffect(() => {
    const data = localStorage.getItem("token");
    const parseData = JSON.parse(data);
    setLoginUserDetails(parseData);
    setAddress(parseData?.address);
    setNameField((prev) => ({
      ...prev,
      first_name: parseData?.name.split(" ")[0],
      last_name: parseData?.name.split(" ")[1],
      email: parseData?.email,
    }));
    // setNameField(nameField?.first_name)
  }, []);

  console.log("Login", nameField);

  return (
    <div className="container">
      <div className="login-signup">
        <div className="row">
          <div className="col-md-12">
            <div
              className="login-sec  checkout-sec"
              style={{
                marginTop: "0px",
              }}
            >
              <h2 className="mb-3">Edit Profile</h2>

              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="FIRST NAME*"
                  onChange={(e) => {
                    handleValue("first_name", e.target.value);
                  }}
                  value={nameField?.first_name}
                ></input>
                <div className="required-text">{error.firstName}</div>
              </div>

              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="LAST NAME*"
                  onChange={(e) => {
                    handleValue("last_name", e.target.value);
                  }}
                  value={nameField?.last_name}
                ></input>
                <div className="required-text">{error.lastName}</div>
              </div>

              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="EMAIL*"
                  value={nameField?.email}
                  onChange={(e) => {
                    handleValue("email", e.target.value);
                  }}
                ></input>
                <div className="required-text">{error.email}</div>
              </div>

              <div className="col-md-12">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  autoComplete="new-password"
                  onChange={(e) => {
                    handleValue("password", e.target.value);
                  }}
                ></input>
              </div>

              <div className="col-md-12">
                <input
                  type="password"
                  placeholder="CONFRIM PASSWORD"
                  autoComplete="new-password"
                  onChange={(e) => {
                    handleValue("password_confirmation", e.target.value);
                  }}
                ></input>
                <div className="required-text">{error.password}</div>
              </div>
            </div>
            <div
              className="login-sec  checkout-sec"
              style={{
                marginTop: 0,
                paddingTop: 0,
              }}
            >
              <h2>Billing Information</h2>
              <p>Fill in the fields below with your billing information:</p>

              <div className="col-md-12">
                <input
                  type="text"
                  value={address?.street}
                  placeholder="Street Address*"
                  onChange={(e) => {
                    console.log("E", e.target.value);
                    handleAddress("street", e.target.value);
                  }}
                  ref={fieldRef?.addressOne}
                ></input>
                <div className="required-text">{error.street}</div>
              </div>

              {/* <div className="col-md-12">
                <input
                  type="text"
                  placeholder="ADDRESS LINE 2*"
                  onChange={(e) => {
                    console.log("E", e.target.value);
                    handleChanges("addressTwo", e.target.value);
                  }}
                  ref={fieldRef?.addressTwo}
                ></input>
                <div className="required-text">{error.addressTwo}</div>
              </div> */}

              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="CITY*"
                  value={address?.city}
                  onChange={(e) => {
                    console.log("E", e.target.value);
                    handleAddress("city", e.target.value);
                  }}
                  ref={fieldRef?.city}
                ></input>
                <div className="required-text">{error.city}</div>
              </div>

              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="STATE/PROVINCE*"
                  value={address?.state}
                  onChange={(e) => {
                    console.log("E", e.target.value);
                    handleAddress("state", e.target.value);
                  }}
                  ref={fieldRef?.state}
                ></input>
                <div className="required-text">{error.state}</div>
              </div>

              <div className="col-md-12">
                <input
                  type="number"
                  value={address?.postcode}
                  placeholder="POST CODE*"
                  onChange={(e) => {
                    console.log("E", e.target.value);
                    handleAddress("postcode", e.target.value);
                  }}
                  ref={fieldRef?.zipCode}
                ></input>
                <div className="required-text">{error.postcode}</div>
              </div>

              <div className="col-md-12">
                <select
                  required=""
                  className="required"
                  name="country"
                  id="country"
                  ref={fieldRef?.country}
                  onChange={(e) => {
                    handleAddress("country", e.target.value);
                  }}
                  value={address?.country}
                >
                  <option value="">SELECT COUNTRY *</option>
                  {CountryList.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.country}
                    </option>
                  ))}
                </select>
                <div className="required-text">{error.country}</div>
              </div>

              <div className="col-md-12">
                <a>Fields Marked with (*) are Required.</a>
              </div>

              <div className="bottom-checkout">
                <div
                  className="row"
                  style={{
                    marginLeft: 5,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-of-cart mt-2">
          {/* <Link href="/"> */}

          <button
            onClick={() => {
              validation();
            }}
            className="btn btn-info text-white"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status"></div>
            ) : (
              "Submit"
            )}
          </button>

          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default editUser;
