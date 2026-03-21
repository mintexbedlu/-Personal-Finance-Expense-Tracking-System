import React from "react";

const TimeFrameSelector = ({ 
  timeFrame, 
  setTimeFrame, 
  options, 
  color = "teal",
  style = "default"
}) => {
  const colorClass = {
    teal: "bg-emerald-500",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
    orange: "bg-orange-500",
    cyan: "bg-cyan-500"
  }[color] || "bg-indigo-500";
  
  const styleClass = {
    default: "flex gap-2 bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto no-scrollbar shadow-sm",
    minimal: "flex gap-2"
  }[style];
  
  return (
    <div className={styleClass}>
      {options.map((frame) => (
        <button 
          key={frame}
          onClick={() => setTimeFrame(frame)}
          className={`px-3 py-2 text-sm rounded-lg transition-all flex-shrink-0 ${
            timeFrame === frame 
              ? `${colorClass} text-white` 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {frame.charAt(0).toUpperCase() + frame.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;

//it shows the 3 boxes with details 
//like Total Income,Average Income,Transactions