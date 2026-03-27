import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserAside() {
  const [userData, setUserData] = useState({
    name: "Cargando...",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.PUBLIC_API_URL}/api/me`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setError("Sesión no iniciada");
          } else {
            setError(data?.message || "No se pudo cargar el usuario");
          }
          return;
        }

        const user = data.user;

        setUserData({
          name: `${user.nombre} ${user.apellido_p} ${user.apellido_m}`.trim(),
          email: user.correo || "Email no disponible",
          phone: user.telefono || "Teléfono no disponible",
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error al obtener el usuario:", err);
          setError("No se pudo cargar el usuario");
        }
      }
    };

    loadUser();

    return () => controller.abort();
  }, []);

  return (
    <aside className="bg-CFE-600 p-4 w-64 flex flex-col items-center gap-4">
      <div className="w-20 h-20 flex justify-center items-center mt-3">
        <FaUserCircle className="text-9xl" />
      </div>

      <article className="flex flex-col items-center gap-8 text-center mt-2">
        <h2 className="text-black mt-2 text-xl font-bold">
          {error ? error : userData.name}
        </h2>

        <ul className="text-slate-700 flex flex-col items-center gap-2 text-xl">
          <li className="mt-2">{userData.email}</li>
          <li className="mt-2">{userData.phone}</li>
        </ul>
      </article>
    </aside>
  );
}
