import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";

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
        if (err?.name !== "AbortError") {
          console.error("Error al obtener el usuario:", err);
          setError("No se pudo cargar el usuario");
        }
      }
    };

    loadUser();

    return () => controller.abort();
  }, []);

  return (
    <aside className="flex w-full flex-col items-center gap-5 rounded-3xl bg-ALI-600 p-4 text-slate-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-md">
        <FaUserCircle className="text-7xl text-black" />
      </div>

      <div className="flexw-full rounded-3xl px-4 py-2 shadow-sm backdrop-blur-sm">
        <div className="mb-3 text-center">
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            Usuario
          </h1>

          <h2 className="mt-2 text-base font-bold leading-tight text-slate-800 sm:text-lg">
            {error ? error : userData.name}
          </h2>
        </div>

        <ul className="space-y-3 text-sm text-slate-700">
          <li className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
            <FaEnvelope className="shrink-0 text-slate-500" />
            <span className="min-w-0 truncate">{userData.email}</span>
          </li>

          <li className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
            <FaPhone className="shrink-0 text-slate-500" />
            <span className="min-w-0 truncate">{userData.phone}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
