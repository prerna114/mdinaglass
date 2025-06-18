"use client"; // if your component uses hooks like useState

import React from "react";
// import React from "react";

// import "./CategoryFeature.css"; // Optional for custom styling

const CategoryFeature = () => {
  return (
    <section className="feature-images">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12 px-0 mt-2">
            <div className="position-relative overflow-hidden rounded shadow-sm">
              <img
                src="/assets/new.png"
                alt="Handcrafted Vases"
                className="img-fluid w-100 object-cover"
                style={{ height: "100%" }}
              />
               <h3 className="imageTextVase">
                Handcrafted
                <br />
                Vases
              </h3>
 
            </div>
          </div>
          <div className="col-md-6 col-12 px-0 mt-2">
            <div className="position-relative overflow-hidden rounded shadow-sm">
              <img
                src="/assets/sculpture.png"
                alt="Sculptures"
                className="img-fluid w-100 object-cover"
                style={{ height: "100%" }}
              />
              <h3 className="imageText">Sculptures</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
