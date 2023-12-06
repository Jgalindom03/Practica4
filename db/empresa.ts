import mongoose from "mongoose";
import { Empresa } from "../types.ts";


const Schema = mongoose.Schema;

const EmpresaSchema = new Schema(
  {
    name:{type:String, required:true,validate: {
      validator: (value) => {
       return value !== ""
      },
      message: "{path} esta vacio"
    }
  },
    cif:{type:String, required:true},
    trabajadores:{type:[mongoose.Schema.Types.ObjectId], ref:"Trabajador", required: false, validate:[ function(trabajador){ return trabajador.length <10;}, 'Una empresa solo puede tener 10 trabajadores'] },
  },
  { timestamps: false }
);
EmpresaSchema.pre("save", async function (next) {
  try {
    const siexiste = await EmpresaModel.findOne({ cif: this.cif });

    if (siexiste) {
      const err = new Error("Ya existe una empresa con el mismo cif");
      next(err);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
})
EmpresaSchema.post("actualizar", async function (tipo:EmpresaModelType) {
  const e= await EmpresaModel.findById(tipo._id).exec();
  if(empresa && empresa.trabajadores && empresa.trabajadores.length<10){
    await TrabajadorModel.updateMany({_id:{$in:empresa.trabajadores}},{$set:{empresa:empresa._id}});
    return;
  }
  throw new Error('Ya hay 10 trabajadores');
})

EmpresaSchema.post("eliminar", async function (tipo:EmpresaModelType) {
  if(empresa && empresa.trabajadores){
    await TrabajadorModel.updateMany({_id:{$in:empresa.trabajadores}},{$set:{empresa:null}, $pull:{tareas:{$exists:true}}})
    await TareaModel.deleteMany({empresa:empresa._id})
  }
})

export type EmpresaModelType = mongoose.Document & Omit<Empresa, "id" | "trabajadores"> & {
  trabajadores : Array<mongoose.Schema.Types.ObjectId>;
};

export const EmpresaModel = mongoose.model<EmpresaModelType>("Empresa", EmpresaSchema)