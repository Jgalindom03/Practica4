import express from "npm:express@4.18.2";
import mongoose from "mongoose";

import { getEmpresa } from "./resolvers/getEmpresa.ts";
import { getEmpresas } from "./resolvers/getEmpresas.ts";
import { postEmpresa } from "./resolvers/postEmpresa.ts";
import { deleteEmpresa } from "./resolvers/deleteEmpresa.ts";
import { getTrabajador } from "./resolvers/getTrabajador.ts";
import { getTrabajadores } from "./resolvers/getTrabajadores.ts";
import { postTrabajador } from "./resolvers/postTrabajador.ts";
import { deleteTrabajador } from "./resolvers/deleteTrabajador.ts";
import { getTarea } from "./resolvers/getTarea.ts";
import { getTareas } from "./resolvers/getTareas.ts";
import { postTarea } from "./resolvers/postTarea.ts";
import { deleteTarea } from "./resolvers/deleteTarea.ts";
import { contratarTrabajador } from "./resolvers/contratarTrabajador.ts";
import { despedirTrabajador } from "./resolvers/despedirTrabajador.ts";
import { cambiarEstado } from "./resolvers/cambiarEstado.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express(); 
app.use(express.json());
app.get("/business/:id", getEmpresa); 
app.get("/business", getEmpresas); 
app.get("/worker/:id", getTrabajador);
app.get("/worker", getTrabajadores); 
app.get("/task/:id", getTarea); 
app.get("/task", getTareas); 
app.post("/business", postEmpresa); 
app.post("/worker", postTrabajador);
app.post("/task", postTarea); 
app.delete("/business/:id", deleteEmpresa); 
app.delete("/worker/:id", deleteTrabajador); 
app.delete("/task/:id", deleteTarea);
app.put("/business/:id/hire/:workerId", contratarTrabajador); 
app.put("/business/:id/fire/:workerId", despedirTrabajador); 
app.put("/task/:id", cambiarEstado); 
app.listen(3000, () => { console.log("Listen in port 3000") });