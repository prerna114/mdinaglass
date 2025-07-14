import React from "react";

const ListingSkeleton = () => {
  return (
    <div className="container py-3">
      <div className="row">
        {[...Array(8)].map((_, idx) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={idx}>
            {" "}
            <div className="card shadow-sm">
              <div
                className="placeholder-glow"
                style={{ height: "200px", backgroundColor: "#e0e0e0" }}
              ></div>
              <div className="card-body text-center">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-8"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6"></span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingSkeleton;
