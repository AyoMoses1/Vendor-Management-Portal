import React from "react";

const SalesCard = ({ theme, sales, maxValue }) => {

  const topLeft = () => {
    if (sales && maxValue) {
      return (50 - ((sales?.amount / maxValue) * 50)).toFixed(2)
    }
    return 0
  }

  const topRight = () => {
    if (sales && maxValue) {
      let value = 50 - ((sales?.amount / maxValue) * 50);
      value = value >= 35 ? 49.95 : (value + 15).toFixed(2)
      return value
    }
    return 0
  }

  const bottomLeft = () => {
    if (sales && maxValue) {
      return (50 + ((sales?.amount / maxValue) * 50)).toFixed(2)
    }
    return 0
  }

  const bottomRight = () => {
    if (sales && maxValue) {
      let value = 50 + ((sales?.amount / maxValue) * 50);
      value = value <= 65 ? 50.95 : (value - 15).toFixed(2)
      return value
    }
    return 0
  }
  return (
    <div className="kird">
      <div className="sales-card-data">
        <h6 className="sales-card-label">{sales?.label}</h6>
        <h4 className="m-0 mt-4 text-primary font-weight-500 sales-card-amount">
          {sales?.amount}
        </h4>
      </div>
      {sales && maxValue ? <div
        className="sales-funnel"
        style={
          {
            clipPath: `polygon(0% ${topLeft()}%, 100% ${topRight()}%, 100% ${bottomRight()}%, 0% ${bottomLeft()}%)`
          }
        }></div> : <></>}
    </div>
  );
};

export default SalesCard;
