import React from "react";

const FilterProduct = () => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12 col-lg-7">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex sorting-style align-items-center">
                <span>Sort by</span>
                <select
                  className="form-select w-auto"
                  onChange={(e) => {
                    if (e.target.value) {
                      if (e.target.value == "Price") {
                        // sortProductsByPriceLowToHigh(products);
                      }
                      console.log("Selected value", e.target.value);
                    }
                  }}
                >
                  <option>Select</option>

                  <option>Price</option>
                  <option>Name</option>
                  <option value={"Newest"}>Newest</option>
                  <option>Popular</option>
                  <option>Date Published</option>
                  <option>Date Archived</option>
                  <option>Date Created</option>
                  <option>Date Modified</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex  sorting-item align-items-center justify-content-end">
                <span>Items</span>
                <label htmlFor="currency-select" className="visually-hidden">
                  Select currency
                </label>
                <select
                  id="currency-select"
                  className="form-select w-auto me-3"
                  // value={filterData?.limit}
                  onChange={(e) => {
                    // handleFilter("limit", e.target.value);
                    // console.log("New", e.target.value);
                  }}
                >
                  <option value={15}>15 Items</option>
                  <option value={30}>30 Items</option>
                  <option value={60}>60 Items</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
      </div>

      {/* Items Count */}
      <div className="mb-3">
        <small className="text-muted">Items 1-9 of 9 total</small>
      </div>
    </>
  );
};

export default FilterProduct;
