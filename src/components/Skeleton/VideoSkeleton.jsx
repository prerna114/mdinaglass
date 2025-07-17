// components/VideoSkeleton.jsx
const VideoSkeleton = ({ width = "100%", height = "360px" }) => {
  return (
    <div className="p-3">
      <div
        className="placeholder-glow mb-3"
        style={{ width, height, borderRadius: "8px", overflow: "hidden" }}
      >
        <span
          className="placeholder w-100 h-100 d-block"
          style={{ height: "100%" }}
        ></span>
      </div>
    </div>
  );
};

export default VideoSkeleton;
