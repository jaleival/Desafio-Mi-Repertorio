import "dotenv/config";
import express from 'express';
import cancionesRoutes from './routes/cancionRoute.js';
import cors from "cors";

const app = express();

const __dirname = import.meta.url;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/v1/canciones", cancionesRoutes);

app.use((err, req, res, next) => {
  const { code, msg } = handleError(err);
  res.status(code).json({ error: msg });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});