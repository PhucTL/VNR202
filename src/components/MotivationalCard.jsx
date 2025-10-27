import React, { memo } from 'react';

const MotivationalCard = memo(function MotivationalCard({ 
  title, 
  description, 
  icon, 
  bgColor = "bg-blue-50", 
  borderColor = "border-blue-200",
  textColor = "text-blue-700"
}) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-3 transition-colors no-lag`}>
      <div className="flex items-start gap-2">
        <div className="text-xl">{icon}</div>
        <div>
          <h4 className={`font-semibold ${textColor} mb-1 text-sm`}>{title}</h4>
          <p className={`text-xs ${textColor} opacity-80`}>{description}</p>
        </div>
      </div>
    </div>
  );
});

export default MotivationalCard;