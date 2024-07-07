import React from 'react';

const Food = ({ food }) => {
  function getFoodWeight(points) {
    switch (points) {
      case 1:
        return '10px';
      case 5:
        return '15px';
      case 10:
        return '20px';
      default:
        return;
    }
  }

  const { x, y, points } = food;
  return (
    <div
      className="food"
      style={{
        left: `${x * 10}px`,
        top: `${y * 10}px`,
        width: getFoodWeight(points),
        height: getFoodWeight(points),
      }}
    ></div>
  );
};

export default Food;
