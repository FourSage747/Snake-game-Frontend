import React from 'react';

const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{ left: `${segment.x * 10}px`, top: `${segment.y * 10}px` }}
        ></div>
      ))}
    </div>
  );
};

export default Snake;
