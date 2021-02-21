import "./Loading.css";
export default function Loading() {
  return (
    <div className="loading">
      <svg width={24} height={24}>
        <circle
          r={10}
          strokeWidth={2}
          fill="transparent"
          cx={12}
          cy={12}
          stroke="white"
          strokeDasharray={15.7079632679}
        />
      </svg>
    </div>
  );
}
