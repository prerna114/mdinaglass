"use client";
import { useNavigationStore } from "@/store/useNavigationstore";
import React, { useState } from "react";

const ModalPayment = ({ message }) => {
  const [show, setShow] = useState(false);
  const showModal = useNavigationStore((s) => s.showModal);

  return (
    <div>
      {/* Modal */}
      {showModal && (
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
          }}
        >
          <div
            className="login-sec"
            style={{
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h2>
              {message != null ? (
                message
              ) : (
                <>
                  Please Wait While we Confirm your payment <br />
                  Don't reload the application
                </>
              )}
            </h2>
            <div
              style={{
                width: 60,
                height: 60,
                border: "6px solid #f3f3f3",
                borderTop: "6px solid #007bff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                textAlign: "center",
              }}
            />
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPayment;
