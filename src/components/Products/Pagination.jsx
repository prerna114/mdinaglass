import React, { useState } from "react";

const Pagination = () => {
  const [paginationList, setPaginationList] = useState([1, 2, 3]);

  return (
    <>
      {products?.length > 15 && (
        <div className="col-md-12 col-lg-5">
          <nav aria-label="Product pagination">
            <ul className="pagination">
              {currentPage == 1 ? (
                <></>
              ) : (
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      if (currentPage > 1) {
                        handlePrevious(currentPage);
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
              )}

              {paginationList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === item ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={(e) => {
                        setCurrentPage(item);
                        if (
                          paginationList[paginationList?.length - 1] == item
                        ) {
                          handlePagination(item, "next");
                        } else if (paginationList[0] == item && item > 1) {
                          handlePagination(item, "prev");
                        }
                      }}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}

              <li className="page-item">
                <button
                  className="page-link"
                  //   onClick={() => handleNext(currentPage)}
                >
                  Next &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Pagination;
