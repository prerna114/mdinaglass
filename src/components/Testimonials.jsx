"use client";

import React from "react";

const testimonials = [
  {
    name: "Sarah M.",
    city: "London",
    quote:
      "Absolutely stunning craftsmanship. My vase arrived safely and it’s even more beautiful in person!",
  },
  {
    name: "John D.",
    city: "New York",
    quote: "The quality and service were top-notch. Will definitely buy again!",
  },
  {
    name: "Maria G.",
    city: "Rome",
    quote: "Unique and elegant. A perfect gift that was very well received!",
  },
  {
    name: "Emily R.",
    city: "Berlin",
    quote:
      "I was blown away by the colors and attention to detail. Truly a work of art.",
  },
];

const Testimonials = () => {
  return (
    <>
      {/* Bootstrap CSS (for standalone use) */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <section className="testimonials-section bg-white py-5">
        <div className="container text-center">
          <h3 className="mb-4">Loved by Our Customers</h3>
          <div className="row">
            {testimonials.map((t) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4"
                key={t.name}
              >
                <div className="h-100">
                  <div className="bg-light testimonials card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="quoteimg">
                        <img
                          src="/assets/quote.png"
                          alt="Quote icon"
                          className="mb-2 "
                          style={{ width: "auto", height: "auto" }}
                        />
                      </div>
                    
                      <p className="review-sec">{t.quote}</p>
                    </div>
                    <div className="mt-4">
                      <p className="mb-1">
                        <strong>{t.name}</strong> / <em>{t.city}</em>
                      </p>
                      <p className="text-warning border-0 mb-0">
                        {" "}
                        <img
                          src="/assets/review.png"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
