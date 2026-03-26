import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function DynamicGauge({ interval = 300000 }) {
  // Recibir intervalo como propiedad
  const [value, setValue] = useState(0);

  const getRandomValue = () => Math.random() * 2; // Generar valor aleatorio entre 0 y 2

  useEffect(() => {
    setValue(getRandomValue()); // Establecer valor inicial

    const timer = setInterval(() => {
      setValue(getRandomValue()); // Actualizar valor cada intervalo
    }, interval);

    return () => clearInterval(timer); // Limpiar intervalo al desmontar
  }, [interval]); // Volver a ejecutar si cambia el intervalo

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
        maxValue={2}
        minValue={0}
        value={value}
        segments={3}
        segmentColors={["#47A248", "#FFD700", "#FF4500"]} // Verde, amarillo, rojo
        needleColor="#000000"
        customSegmentStops={[0, 0.67, 1.33, 2]} // Actualizado para el nuevo rango
        currentValueText={`Consumo: ${value.toFixed(2)} kWh`} // Mostrar con 2 decimales
        textColor="#000000"
        height={300}
        width={500}
        needleHeightRatio={0.7}
        ringWidth={30}
        customSegmentLabels={[
          {
            text: "0-0.67",
            position: "OUTSIDE",
            color: "#47A248",
            fontSize: "12px",
          },
          {
            text: "0.67-1.33",
            position: "OUTSIDE",
            color: "#FFD700",
            fontSize: "12px",
          },
          {
            text: "1.33-2",
            position: "OUTSIDE",
            color: "#FF4500",
            fontSize: "12px",
          },
        ]}
      />
    </div>
  );
}
