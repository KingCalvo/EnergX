import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserAside() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/api/me`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No autenticado");
        }
        return response.json();
      })
      .then((data) => {
        const user = data.user;

        setUserData({
          name: `${user.nombre} ${user.apellido_p} ${user.apellido_m}`.trim(),
          email: user.correo || "Email no disponible",
          phone: user.telefono || "Teléfono no disponible",
        });
      })
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);

        // opcional: redirigir si no hay sesión
        window.location.href = "/app/indexApp";
      });
  }, []);

  return (
    <aside className="bg-CFE-600 p-4 w-64 flex flex-col items-center gap-4">
      <div className="w-20 h-20 flex justify-center items-center mt-3">
        <FaUserCircle className="text-9xl" />
      </div>

      <article className="flex flex-col items-center gap-8 text-center mt-2">
        <h2 className="text-black mt-2 text-xl font-bold">
          {userData.name || "Cargando..."}
        </h2>

        <ul className="text-slate-700 flex flex-col items-center gap-2 text-xl">
          <li className="mt-2">{userData.email}</li>
          <li className="mt-2">{userData.phone}</li>
        </ul>
      </article>
    </aside>
  );
}
