import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function Barras() {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(9); // default desktop

  // detectar tamaño de pantalla
  function getLimit() {
    const width = window.innerWidth;

    if (width < 640) return 5; // celular
    if (width < 1024) return 7; // tablet
    return 9; // 💻 desktop
  }

  useEffect(() => {
    // inicial
    setLimit(getLimit());

    // resize dinámico
    const handleResize = () => {
      setLimit(getLimit());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/api/areas`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error();

        const formatted = data.areas.map((a, i) => ({
          value: i + 1,
          area: a.nombre_area,
        }));

        setAreas(formatted);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold">
        No se pudieron cargar las áreas.
      </p>
    );
  }

  if (!areas.length) {
    return <p className="text-center">Cargando...</p>;
  }

  // 🔥 aplicar límite dinámico
  const visibleAreas = areas.slice(0, limit);

  return (
    <BarChart
      dataset={visibleAreas}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "area",
        },
      ]}
      series={[
        {
          dataKey: "value",
          label: "Áreas",
          color: "#0F766E",
        },
      ]}
      height={300}
      grid={{ horizontal: true }}
      sx={{
        backgroundColor: "transparent",
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
      }}
    />
  );
}
