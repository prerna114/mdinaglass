import React from "react";

const MegaMenuSkeleton = () => {
  return (
    <div
      class="d-flex gap-3 p-3 bg-primary text-white"
      style={{ backgroundColor: "#005e84 " }}
    >
      <span class="placeholder-glow">
        <span class="placeholder col-2 bg-light rounded-pill">de</span>
      </span>
      <span class="placeholder-glow">
        <span class="placeholder col-2 bg-light rounded-pill">de</span>
      </span>
      <span class="placeholder-glow">
        <span class="placeholder col-2 bg-light rounded-pill">e</span>
      </span>
      <span class="placeholder-glow">
        <span class="placeholder col-2 bg-light rounded-pill">de</span>
      </span>
    </div>
  );
};

export default MegaMenuSkeleton;
