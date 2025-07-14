// components/SideMenuSkeleton.tsx
const SideMenuSkeleton = () => {
  return (
    <div className="p-3">
      <h4 className="placeholder-glow mb-3">
        <span className="placeholder col-6"></span>
      </h4>
      <p className="placeholder-glow">
        <span className="placeholder col-12 mb-2">Loading</span>
        <span className="placeholder col-10 mb-2">Loading</span>
        <span className="placeholder col-11 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>
        <span className="placeholder col-9 mb-2">Loading</span>

        <span className="placeholder col-7">Loainds</span>
      </p>
    </div>
  );
};

export default SideMenuSkeleton;
