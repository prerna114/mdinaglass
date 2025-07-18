import React, { useState } from "react";

const Banner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  return (
    <>
      {isBannerVisible && (
        <div className="text-black text-center  position-relative  banner">
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Shopping Outside Malta? Safe & Secure Worldwide Shipping Available
            <div
              style={{
                width: "20px",
                height: "20px",
                // right: "422px",
                transform: "translateY(-50%)",
                // position: "absolute",
                cursor: "pointer",
                // top: "46%",
                marginLeft: "15px",
                marginTop: "19px",
              }}
              onClick={() => setIsBannerVisible(false)}
            >
              <img
                src="/assets/close_white.png"
                className="w-100"
                style={{
                  width: "20px",
                  height: "20px",
                }}
                alt="Close Banner"
              />
            </div>
          </span>

          {/* <FaTimes
            className="position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            size={10}
            onClick={() => setIsBannerVisible(false)}
          /> */}

          {/* <IoMdCloseCircleOutline
            className="position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "24px",
            }}
            onClick={() => setIsBannerVisible(false)}
          /> */}
        </div>
      )}
    </>
  );
};

export default Banner;
