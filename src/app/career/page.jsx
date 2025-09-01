import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container job-porter py-5">
      <h2 className="fw-bold">Careers at Mdina Glass</h2>
      <p className="fw-semibold">Be part of our future…</p>
      <p>
        Mdina Glass has a proud history going all the way back to its formation,
        in 1968, as Malta’s first producer of handcrafted, decorative, and
        functional glassware. Since then, many talented and dedicated
        individuals have contributed to the company’s success story.
      </p>
      <p>
        Below you will find the current vacancies we are looking to fill, giving
        you the chance to be part of our future.
      </p>

      <div className="dropdown select-job mb-4">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          10 Items per page
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              10
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              20
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              50
            </a>
          </li>
        </ul>
      </div>

      <div className="card p-4 border-0 job-post mb-4">
        <h5 className="text-primary">Delivery Person - Part Time</h5>
        <p className="mb-4">
          Mdina Glass is seeking a dedicated and professional Delivery Person.
        </p>
        <p className="mb-4">
          This is a part-time position (during the month of December).
          <br />
          Working Hours are between <strong>8:00am - 16:30pm</strong> (Monday to
          Friday).
        </p>
        <p className="fst-italic text-muted">
          *Applicants must be based in Malta to be considered.
        </p>
        <p className="fw-semibold mb-4">
          Should you wish to be considered for this role, please click the
          'apply' button and email your covering note and CV.
        </p>
        <Link href="/" className="btn btn-cart career-btn text-white">
          Apply
        </Link>
      </div>

      <div className="card p-4 border-0 job-post mb-4">
        <h5 className="text-primary">
          Summer Sales Staff Vacancies - Full Time & Part Time
        </h5>

        <p className="mb-4">Location: Various</p>

        <p className="mb-4">
          Are you looking for summer season work? If so, we may have the job
          you're looking for.
        </p>
        <p className="mb-4">
          We are looking for sales staff, full time or part time, to work at
          various outlets of ours.
          <br />
          Working Hours are between <strong>8:00am - 16:30pm</strong> (Monday to
          Friday).
        </p>
        <p className="fst-italic text-muted">
          *Applicants must be based in Malta to be considered.
        </p>
        <p className="fw-semibold mb-4">
          Should you wish to be considered for this role, please click the
          'apply' button and email your covering note and CV.
        </p>
        <Link href="/" className="btn btn-cart career-btn text-white">
          Apply
        </Link>
      </div>

      <div className="card p-4 border-0 job-post mb-4">
        <h5 className="text-primary">Sales Assistant - Full Time</h5>
        <p className="mb-4">Location: Mdina</p>

        <p className="mb-4">
          We are seeking a full time Sales Assistant with a professional
          approach to their work for our bust outlet in Mdina.
        </p>
        <p className="mb-4">
          This is a permanent position, not a summer job.
          <br />
          Quality of service is paramount, so applicants must have an outgoing,
          pleasent personality and retail experience.
        </p>
        <p className="fst-italic text-muted">
          *Applicants must be based in Malta to be considered.
        </p>
        <p className="fw-semibold mb-4">
          Should you wish to be considered for this role, please click the
          'apply' button and email your covering note and CV.
        </p>
        <Link href="/" className="btn btn-cart career-btn text-white">
          Apply
        </Link>
      </div>

      <div className="card p-4 border-0 job-post mb-4">
        <h5 className="text-primary">Cleaner - Full Time</h5>

        <p className="mb-4">Location: Ta' Qali </p>

        <p className="mb-4">
          We are currently looking for a cleaner to work at our Ta' Qali outlet.
          While preference is given to applicants wishing to work full time
          hours, we will also consider part time applicants for the right
          individual.
        </p>
        {/* <p className="mb-4">
          Working days will be Monday to Friday.
          <br />
          Working Hours are between <strong>8:00am - 16:30pm</strong> (Monday to
          Friday).
        </p> */}
        <p className="fst-italic text-muted">
          Duties will include cleaning the shop, offices and other common areas
          as well as product displays.
        </p>
        <p className="fw-semibold mb-4">
          Should you wish to be considered for this role, please click the
          'apply' button and email your covering note and CV.
        </p>
        <Link href="/" className="btn btn-cart career-btn text-white">
          Apply
        </Link>
      </div>
    </div>
  );
};

export default page;
