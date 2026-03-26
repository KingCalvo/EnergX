import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function DynamicGauge() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const nextValue = prevValue + 50;
        return nextValue > 300 ? 0 : nextValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#f0f4f8",
        padding: "20px",
      }}
    >
      <ReactSpeedometer
        maxValue={300}
        minValue={0}
        value={value}
        segments={3}
        segmentColors={["#47A248", "#FFD700", "#FF4500"]} // Verde, amarillo, rojo
        needleColor="#000000"
        customSegmentStops={[0, 100, 200, 300]}
        currentValueText={`Consumo: ${value} KWh`}
        textColor="#000000"
        height={300}
        width={500}
        needleHeightRatio={0.7}
        ringWidth={30}
        customSegmentLabels={[
          {
            text: "0-100",
            position: "OUTSIDE",
            color: "#47A248",
            fontSize: "12px",
          },
          {
            text: "100-200",
            position: "OUTSIDE",
            color: "#FFD700",
            fontSize: "12px",
          },
          {
            text: "200-300",
            position: "OUTSIDE",
            color: "#FF4500",
            fontSize: "12px",
          },
        ]}
      />
    </div>
  );
}
