import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.post("/api/addUser", async (req, res) => {
  try {
    const {
      nombre,
      apellidoP,
      apellidoM,
      edad,
      pais,
      correo,
      telefono,
      passw,
    } = req.body;

    if (
      !nombre ||
      !apellidoP ||
      !apellidoM ||
      !edad ||
      !pais ||
      !correo ||
      !telefono ||
      !passw
    ) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: correo,
      password: passw,
      email_confirm: true,
    });

    if (error || !data?.user) {
      return res.status(400).json({
        success: false,
        message: error?.message || "No se pudo crear el usuario",
      });
    }

    const { error: profileError } = await supabaseAdmin.from("usuario").insert({
      auth_user_id: data.user.id,
      nombre,
      apellido_p: apellidoP,
      apellido_m: apellidoM,
      edad: Number(edad),
      pais,
      correo,
      telefono,
      passw: passw, // ya no se usa para login, puedes quitar esta columna después si quieres
    });

    if (profileError) {
      return res.status(500).json({
        success: false,
        message: profileError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      userId: data.user.id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { correo, passw } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: passw,
    });

    if (error || !data?.session || !data?.user) {
      return res.status(401).json({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
    }

    res.cookie("sb-access-token", data.session.access_token, {
      ...cookieOptions,
      maxAge: data.session.expires_in * 1000,
    });

    res.cookie("sb-refresh-token", data.session.refresh_token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return res.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/me", async (req, res) => {
  try {
    const accessToken = req.cookies["sb-access-token"];

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "No autenticado",
      });
    }

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        message: "Sesión inválida",
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("usuario")
      .select("id_usuario, nombre, apellido_p, apellido_m, correo, telefono")
      .eq("auth_user_id", data.user.id)
      .single();

    if (profileError) {
      return res.status(404).json({
        success: false,
        message: profileError.message,
      });
    }

    return res.json({
      success: true,
      user: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/logout", async (_req, res) => {
  res.clearCookie("sb-access-token", cookieOptions);
  res.clearCookie("sb-refresh-token", cookieOptions);
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en ${port}`);
});
