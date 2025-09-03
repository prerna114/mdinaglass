"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const Applyjob = ({ id, title, showPop, onClose }) => {
  const [show, setShow] = useState(showPop);
  const [fileInfo, setFileInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState({});

  console.log("the show", show, showPop);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]; // ✅ First selected file
    if (file) {
      console.log("File captured:", file);

      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  };

  const valiation = () => {
    const newError = {};
    if (!email) {
      newError.email = "Email required";
      setError("Email required");
    } else if (!mobile) {
      newError.mobile = "Mobile number required";
      setError("Mobile number required");
    } else if (!coverLetter) {
      newError.coverLetter = "Cover letter required";
      setCoverLetter("Cover letter required");
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    }
    //    (Object.keys(newError).length > 0) {
    //   console.log("New err", newError);

    // }
    console.log("ds", Object.keys(newError).length > 0);
  };

  useEffect(() => {
    setShow(showPop);
  }, [showPop]);

  if (!show) return;
  console.log("fileInfo", fileInfo);
  console.log(" err", error);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // dimmed background
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <div
        className="careerModal"
        style={{
          position: "relative",
        }}
      >
        <a
          onClick={() => {
            // setShow(false);
            onClose();
            setFileInfo(null);
          }}
        >
          <X />
        </a>

        <h4>{title}</h4>

        <input
          className="form-control"
          value={email}
          placeholder="Email*"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="required-text">{error.email}</div>

        <input
          type="number"
          className="form-control"
          value={mobile}
          //   style={{ width: "70px" }}
          placeholder="Mobile Number*"
          onChange={(e) => setMobile(e.target.value)}
        />
        <div className="required-text">{error.mobile}</div>

        <textarea
          required
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          style={{ paddingLeft: 10, height: 150, width: "100%" }} // you can adjust height as needed
          placeholder="Cover letter*"
          rows={5}
        />
        <div className="required-text">{error.coverLetter}</div>

        <div
          className="custom-file-upload"
          style={{
            width: "100% !important",
          }}
        >
          <label className="btn btn-upload mb-0" htmlFor="fileInput">
            Choose File...
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }} // hide default input
          />

          {fileInfo ? (
            <span className="file-name" id="fileName">
              <strong>{fileInfo.name?.slice(0, 15)}</strong>
            </span>
          ) : (
            <span className="file-name" id="fileName">
              No file selected
            </span>
          )}
        </div>
        <button
          style={{
            marginTop: "20px",
          }}
          onClick={() => {
            valiation();
            // setShowPop(true);
            // setSelectedData(data);
          }}
          className="btn btn-cart career-btn text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Applyjob;
