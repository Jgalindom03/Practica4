import mongoose from "mongoose";
import { Tarea, Estado } from "../types.ts";
import { TrabajadorModel } from "./trabajador.ts";
import { EmpresaModelType } from "./empresa.ts";
const Schema = mongoose.Schema;

const TareaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return value !== "";
        },
        message: "{path} está vacío",
      },
    },
    estado: {
      type: String,
      enum: Object.values(Estado),
      required: true,
    },
    trabajador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trabajador",
      required: false,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empresa",
      required: false,
    },
  },
  { timestamps: false }
);
TareaSchema.path("estado").validate(function (tipo: Estado) {
  if (tipo === Estado.Closed) {
    throw new Error('La tarea no puede tener ese estado al iniciarla');
  }
  return Object.values(Estado).includes(tipo);
});

TareaSchema.pre("update", function (next) {
  const estadosig = this.getUpdate().estado;
  if (estadosig === Estado.Closed) {
    this.model.findOneAndDelete({ _id: this.getQuery()._id }, (err, doc) => {
      if (err) {
        throw new Error('Error al eliminar la tarea:', err);
      }
      throw new Error('El estado es el último y se borra.');
    });
  }
  next();
});

TareaSchema.post("remove", async function (tipo: TareaModelType) {
  await TrabajadorModel.updateMany({ tareas: tipo._id }, { $pull: { tareas: tipo._id } });
  await EmpresaModel.updateMany({ tareas: tipo._id }, { $pull: { tareas: tipo._id } });
});

TareaSchema.post("save", async function (tipo: TareaModelType) {
  await TrabajadorModel.findByIdAndUpdate(tipo.trabajador, { $push: { tareas: tipo._id } });
});

export type TareaModelType = mongoose.Document & Omit<Tarea, "id" | "trabajador" | "empresa"> & {
  trabajador: mongoose.Schema.Types.ObjectId;
  empresa: mongoose.Schema.Types.ObjectId;
};

export const TareaModel = mongoose.model<TareaModelType>("Tarea", TareaSchema);
