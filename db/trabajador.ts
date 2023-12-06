import mongoose from "mongoose";
import { Trabajador } from "../types.ts";


const Schema = mongoose.Schema;

const TrabajadorSchema = new Schema(
  {
    name:{type:String, required:true, validate: {
        validator: (value) => {
         return value !== ""
        },
        message: "{path} esta vacio"
      }
    },
    dni:{type:String, required:true,  validate: {
        validator: (dni) => {
          const dnireal = /^(\d{8})([A-Z])$/;
          const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
          const comprobacion = dni.match(dnireal);
          if (!comprobacion) {
            return false;
          }
          const parten = comprobacion[1];
          const partel = comprobacion[2];
          const letracorrespondida = letras.charAt(parseInt(parten, 10) % 23);
          return partel === letracorrespondida;
        },
        message: "{VALUE} no es un DNI válido"
      }
    },
    telefono:{type:Number, required:true, validate:[function(tel){
 return 99999999>tel.value<1000000000
    },'El telfono solo puede tener nueve numeros']},
    email:{type:String, required:true,validate: {validator: function(v) {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    ;},message: props => `${props.value} is not a valid email address!`}},
    empresa:{type:mongoose.Schema.Types.ObjectId, ref:"Empresa", required: false},
    tareas:[{type:mongoose.Schema.Types.ObjectId, ref:"Tarea", required: false,validate:[ function(tarea){ return tarea.length <10;}, 'Un trabajador solo puede tener 10 tareas']}],
  },
  { timestamps: false}
);
TrabajadorSchema.pre("save", async function (next) {
  try {
    const siexiste = await TrabajadorModel.findOne({ dni: this.dni });

    if (siexiste) {
      const err = new Error("Ya existe una persona con el mismo DNI");
      next(err);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});
TrabajadorSchema.post("eliminar", async function(tipo:TrabajadorModelType){
  const trabajadorN= await TrabajadorModel.findById(tipo._id).exec();
  if(trabajadorN && !tipo.empresa){
    await EmpresaModel.updateOne({trabajadores:trabajadorN._id},{$pull:{trabajadores:trabajadorN._id}})
    await TareaModel.deleteMany({trabajador:trabajadorN._id});
  }
})
TrabajadorSchema.post("eliminar", async function(tipo:TrabajadorModelType){
  await TareaModel.deleteMany({trabajador:tipo._id});
})
export type TrabajadorModelType = mongoose.Document & Omit<Trabajador, "id" | "empresa"|"tareas"> & {
  empresa : mongoose.Schema.Types.ObjectId;
  tareas: Array<mongoose.Schema.Types.ObjectId>;
};

export const TrabajadorModel = mongoose.model<TrabajadorModelType>("Trabajador", TrabajadorSchema);